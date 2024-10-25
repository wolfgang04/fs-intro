import { Router } from "express";
import {
	deleteBlog,
	editBlog,
	getBlogs,
	postBlogs,
} from "../controllers/blog.controller";

const router = Router();

router.get("/get", getBlogs);
router.post("/post", postBlogs);
router.post("/edit", editBlog);
router.post("/delete", deleteBlog);

export default router;
