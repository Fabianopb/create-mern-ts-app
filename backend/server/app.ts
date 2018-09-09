import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";

dotenv.config();

import itemsRoutes from "./items/items.controller";
import userRoutes from "./users/users.controller";

const app = express();

app.use("/api/items", itemsRoutes);
app.use("/api/users", userRoutes);

app.use(express.static(path.resolve("..", "frontend", "build")));

app.get("/api/test-route", (request, response) => {
  return response.status(200).json("Test route works!");
});

app.get("*", (request, response) => {
  response.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});

export default app;
