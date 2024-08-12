import React, { useState } from "react";
import FormInput from "./FormInput";

interface cred {
	username: string;
	password: string;
}

interface Props {
	onToggle: () => void;
	onLogin: () => void;
}

const Login: React.FC<Props> = (props) => {
	const [credentials, setCredentials] = useState<cred>({
		username: "",
		password: "",
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();

		props.onLogin();
	};

	const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials((prevCred) => ({
			...prevCred,
			username: e.target.value,
		}));
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setCredentials((prevCred) => ({
			...prevCred,
			password: e.target.value,
		}));
	};

	return (
		<form className="" onSubmit={handleSubmit}>
			<h1 className="text-center font-bold text-2xl mb-3">Login</h1>

			<div className="gap-5 col mb-5">
				<FormInput
					label="Username"
					for="username"
					value={credentials.username}
					type="text"
					change={handleChangeUsername}
				/>
				<FormInput
					label="Password"
					for="password"
					value={credentials.password}
					type="password"
					change={handleChangePassword}
				/>
			</div>

			<input type="submit" value="Login" />

			<p
				className="text-center mt-3 font-bold hover:underline cursor-pointer"
				onClick={() => props.onToggle()}
			>
				Don't have an account?
			</p>
		</form>
	);
};

export default Login;
