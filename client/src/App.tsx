import { useEffect, useState } from "react";
import CreatePost from "./Post/CreatePost";
import Post from "./Post/Post";
import axios from "axios";

export interface blog {
	blogtitle: string;
	blogcontent: string;
}

function App() {
	const [blogs, setBlogs] = useState<blog[]>([]);

	useEffect(() => {
		axios
			.get("http://localhost:3030/api/blog")
			.then((res) => {
				console.log(res.data);
				setBlogs(res.data);
			})
			.catch((err) => console.log(`error: ${err}`));
	}, []);

	const handleCreatePost = (newBlog: blog) => {
		setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
	};

	return (
		<>
			<CreatePost onPost={handleCreatePost} />

			{blogs.map((blog: blog, idx: number) => (
				<Post
					key={idx}
					title={blog.blogtitle}
					content={blog.blogcontent}
				/>
			))}
		</>
	);
}

export default App;
