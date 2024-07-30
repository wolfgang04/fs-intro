import React, { useState } from "react";
import ImageIcon from "@mui/icons-material/Image";
import { blog } from "../App";

interface Props {
	onPost: (blog: blog) => void;
}

const CreatePost: React.FC<Props> = ({ onPost }) => {
	const [title, setTitle] = useState<string>("");
	const [content, setContent] = useState<string>("");

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		if (title === "" || content === "") {
			return false;
		}

		const Blog = { blogtitle: title, blogcontent: content };
		onPost(Blog);
		setTitle("");
		setContent("");
	};

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target!.value);
	};

	const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContent(e.target!.value);
	};

	return (
		<div className="w-[550px] bg-[#D9D9D9] my-10 p-5 rounded-lg">
			<form action="" onSubmit={handleSubmit}>
				<div className="col">
					<label htmlFor="title">Blog Title</label>
					<input
						type="text"
						name="title"
						value={title}
						onChange={handleChangeTitle}
					/>
				</div>

				<div className="col">
					<label htmlFor="content">Blog Content</label>
					<input
						type="text"
						name="content"
						value={content}
						onChange={handleChangeContent}
					/>
				</div>

				<div className="flex items-center justify-center hover:bg-gray-200 w-fit my-5 cursor-pointer">
					<ImageIcon style={{ fontSize: "50px" }} />
					<p>Add to your post</p>
				</div>

				<input
					type="submit"
					value="Post"
					className="hover:bg-[#6E6C6C]"
				/>
			</form>
		</div>
	);
};

export default CreatePost;
