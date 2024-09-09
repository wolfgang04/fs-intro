import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { supabase } from "../utils/supabaseClient";
import { regenerateSession } from "../utils/sessionHelper";

const saltRounds = 10;

export const signup = async (req: Request, res: Response) => {
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

		return res.status(201).send({ username });
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error posting data:", error);
			return res.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return res.status(500).send("An unknown error occured");
		}
	}
};

export const login = async (req: Request, res: Response) => {
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

		try {
			await regenerateSession(req, res, username);
		} catch (error) {
			res.status(500).send({ msg: "An error occured", error });
		}

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
};

export const getAuthStatus = (req: Request, res: Response) => {
	return req.session.user
		? res.status(200).send({ authenticated: true, user: req.session.user })
		: res.status(401).send({ msg: "NOT AUTHENTICATED" });
};

export const getProfile = async (req: Request, res: Response) => {
	if (!req.session || !req.session.user || !req.session.user.id) {
		return res.status(401).send({ msg: "unauthorized" });
	}

	try {
		const { data, error } = await supabase
			.from("users")
			.select("username, email, created_at")
			.eq("userid", req.session.user.id);

		if (error) {
			throw error;
		}

		res.status(200).send(data[0]);
	} catch (error) {
		if (error instanceof Error) {
			console.error("Error fetching user info:", error);
			return res.status(500).send(error.message);
		} else {
			console.error("Unknown error occured:", error);
			return res.status(500).send("An unknown error occured");
		}
	}
};
