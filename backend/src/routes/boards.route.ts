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

app.get("/:title", async (req, res) => {
	try {
		let result = await pool.query(`SELECT * FROM boards WHERE title = $1`, [
			req.params.title,
		]);
		res.status(200).send(result.rows);
	} catch (e) {
		res.status(400).send("Error getting board");
	}
});
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
			let boards = await pool.query(
				`SELECT * FROM boards WHERE title = $1`,
				[req.body.title]
			);
			if (boards.rows.length > 0) {
				res.status(400).send("A board with that name already exists");
			} else {
				let newBoard = new Board(
					req.body.title,
					new Date().toISOString().split("T")[0]
				);
				let result = await pool.query(
					`INSERT INTO boards (title, date_created) VALUES ($1, $2)`,
					[newBoard.title, newBoard.dateCreated]
				);
				res.status(201).send("Board created successfully");
			}
		} catch (e) {
			res.status(400).send(e);
		}
	} else {
		res.status(400).send("Title must be given for board");
	}
});
app.patch("/edit", async (req, res) => {
	if (req.body.title && req.body.board_id) {
		try {
			let result = await pool.query(
				`UPDATE  boards SET title = $1 WHERE board_id = $2`,
				[req.body.title, parseInt(req.body.board_id)]
			);
			res.status(200).send("Board successfully edited");
		} catch (e) {
			res.status(400).send("Error updating record");
		}
	} else {
		res.status(400).send("Title must be supplied");
	}
});
app.delete("/delete", async (req, res) => {
	if (req.body.board_id) {
		try {
			let result = await pool.query(
				`DELETE FROM boards WHERE board_id = $1`,
				[parseInt(req.body.board_id)]
			);
			res.status(200).send("Board deleted successfully.");
		} catch (e) {
			res.status(400).send("Error deleting record");
		}
	} else {
		res.status(400).send("Board ID must be supplied for deletion");
	}
});
export { app };
