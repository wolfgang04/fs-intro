import { useState } from "react";
import CreatePost from "./Post/CreatePost";
import Post from "./Post/Post";

interface blog {
	title: string;
	content: string;
}

function App() {
	const [blogs, setBlogs] = useState<blog[]>([]);

	const handleCreatePost = (newBlog: blog) => {
		setBlogs((prevBlogs) => [...prevBlogs, newBlog]);
	};

	return (
		<>
			<CreatePost onPost={handleCreatePost} />

			{blogs.map((blog: blog, idx: number) => (
				<Post key={idx} title={blog.title} content={blog.content} />
			))}
		</>
	);
}

export default App;
