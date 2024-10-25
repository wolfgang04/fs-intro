import React, { useEffect, useState } from "react";
import { blog } from "../../models/blog.model";

interface Props {
	blog: blog;
	onClose: () => void;
	onSave: (blog: {
		id: number;
		blog_title: string;
		blog_content: string;
	}) => void;
}

const EditPost: React.FC<Props> = ({ blog, onClose, onSave }) => {
	const [title, setTitle] = useState(blog.blog_title);
	const [content, setContent] = useState(blog.blog_content);
	console.log(blog.blog_title, blog.blog_content);

	useEffect(() => {
		setTitle(blog.blog_title);
		setContent(blog.blog_content);
	}, [blog]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();

		const updatedBlog = {
			id: blog.id,
			blog_title: title,
			blog_content: content,
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

			<div className="custom-modal w-[550px] bg-[#D9D9D9] my-10 p-5 rounded-lg">
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

					<input type="submit" value="Edit" className="mt-5" />
				</form>
			</div>
		</>
	);
};

export default EditPost;
