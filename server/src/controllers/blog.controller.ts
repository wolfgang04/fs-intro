import { Request, Response } from "express";
import { supabase } from "../utils/supabaseClient";
import { Blog } from "../models/blog";

export const getBlogs = async (request: Request, response: Response) => {
	try {
		const { data, error } = await supabase
			.from("blog")
			.select()
			.order("id", { ascending: true });
		if (error) throw error;

		return response.status(200).send(data);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching blogs:", error);
			return response.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return response.status(500).send("An unknown error occured");
		}
	}
};

export const postBlogs = async (request: Request, response: Response) => {
	const { blogtitle, blogcontent } = request.body;
	const blog: Blog = {
		blog_title: blogtitle,
		blog_content: blogcontent,
	};

	try {
		const { error } = await supabase
			.from("blog")
			.insert([{ ...blog, username: request.session!.userID }]);
		if (error) throw error;

		return response.sendStatus(200);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error creating user:", error);
			return response.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return response.status(500).send("An unknown error occured");
		}
	}
};

export const editBlog = async (request: Request, response: Response) => {
	const { id, blog_title, blog_content } = request.body;

	try {
		const { error } = await supabase
			.from("blog")
			.update({ blog_title: blog_title, blog_content: blog_content })
			.eq("id", id);

		if (error) throw error;

		return response.status(200).send("Post successfully edited");
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error updating post with id:", id);
			return response.status(500).send(`Error updating post: ${error}`);
		} else {
			console.error("Unknown error occured:", error);
			return response.status(500).send(`Error updating post: ${error}`);
		}
	}
};
