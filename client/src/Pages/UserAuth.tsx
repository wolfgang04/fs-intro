import React, { useState } from "react";
import Login from "../Components/Auth/Login";
import SignUp from "../Components/Auth/SignUp";

const UserAuth: React.FC<{ onLogIn: () => void }> = (props) => {
	const [isLogIn, setIsLogIn] = useState<Boolean>(true);

	const handleToggleAuth = async () => {
		setIsLogIn((prevState) => !prevState);
	};

	return (
		<div className="h-screen flex items-center justify-center">
			<div className="bg-[#D9D9D9] p-8 rounded-lg">
				{isLogIn == true ? (
					<Login
						onToggle={handleToggleAuth}
						onLogin={() => props.onLogIn()}
					/>
				) : (
					<SignUp onToggle={handleToggleAuth} />
				)}
			</div>
		</div>
	);
};

export default UserAuth;
