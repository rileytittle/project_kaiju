import { Router } from "express";
import { Board } from "../models/board.model";
import { Pool } from "pg";
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "Senior-Project",
	password: "garnetisGold!1820",
	port: 5432,
});
let app = Router();

app.get("/", async (req, res) => {
	try {
		let result = await pool.query("SELECT * FROM boards");
		res.status(200).send(result.rows);
	} catch (e) {
		res.status(400).send("Error fetching boards");
	}
});
app.post("/create", async (req, res) => {
	if (req.body.title) {
		try {
			let newBoard = new Board(
				req.body.title,
				new Date().toISOString().split("T")[0]
			);
			let result = await pool.query(
				`INSERT INTO boards (title, date_created) VALUES ($1, $2)`,
				[newBoard.title, newBoard.dateCreated]
			);
			res.status(201).send("Board created successfully");
		} catch (e) {
			res.status(400).send(e);
		}
	} else {
		res.status(400).send("Title must be given for board");
	}
});

export { app };
