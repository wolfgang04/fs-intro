import { Router } from "express";
import { editBlog, getBlogs, postBlogs } from "../controllers/blog.controller";

const router = Router();

router.get("/get", getBlogs);
router.post("/post", postBlogs);
router.post("/edit", editBlog);

export default router;
