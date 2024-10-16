import express from "express";
import { app as BoardsRoute } from "./routes/boards.route";
let app = express();

app.use(express.json());
app.use("/boards", BoardsRoute);
app.listen(3000);
