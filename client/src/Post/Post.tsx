import React from "react";
import EditIcon from "@mui/icons-material/Edit";

interface Props {
	title: string;
	content: string;
}

const Post: React.FC<Props> = (props) => {
	const editStyle = {
		position: "absolute",
		top: "25",
		right: "15",
	} as React.CSSProperties;

	return (
		<div className="bg-[#D9D9D9] p-5 mb-5 rounded-lg relative max-w-[550px]">
			<h1 className="font-bold text-2xl mb-3">{props.title}</h1>
			{/* <div className="cursor-pointer hover:bg-[#b8b8b8] rounded-full h-10 w-10 absolute"> */}
			<EditIcon style={editStyle} />
			{/* </div> */}

			<p>{props.content}</p>
		</div>
	);
};

export default Post;
