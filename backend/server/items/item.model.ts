import * as mongoose from "mongoose";

// Declare model interface
interface Item extends mongoose.Document {
  name: string;
  value: number;
}

// Define model schema
const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
});

export default mongoose.model<Item>("Item", itemSchema);
