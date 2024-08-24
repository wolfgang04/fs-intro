import axios from "axios";
import React, { useEffect } from "react";

const Profile = () => {
	useEffect(() => {
		const handleFetch = async () => {
			try {
				const response = await axios.get(
					"http://localhost:6062/profile"
				);

				console.log(response);
			} catch (error) {
				console.error("Error fetching profile:", error);
			}
		};

		handleFetch();
	}, []);

	return (
		<>
			<img src="" alt="user-profile" />

			<div className="">
				<p>Username</p>
				<p>{}</p>
			</div>

			<div className="">
				<p>Email</p>
				<p>{}</p>
			</div>

			<div className="">
				<p>Account Created</p>
				<p>{}</p>
			</div>
		</>
	);
};

export default Profile;
