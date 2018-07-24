import * as mongoose from "mongoose";

interface Item extends mongoose.Document {
  name: string;
  value: number;
}

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
