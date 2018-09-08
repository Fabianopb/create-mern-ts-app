import * as mongoose from "mongoose";
import app from "./app";

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost:27017/test_database", {
  useNewUrlParser: true
});

app.listen(process.env.PORT || 9000);
