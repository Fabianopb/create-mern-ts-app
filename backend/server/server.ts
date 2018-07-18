import * as bodyParser from "body-parser";
import * as dotenv from "dotenv";
import * as express from "express";
import * as mongoose from "mongoose";
import * as path from "path";

import itemsRoutes from "./routes/items";

dotenv.config();

const app = express();

app.use("/api", itemsRoutes);

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test_database");

app.use(express.static(path.resolve("..", "frontend", "build")));

app.get("*", (request, response) => {
  response.sendFile(path.resolve("..", "frontend", "build", "index.html"));
});

const server = app.listen(process.env.PORT || 9000);
console.log("server running");

export const closeServer = () => {
  mongoose.disconnect();
  server.close();
};

export default app;
