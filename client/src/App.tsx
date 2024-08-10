import React, { useState } from "react";
import UserAuth from "./Pages/UserAuth";
import { Route, Routes } from "react-router";
import Posts from "./Pages/Posts";

export default function App() {
	const [isLoggedIn, setIsLoggedIn] = useState<Boolean>(false);

	return (
		<Routes>
			<Route
				path="/"
				element={isLoggedIn == true ? <Posts /> : <UserAuth />}
			/>
		</Routes>
	);
}
