import { Router } from "express";
import {
	signup,
	login,
	getAuthStatus,
	getProfile,
} from "../controllers/userController";

const router = Router();

router.post("/signup", signup);
router.post("/auth", login);
router.get("/auth/status", getAuthStatus);
router.get("/profile", getProfile);

export default router;
