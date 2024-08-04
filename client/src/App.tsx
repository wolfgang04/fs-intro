import { useEffect, useState } from "react";
import CreatePost from "./Post/CreatePost";
import Post from "./Post/Post";
import axios from "axios";

export interface blog {
	blogid: number;
	blogtitle: string;
	blogcontent: string;
}

function App() {
	const [blogs, setBlogs] = useState<blog[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:6062/api/blog/get")
			.then((res) => {
				console.log(res.data);
				setBlogs(res.data);
			})
			.catch((err) => console.log(`error: ${err}`));
	}, []);

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

	const handleCreatePost = async (newBlog: blog) => {
		try {
			const response = await axios.post(
				"http://localhost:6062/api/blog/post",
				newBlog
			);

			if (response.status >= 200 && response.status < 300) {
				setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
			}
		} catch (err) {
			console.error("Error posting the data:", err);
		}
	};

	return (
		<>
			<CreatePost onPost={handleCreatePost} />

			{blogs.map((blog: blog) => (
				<Post
					key={blog.blogid}
					blog={blog}
					onDelete={handleDeleteItem}
				/>
			))}
		</>
	);
}

export default App;
