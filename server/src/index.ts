import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
import session, { SessionData } from "express-session";
import cors from "cors";
import bcrypt from "bcrypt";

declare module "express-session" {
	interface SessionData {
		visited?: boolean;
		user: { id: number; username: string };
		cart: [{ item: string; price: number }];
	}
}

interface Blog {
	blogtitle: string;
	blogcontent: string;
}

interface blog {
	blogid: number;
	blogtitle: string;
	blogcontent: string;
}

const app = express();
app.use(express.json());
app.use(cors());

const saltRounds = 10;

const supabaseUrl = "https://ifqtlgtoxolrskahoibu.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcXRsZ3RveG9scnNrYWhvaWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMzc5MTgsImV4cCI6MjAzNzgxMzkxOH0.67ZLacXwKf7YSyQhb4t3ifAg2agpzpbox4QGzAUeb5s";
const supabase = createClient(supabaseUrl, supabaseKey);

app.use(
	session({
		secret: "some_secret",
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 30000, signed: true },
	})
);

process.on("SIGHUP", () => {
	process.exit(1);
});

// FETCH POSTS

app.get("/api/blog/get", async (req: Request, res: Response) => {
	try {
		const { data, error } = await supabase
			.from("blog")
			.select()
			.order("blogid", { ascending: true });
		if (error) {
			throw error;
		}

		return res.send(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching data:", error);
			return res.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return res.status(500).send("An unknown error occured:");
		}
	}
});

// POST A BLOG

app.post("/api/blog/post", async (req: Request, res: Response) => {
	const blog: Blog = req.body;
	console.log(blog);

	try {
		const { data, error } = await supabase.from("blog").insert([blog]);
		if (error) {
			throw error;
		}
		return res.status(201).send(data);
	} catch (err) {
		if (err instanceof Error) {
			console.error("Error posting data:", err);
			return res.status(500).send(err.message);
		} else {
			console.error("Unknown error occured:", err);
			return res.status(500).send("An unknown error occured");
		}
	}
});

// DELETE A POST

app.post("/api/blog/delete", async (req: Request, res: Response) => {
	const blogID = req.body.id;

	try {
		const { error } = await supabase
			.from("blog")
			.delete()
			.eq("blogid", blogID);

		if (error) {
			throw error;
		}

		return res.status(201).send("Successfully deleted");
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error deleting data:", error);
			return res.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return res.status(500).send("An unknown error occured");
		}
	}
});

// EDIT A POST

app.post("/api/blog/edit", async (req: Request, res: Response) => {
	const blog: blog = req.body;

	try {
		const { error } = await supabase
			.from("blog")
			.update({
				blogtitle: blog.blogtitle,
				blogcontent: blog.blogcontent,
			})
			.eq("blogid", blog.blogid);

		if (error) {
			throw error;
		}

		return res.sendStatus(201);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error deleting data:", error);
			return res.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return res.status(500).send("An unknown error occured");
		}
	}
});

// CREATE AN ACCOUNT

app.post("/api/user/signup", async (req: Request, res: Response) => {
	const { username, password, email } = req.body;

	try {
		const hash = await new Promise<String>((resolve, reject) => {
			bcrypt.hash(
				password,
				saltRounds,
				(err: Error | undefined, hash: string | undefined) => {
					if (err) {
						return reject(err);
					}

					resolve(hash as string);
				}
			);
		});

		const { error } = await supabase
			.from("users")
			.insert({ username, email, password: hash });

		if (error) {
			throw error;
		}

		return res.sendStatus(201);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error posting data:", error);
			return res.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return res.status(500).send("An unknown error occured");
		}
	}
});

// LOGIN

app.post("/api/user/auth", async (req: Request, res: Response) => {
	const username = req.body.username as string;
	const password = req.body.password as string;

	try {
		const { data, error } = await supabase
			.from("users")
			.select()
			.eq("username", username);

		if (error) {
			throw error;
		}

		if (data.length == 0) {
			return res.status(401).send({ msg: "BAD CREDENTIALS" });
		}

		const result = await new Promise<boolean>((resolve, reject) => {
			bcrypt.compare(
				password,
				data[0].password,
				(err: Error | undefined, isMatch: boolean) => {
					if (err) {
						return reject(err);
					}

					resolve(isMatch as boolean);
				}
			);
		});

		if (result == false) {
			return res.status(401).send({ result, msg: "BAD CREDENTIALS" });
		}

		req.session.regenerate((err: Error) => {
			if (err) {
				return res.status(400).send({ msg: "unable to login" });
			}

			req.session.user = {
				id: data[0].userid,
				username,
			};
		});

		console.log(req.session);
		console.log(req.sessionID);
		req.session.visited = true;

		return res.status(201).send({
			result,
			session: req.session,
			sessionID: req.sessionID,
		});
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error getting the password:", error);
			return res.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return res.status(500).send("An unknown error occured");
		}
	}
});

app.get("/api/user/auth/status", (req: Request, res: Response) => {
	req.sessionStore.get(
		req.sessionID,
		(err: any, session: SessionData | null | undefined) => {
			console.log(session);
		}
	);

	return req.session.user
		? res.status(200).send(req.session.user)
		: res.status(401).send({ msg: "NOT AUTHENTICATED" });
});

app.post("/api/cart", (req: Request, res: Response) => {
	if (!req.session.user) return res.sendStatus(401);

	const { body } = req;
	const { cart } = req.session;
	if (cart) {
		cart.push(body);
	} else {
		req.session.cart = [body];
	}

	console.log(req.session.cart);

	return res.status(201).send(body);
});

const port = 6062;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
