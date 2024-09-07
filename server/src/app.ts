import express from "express";
import cors from "cors";
import session from "express-session";
import blogRoutes from "./routes/blogRoutes";
import userRoutes from "./routes/userRoutes";

const app = express();
app.use(express.json());

app.use(
	cors({
		origin: "http://localhost:5173",
		credentials: true,
	})
);

app.use(
	session({
		secret: "some_secret",
		saveUninitialized: false,
		resave: false,
		cookie: { maxAge: 10000000, signed: true },
	})
);

app.use("/api/blog", blogRoutes);
app.use("/api/user", userRoutes);

export default app;
