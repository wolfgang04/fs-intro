import React, { useState } from "react";

interface cred {
	username: string;
	password: string;
}

const Login: React.FC<{ onToggle: () => void }> = (props) => {
	const [credentials, setCredentials] = useState<cred>({
		username: "",
		password: "",
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
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
				<div className="col">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						className="w-72"
						value={credentials.username}
						onChange={handleChangeUsername}
						autoComplete="off"
					/>
				</div>
				<div className="col">
					<label htmlFor="password">Password</label>
					<input
						type="text"
						name="password"
						className="w-72"
						onChange={handleChangePassword}
						value={credentials.password}
						autoComplete="off"
					/>
				</div>
			</div>

			<input type="submit" value="Login" />

			<p
				className="text-center mt-3 font-bold hover:underline cursor-pointer"
				onClick={() => props.onToggle()}
			>
				Forgot password?
			</p>
		</form>
	);
};

export default Login;
