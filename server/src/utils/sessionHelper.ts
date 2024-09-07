import { Request, Response } from "express";
import { supabase } from "./supabaseClient";

export const regenerateSession = async (
	req: Request,
	res: Response,
	username: string
) => {
	req.session.regenerate(async (err) => {
		if (err) {
			return res.status(400).send({ msg: "unable to login" });
		}

		const { data, error } = await supabase
			.from("user")
			.select("userid")
			.eq("username", username);

		if (error) throw error;

		req.session.user = {
			id: data[0].userid,
			username,
		};
	});
};
