import { Request, Response } from "express";
import { supabase } from "../utils/supabaseClient";

export const getBlogs = async (req: Request, res: Response) => {
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
};

export const postBlog = async (req: Request, res: Response) => {
	const blog = req.body;
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
};

export const deleteBlog = async (req: Request, res: Response) => {
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
};

export const editBlog = async (req: Request, res: Response) => {
	const blog = req.body;

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
};
