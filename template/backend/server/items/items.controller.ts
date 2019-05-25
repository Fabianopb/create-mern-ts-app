import * as bodyParser from "body-parser";
import * as express from "express";
import { authorize } from "../config";
import Item from "./item.model";

const router = express.Router();

router.route("/").get(authorize, async (_, response) => {
  const items = await Item.find();
  return response.status(200).json(items);
});

router.route("/").post(authorize, bodyParser.json(), async (request, response) => {
  try {
    const item = new Item(request.body);
    await item.save();
    return response.status(200).json("Item saved!");
  } catch (error) {
    return response.status(400).send(error);
  }
});

export default router;
