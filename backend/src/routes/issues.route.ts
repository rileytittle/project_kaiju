import { Router } from "express";
import { Pool } from "pg";
import { Issue } from "../models/issue.model";
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "Senior-Project",
	password: "garnetisGold!1820",
	port: 5432,
});
let app = Router();
// INSERT INTO issues (title, status, date_created, due_date, board_id)
// VALUES ('test', 'BL', '2024-11-19', '2024-11-23', 2)
app.delete("/:board_id/delete", (req, res) => {
	try {
		if (req.body.issue_id) {
			let result = pool.query("DELETE FROM issues WHERE issue_id = $1", [
				parseInt(req.body.issue_id),
			]);
			res.status(200).send("Issue successfully deleted");
		} else {
			res.status(400).send("You must supply an issue id");
		}
	} catch (e) {
		res.status(500).send(e);
	}
});
app.patch("/:board_id/update", (req, res) => {
	try {
		if (req.body.status && req.body.issue_id) {
			let result = pool.query(
				"UPDATE issues SET status = $1 WHERE issue_id = $2",
				[req.body.status, parseInt(req.body.issue_id)]
			);
			res.status(200).send("Issue successfully updated");
		} else {
			res.status(400).send("You must supply a status and issue id");
		}
	} catch (e) {
		res.status(500).send(e);
	}
});
app.post("/:board_id/create", async (req, res) => {
	try {
		let issues = await pool.query(
			"SELECT * FROM issues WHERE title = $1 AND board_id = $2",
			[req.body.title, parseInt(req.params.board_id)]
		);
		if (issues.rows.length > 0) {
			res.status(400).send("An issue with that name already exists");
		} else {
			let due_date = null;
			if (req.body.due_date) {
				due_date = req.body.due_date;
			}
			let newIssue = new Issue(
				req.body.title,
				req.body.status,
				new Date().toISOString().split("T")[0],
				due_date
			);
			let result = await pool.query(
				"INSERT INTO issues (title, status, date_created, due_date, board_id) VALUES ($1, $2, $3, $4, $5)",
				[
					newIssue.title,
					newIssue.status,
					newIssue.dateCreated,
					newIssue.dueDate,
					parseInt(req.params.board_id),
				]
			);
			res.status(200).send("Issue created successfully");
		}
	} catch (e) {
		res.status(500).send(e);
	}
});
app.get("/:board_id", async (req, res) => {
	try {
		let result = await pool.query(
			`SELECT * FROM issues WHERE board_id = $1`,
			[parseInt(req.params.board_id)]
		);
		res.status(200).send(result.rows);
	} catch (e) {
		res.status(400).send("Error getting issues");
	}
});
export { app };
