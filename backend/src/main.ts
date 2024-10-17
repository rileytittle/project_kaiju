import express from "express";
import { app as BoardsRouter } from "./routes/boards.route";
import { app as IssuesRouter } from "./routes/issues.route";
let app = express();

app.use(express.json());
app.use("/boards", BoardsRouter);
app.use("/issues/", IssuesRouter);
app.listen(3000);
