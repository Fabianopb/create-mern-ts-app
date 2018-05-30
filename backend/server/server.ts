import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as express from "express";
import * as path from "path";

import * as homeController from "./controllers/home.controller";

dotenv.config();

const app = express();

app.get("/api", homeController.index);

app.use(express.static(path.resolve("..", "frontend", "build")));

app.get("*", (request, response) => {
  response.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});

app.listen(process.env.PORT || 9000);
console.log("server running");

module.exports = app;
