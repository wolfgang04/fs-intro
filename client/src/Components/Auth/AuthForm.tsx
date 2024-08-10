import React, { useState } from "react";
import Login from "./Login";
import SignUp from "./SignUp";

const AuthForm = () => {
	const [isLogIn, setIsLogIn] = useState<Boolean>(true);

	const handleToggleAuth = () => {
		setIsLogIn((prevState) => !prevState);
	};

	return (
		<div className="bg-[#D9D9D9] p-8 rounded-lg">
			{isLogIn == true ? (
				<Login onToggle={handleToggleAuth} />
			) : (
				<SignUp onToggle={handleToggleAuth} />
			)}
		</div>
	);
};

export default AuthForm;
