import { Router } from "express";
import { Pool } from "pg";
const pool = new Pool({
	user: "postgres",
	host: "localhost",
	database: "Senior-Project",
	password: "garnetisGold!1820",
	port: 5432,
});
let app = Router();

app.get("/:board_id", async (req, res) => {
	try {
		let result = await pool.query(
			`SELECT * FROM issues WHERE board_id = $1`,
			[req.params.board_id]
		);
		res.status(200).send(result.rows);
	} catch (e) {
		res.status(400).send("Error getting issues");
	}
});
export { app };
