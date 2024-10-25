import { useEffect, useState } from "react";
import UserAuth from "./Pages/UserAuth";
import { Route, Routes } from "react-router";
import Posts from "./Pages/Posts";
import Profile from "./Pages/Profile";
import axios from "axios";

export default function App() {
	const [isLoading, setIsLoading] = useState<Boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

	useEffect(() => {
		fetchStatus();
	}, []);

	const fetchStatus = async () => {
		try {
			const res = await axios.get(
				"http://localhost:6062/api/user/auth/status",
				{ withCredentials: true }
			);

			if (res.status == 200) {
				setIsLoggedIn(true);
			}
		} catch (error) {}
	};

	const handleLogin = () => {
		setIsLoggedIn(true);
	};

	return (
		<Routes>
			<Route
				path="/"
				element={
					isLoggedIn == true ? (
						<Posts />
					) : (
						<UserAuth onLogIn={handleLogin} />
					)
				}
			/>
			<Route path="/:username" element={<Profile />} />
		</Routes>
	);
}
