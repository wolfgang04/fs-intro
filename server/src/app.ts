import express from "express";
import cors from "cors";
import session from "express-session";
import { Redis } from "ioredis";
import RedisStore from "connect-redis";
import userRoutes from "./routes/userRoutes";

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
		secret: process.env.SECRET || "SECRET",
		name: "andrew",
		store: new RedisStore({ client: redisClient }),
		resave: false,
		saveUninitialized: false,
		cookie: {
			maxAge: 1000 * 60 * 24,
			httpOnly: true,
			secure: true,
			sameSite: "none",
		},
	})
);

app.use("/api/user", userRoutes);

export default app;
