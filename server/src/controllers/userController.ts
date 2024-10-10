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

export const login = async (request: Request, response: Response) => {
	const { username, password } = request.body;

	try {
		const { data, error } = await supabase
			.from("user")
			.select()
			.eq("username", username);

		if (error) throw error;

		if (data.length == 0) {
			console.error("No accounts found with username: ", username);
			return response
				.status(401)
				.send({ msg: `No accounts found with username: ${username}` });
		}

		const result = await new Promise<Boolean>((resolve, reject) => {
			bcrypt.compare(
				password,
				data[0].password,
				(err: Error | undefined, result: Boolean) => {
					if (err) reject(err);
					else resolve(result as Boolean);
				}
			);
		});

		if (result) {
			return response.status(200).send("Successfully logged in");
		} else {
			return response.status(401).send("Invalid credentials");
		}
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error logging in:", error);
			return response.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return response.status(500).send("An unknown error occured");
		}
	}
};
