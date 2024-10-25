import { useEffect, useState } from "react";
import CreatePost from "../Components/Post/CreatePost";
import Post from "../Components/Post/Post";
import axios from "axios";
import EditPost from "../Components/Post/EditPost";
import { blog } from "../models/blog.model";

function Posts() {
	const [blogs, setBlogs] = useState<blog[]>([]);
	const [isVisible, setIsVisible] = useState(false);
	const [post, setPost] = useState<blog>({
		id: -1,
		blog_content: "",
		blog_title: "",
		username: "",
	});

	useEffect(() => {
		handleFetch();
	}, []);

	const handleEditBlog = async (id: number) => {
		const idx = blogs.findIndex((blog) => blog.id == id);
		const posts = [...blogs];
		const post = posts[idx];

		setPost(post);
		setIsVisible(true);
	};

	const handleSaveBlog = async (updatedBlog: {
		id: number;
		blog_title: string;
		blog_content: string;
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
					return prevBlogs.filter((blog: blog) => blog.id !== id);
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
				newBlog,
				{ withCredentials: true }
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
			.get("http://localhost:6062/api/blog/get", {
				withCredentials: true,
			})
			.then((res) => {
				setBlogs(res.data);
			})
			.catch((err) => console.log(`error: ${err}`));
	};

	return (
		<>
			{isVisible && (
				<EditPost
					blog={post}
					onClose={() => setIsVisible(false)}
					onSave={handleSaveBlog}
				/>
			)}

			<CreatePost onPost={handleCreatePost} />

			{blogs.map((blog: blog, idx: number) => (
				<Post
					key={blog.username + `${idx}`}
					blog={blog}
					onDelete={handleDeleteItem}
					onEdit={handleEditBlog}
				/>
			))}
		</>
	);
}

export default Posts;
