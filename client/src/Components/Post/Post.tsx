import React, { useEffect, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { blog } from "../../Pages/Posts";

interface Props {
	blog: blog;
	onDelete: (id: number) => void;
	onEdit: (id: number) => void;
}

const Post: React.FC<Props> = (props) => {
	const [toggled, setToggled] = useState(false);
	const { blogid, blogtitle, blogcontent } = props.blog;

	const handleKeyDown = (e: KeyboardEvent) => {
		if (e.key === "Shift") {
			setToggled(true);
		}
	};

	const handleKeyUp = (e: KeyboardEvent) => {
		if (e.key === "Shift") {
			setToggled(false);
		}
	};

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		window.addEventListener("keyup", handleKeyUp);

		return () => {
			window.removeEventListener("keydown", handleKeyDown);
			window.removeEventListener("keyup", handleKeyUp);
		};
	}, []);

	return (
		<div className="bg-[#D9D9D9] p-5 mb-5 rounded-lg relative max-w-[550px]">
			<h1 className="font-bold text-2xl mb-3">{blogtitle}</h1>
			<div
				className="cursor-pointer hover:bg-[#b8b8b8] rounded-full h-10 w-10 flex justify-center items-center absolute top-0 right-0"
				onClick={() =>
					toggled === true
						? props.onDelete(blogid)
						: props.onEdit(blogid)
				}
			>
				{toggled === true ? <DeleteIcon /> : <EditIcon />}
			</div>

			<p>{blogcontent}</p>
		</div>
	);
};

export default Post;
