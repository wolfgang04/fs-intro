import express from "express";
import cors from "cors";
import session from "express-session";
import { Redis } from "ioredis";
import RedisStore from "connect-redis";
import userRoutes from "./routes/user.routes";
import blogRoutes from "./routes/blog.routes";

const app: express.Application = express();

const redisClient = new Redis();

redisClient.on("connect", () => {
	console.log("Connected to Redis");
});

redisClient.on("ready", () => {
	console.log("Redis connection is ready");
});

redisClient.on("error", (err) => {
	console.error("Redis connection error:", err);
});

app.use(express.json());
app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(
	session({
		name: "qid",
		store: new RedisStore({
			client: redisClient,
			disableTouch: true,
		}),
		cookie: {
			maxAge: 1000 * 60 * 60 * 24,
			httpOnly: true,
			secure: false,
			sameSite: "lax",
		},
		saveUninitialized: false,
		secret: process.env.SECRET || "SECRET",
		resave: false,
	})
);

app.use("/api/user", userRoutes);
app.use("/api/blog", blogRoutes);

export default app;
