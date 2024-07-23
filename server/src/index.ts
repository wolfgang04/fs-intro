import express, { Request, Response } from "express";
const app = express();

app.get("/api/notes", async (req: Request, res: Response) => {
	res.json({ message: "success" });
});

app.listen(3000, () => {
	console.log("Server running on port 3000");
});
