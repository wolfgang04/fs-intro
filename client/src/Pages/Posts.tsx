import { useEffect, useState } from "react";
import CreatePost from "../Components/Post/CreatePost";
import Post from "../Components/Post/Post";
import axios from "axios";
import EditPost from "../Components/Post/EditPost";

export interface blog {
	blogid: number;
	blogtitle: string;
	blogcontent: string;
}

function Posts() {
	const [blogs, setBlogs] = useState<blog[]>([]);
	const [isVisible, setIsVisible] = useState(false);
	const [post, setPost] = useState<blog>();

	useEffect(() => {
		handleFetch();
	}, []);

	const handleEditBlog = async (id: number) => {
		const idx = blogs.findIndex((blog: blog) => blog.blogid === id);
		const items = [...blogs];
		const item = items[idx];

		setPost(item);
		setIsVisible(true);
	};

	const handleSaveBlog = async (updatedBlog: {
		blogtitle: string;
		blogcontent: string;
	}) => {
		const response = await axios.post(
			"http://localhost:6062/api/blog/edit",
			updatedBlog
		);

		if (response.status >= 200 && response.status < 300) {
			handleFetch();
		}
	};

	const handleDeleteItem = async (id: number) => {
		try {
			const response = await axios.post(
				"http://localhost:6062/api/blog/delete",
				{ id }
			);

			if (response.status >= 200 && response.status < 300) {
				setBlogs((prevBlogs: blog[]) => {
					return prevBlogs.filter((blog: blog) => blog.blogid !== id);
				});
			}
		} catch (error) {
			console.error("Error deleting the data:", error);
		}
	};

	const handleCreatePost = async (newBlog: {
		blogcontent: string;
		blogtitle: string;
	}) => {
		try {
			const response = await axios.post(
				"http://localhost:6062/api/blog/post",
				newBlog
			);

			if (response.status >= 200 && response.status < 300) {
				handleFetch();
			}
		} catch (err) {
			console.error("Error posting the data:", err);
		}
	};

	const handleFetch = async () => {
		axios
			.get("http://localhost:6062/api/blog/get")
			.then((res) => {
				console.log(res.data);
				setBlogs(res.data);
			})
			.catch((err) => console.log(`error: ${err}`));
	};

	return (
		<>
			{isVisible && (
				<EditPost
					blog={post!}
					onClose={() => setIsVisible(false)}
					onSave={handleSaveBlog}
				/>
			)}
			<CreatePost onPost={handleCreatePost} />

			{blogs.map((blog: blog) => (
				<Post
					key={blog.blogid}
					blog={blog}
					onDelete={handleDeleteItem}
					onEdit={handleEditBlog}
				/>
			))}
		</>
	);
}

export default Posts;
