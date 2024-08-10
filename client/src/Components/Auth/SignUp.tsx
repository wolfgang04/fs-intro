import React, { useState } from "react";

interface pass {
	password: string;
	confirm: string;
}

const SignUp: React.FC<{ onToggle: () => void }> = (props) => {
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState<pass>({
		password: "",
		confirm: "",
	});

	const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
	};

	const handleChangeUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
		setUsername(e.target.value);
	};

	const handleChangePassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword((prevPass) => ({
			...prevPass,
			password: e.target.value,
		}));
	};

	const handleConfirmPassword = (e: React.ChangeEvent<HTMLInputElement>) => {
		setPassword((prevPass) => ({
			...prevPass,
			confirm: e.target.value,
		}));
	};

	return (
		<form action="" className="" onSubmit={handleSubmit}>
			<h1 className="text-center font-bold text-2xl mb-3">Sign Up</h1>

			<div className="gap-5 col mb-5">
				<div className="col">
					<label htmlFor="username">Username</label>
					<input
						type="text"
						name="username"
						className="w-72"
						value={username}
						onChange={handleChangeUsername}
						autoComplete="off"
					/>
				</div>
				<div className="col">
					<label htmlFor="pass">Password</label>
					<input
						type="text"
						name="pass"
						className="w-72"
						value={password.password}
						onChange={handleChangePassword}
						autoComplete="off"
					/>
				</div>
				<div className="col">
					<label htmlFor="confirmPass">Confirm password</label>
					<input
						type="text"
						name="confirmPass"
						className="w-72"
						value={password.confirm}
						onChange={handleConfirmPassword}
						autoComplete="off"
					/>
				</div>
			</div>

			<input type="submit" value="Sign Up" />

			<p
				className="text-center mt-3 font-bold hover:underline cursor-pointer"
				onClick={() => props.onToggle()}
			>
				Already have an account? Login
			</p>
		</form>
	);
};

export default SignUp;
