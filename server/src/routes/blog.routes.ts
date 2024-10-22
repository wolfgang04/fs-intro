import { Router } from "express";
import { getBlogs, postBlogs } from "../controllers/blog.controller";

const router = Router();

router.get("/get", getBlogs);
router.post("/post", postBlogs);

export default router;
