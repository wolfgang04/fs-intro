import { Request, Response } from "express";
import { supabase } from "../utils/supabaseClient";
import bcrypt from "bcrypt";

export const signup = async (request: Request, response: Response) => {
	const { username, password, email } = request.body;
	const saltRounds = Number(process.env.SALT_ROUNDS) || 10;

	try {
		const hash = await new Promise<String>((resolve, reject) => {
			bcrypt.hash(
				password,
				saltRounds,
				(err: Error | undefined, hash: string | undefined) => {
					if (err) return reject(err);

					resolve(hash as string);
				}
			);
		});

		const { data, error } = await supabase
			.from("user")
			.insert([{ username: username, password: hash, email: email }])
			.select();

		if (error) throw error;

		console.log(data);
	} catch (err) {
		if (err instanceof Error) {
			console.error("Error creating user:", err);
			return response.status(500).send(err.message);
		} else {
			console.error("Unknown error occured:", err);
			return response.status(500).send("An unknown error occured");
		}
	}
};
