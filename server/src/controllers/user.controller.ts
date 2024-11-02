import { request, Request, response, Response } from "express";
import { supabase } from "../utils/supabaseClient";
import bcrypt from "bcrypt";

declare module "express-session" {
	interface SessionData {
		userID: string;
	}
}

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
		request.session.userID = username;

		console.log(data, request.session.userID);
		return response.status(200).send(request.session);
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
			request.session.destroy;
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
			request.session.userID = username;

			return response.status(200).send(request.session);
		} else {
			request.session.destroy;
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

export const status = async (request: Request, response: Response) => {
	return !request.session.userID
		? response.status(401).send({ userID: "" })
		: response.status(200).send(request.session.userID);
};

export const logout = async (request: Request, response: Response) => {
	request.session.destroy((err) => {
		if (err) {
			return response.status(500).send("Unable to log out");
		}
		return response.sendStatus(200);
	});
};

export const profile = async (request: Request, response: Response) => {
	const { username } = request.body;

	try {
		const { data: userData, error: userError } = await supabase
			.from("user")
			.select(
				"username, email, created_at, updated_at, first_name, middle_name, last_name, profile_picture"
			)
			.eq("username", username);

		if (userError) throw userError;

		const { count: followerCount, error: followerError } = await supabase
			.from("following")
			.select("*", { count: "exact" })
			.eq("followed", username);
		const { count: followingCount, error: followingError } = await supabase
			.from("following")
			.select("*", { count: "exact" })
			.eq("follower", username);

		if (followerError || followingError) {
			throw followerError || followingError;
		}

		const result = {
			user: userData,
			counts: {
				followerCount: followerCount,
				followingCount: followingCount,
			},
		};

		return response.status(200).send(result);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching user:", error);
			return response.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return response.status(500).send("An unknown error occured");
		}
	}
};
