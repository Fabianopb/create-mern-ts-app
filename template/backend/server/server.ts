import * as mongoose from "mongoose";
import populateDatabase from "../scripts/populateDatabase";
import app from "./app";
import User from "./users/user.model";

const url = process.env.MONGODB_URI || "mongodb://localhost:27017/test_database";
const port = process.env.PORT || 9000;

(async () => {
  // Connect to the database
  const client = await mongoose.connect(url, { useNewUrlParser: true });
  // Populate database with sample data if it's empty
  await populateDatabase();
  // Start express App
  app.listen(port);
  console.log(`App listening on port ${port}...`);
})();
