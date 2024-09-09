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

		try {
			const { data, error } = await supabase
				.from("users")
				.select("id")
				.eq("username", username);

			if (error) throw error;

			req.session.user = {
				id: data[0].id,
				username,
			};

			console.log(req.session);
			console.log(req.sessionID);
			req.session.visited = true;
		} catch (error) {
			console.error("Error", error);
			return res.status(500).send({ msg: "unknown error" });
		}
	});
};
