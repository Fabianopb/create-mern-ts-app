import * as express from "express";

const router = express.Router();

router.route("/")
  .get(async (request, response) => {
    return response.status(200).json("Root route works!");
  });

export default router;
