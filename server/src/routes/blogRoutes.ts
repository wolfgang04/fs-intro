import { Router } from "express";
import {
	getBlogs,
	postBlog,
	deleteBlog,
	editBlog,
} from "../controllers/blogController";

const router = Router();

router.get("/get", getBlogs);
router.post("/post", postBlog);
router.post("/delete", deleteBlog);
router.post("/edit", editBlog);

export default router;
