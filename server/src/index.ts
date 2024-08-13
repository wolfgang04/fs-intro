import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
const cors = require("cors");

const bcrypt = require("bcrypt");
const saltRounds = 10;

const app = express();
app.use(express.json());
app.use(cors());

const supabaseUrl = "https://ifqtlgtoxolrskahoibu.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcXRsZ3RveG9scnNrYWhvaWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMzc5MTgsImV4cCI6MjAzNzgxMzkxOH0.67ZLacXwKf7YSyQhb4t3ifAg2agpzpbox4QGzAUeb5s";
const supabase = createClient(supabaseUrl, supabaseKey);

interface Blog {
	blogtitle: string;
	blogcontent: string;
}

interface blog {
	blogid: number;
	blogtitle: string;
	blogcontent: string;
}

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

		console.log("Data fetched:", data);

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
				(err: Error | null, hash: string | undefined) => {
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

app.get("/api/user/login", async (req: Request, res: Response) => {
	const { username, password } = req.query;

	try {
		const { data, error } = await supabase
			.from("users")
			.select("password")
			.eq("username", username);

		if (error) {
			throw error;
		}

		const result = await new Promise<boolean>((resolve, reject) => {
			bcrypt.compare(
				password,
				data[0].password,
				(err: Error | null, isMatch: boolean) => {
					if (err) {
						return reject(err);
					}

					resolve(isMatch as boolean);
				}
			);
		});

		return res.status(201).send(result);
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

const port = 6062;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
