import express, { Request, Response } from "express";
import { createClient } from "@supabase/supabase-js";
const cors = require("cors");

const app = express();
app.use(cors());

const supabaseUrl = "https://ifqtlgtoxolrskahoibu.supabase.co";
const supabaseKey =
	"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlmcXRsZ3RveG9scnNrYWhvaWJ1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjIyMzc5MTgsImV4cCI6MjAzNzgxMzkxOH0.67ZLacXwKf7YSyQhb4t3ifAg2agpzpbox4QGzAUeb5s";
const supabase = createClient(supabaseUrl, supabaseKey);

app.get("/api/blog", async (req: Request, res: Response) => {
	const { data, error } = await supabase
		.from("blog")
		.select("blogtitle, blogcontent");
	if (error) {
		console.error("Error fetching data:", error);
		return res.status(500).send(error.message);
	}

	console.log("Data fetched:", data);

	res.send(data);
});

const port = 3030;
app.listen(port, () => {
	console.log(`Server running on port ${port}`);
});
