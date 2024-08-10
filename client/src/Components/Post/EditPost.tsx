import React, { useState } from "react";
import { blog } from "../../Pages/Posts";

interface Props {
	blog: blog;
	onClose: () => void;
	onSave: (blog: { blogtitle: string; blogcontent: string }) => void;
}

const EditPost: React.FC<Props> = ({ blog, onClose, onSave }) => {
	const [title, setTitle] = useState(blog.blogtitle);
	const [content, setContent] = useState(blog.blogcontent);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const updatedBlog = {
			blogid: blog.blogid,
			blogtitle: title,
			blogcontent: content,
		};
		onSave(updatedBlog);
		onClose();
	};

	const handleChangeTitle = (e: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(e.target.value);
	};

	const handleChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
		setContent(e.target.value);
	};

	return (
		<>
			<div className="backdrop" onClick={() => onClose()} />

			<div className="modal w-[550px] bg-[#D9D9D9] my-10 p-5 rounded-lg">
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

					<input
						type="submit"
						value="Post"
						className="hover:bg-[#6E6C6C] mt-5"
					/>
				</form>
			</div>
		</>
	);
};

export default EditPost;
