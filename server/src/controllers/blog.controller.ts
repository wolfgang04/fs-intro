import { Request, Response } from "express";
import { supabase } from "../utils/supabaseClient";

export const getBlogs = async (request: Request, response: Response) => {
	if (request.session!.userID) {
		// Continue with your logic
		console.log(request.session.userID);
		console.log(request.session);
	} else {
		console.log(request.session);
		console.log("No user logged in");
	}

	try {
		const { data, error } = await supabase.from("blog").select();
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
	console.log(request.sessionID, request.session);

	const { blogtitle, blogcontent } = request.body;
	const blog = [
		{
			blog_title: blogtitle,
			blog_content: blogcontent,
			username: request.session!.userID,
		},
	];

	try {
		const { error } = await supabase.from("blog").insert(blog);
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
