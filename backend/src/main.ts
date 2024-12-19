import express from "express";
import { app as BoardsRouter } from "./routes/boards.route";
import { app as IssuesRouter } from "./routes/issues.route";
let app = express();
const cors = require("cors");
app.use(cors());
app.use(
	cors({
		origin: "http://localhost:5173", // Allow only this origin
	})
);
app.use(express.json());
app.use("/boards", BoardsRouter);
app.use("/issues/", IssuesRouter);
app.listen(3000);
