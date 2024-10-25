import axios from "axios";

const Header = () => {
	const logout = async () => {
		const res = await axios.get("http://localhost:6062/api/user/logout", {
			withCredentials: true,
		});

		if (res.status == 200) {
			window.location.reload();
		}
	};

	return (
		<div className="bg-[#D9D9D9] flex justify-evenly">
			<p className="hover:underline cursor-pointer">Profile</p>
			<p
				className="hover:underline cursor-pointer"
				onClick={() => logout()}
			>
				Logout
			</p>
		</div>
	);
};

export default Header;
