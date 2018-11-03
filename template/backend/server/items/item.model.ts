import { Document, model, Schema } from "mongoose";
import { SchemaDef } from "../../types";

// Declare model interface
interface ItemDoc extends App.Item, Document {}

const itemSchemaDef: SchemaDef<App.Item> = {
  name: {
    type: String,
    required: true
  },
  value: {
    type: Number,
    required: true
  }
};

// Define model schema
const itemSchema = new Schema(itemSchemaDef);

export default model<ItemDoc>("Item", itemSchema);
