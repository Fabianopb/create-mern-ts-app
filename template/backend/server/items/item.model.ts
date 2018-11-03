import * as mongoose from "mongoose";

// Declare model interface
interface ItemDoc extends App.Item, mongoose.Document {}

type ItemSchemaDef = { [K in keyof App.Item]: mongoose.SchemaTypeOpts<any> };

const itemSchemaDef: ItemSchemaDef = {
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
const itemSchema = new mongoose.Schema(itemSchemaDef);

export default mongoose.model<ItemDoc>("Item", itemSchema);
