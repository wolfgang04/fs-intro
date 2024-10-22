import { useEffect, useState } from "react";
import UserAuth from "./Pages/UserAuth";
import { Route, Routes } from "react-router";
import Posts from "./Pages/Posts";
import Profile from "./Pages/Profile";
import axios from "axios";

export default function App() {
	const [isLoading, setIsLoading] = useState<Boolean>(false);
	const [isLoggedIn, setIsLoggedIn] = useState<Boolean | undefined>(
		undefined
	);

	// useEffect(() => {
	// 	const handleFetchStatus = async () => {
	// 		try {
	// 			const response = await axios.get(
	// 				"http://localhost:6062/api/user/auth/status",
	// 				{ withCredentials: true }
	// 			);

	// 			if (response.status == 200 && response.data.authenticated) {
	// 				setIsLoggedIn(true);
	// 			}
	// 		} catch (error) {
	// 			setIsLoggedIn(false);
	// 		}
	// 	};

	// 	handleFetchStatus();
	// }, []);

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
