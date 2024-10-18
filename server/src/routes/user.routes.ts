import { Router } from "express";
import { login, logout, signup, status } from "../controllers/user.controller";

const router = Router();

router.post("/signup", signup);
router.post("/auth", login);
router.get("/auth/status", status);
router.get("/logout", logout);

export default router;
