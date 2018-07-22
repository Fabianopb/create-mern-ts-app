import * as bodyParser from "body-parser";
import { Request, Response, Router } from "express";
import * as mongoose from "mongoose";
import * as passport from "passport";
import User from "../models/user";
// import authorize from "../config/authorize";
// require("../config/passport";

const router = Router();

router.route("/register").get(async (request, response) => {
  return response.status(200).json("Get register works!!!");
});

router.route("/register").post(bodyParser.json(), async (request: Request, response: Response) => {
  try {
    const user = new User();
    user.email = request.body.email;
    user.setPassword(request.body.password);
    await user.save();
    const tokenSignature = user.generateJwt();
    return response.status(200).json(tokenSignature);
  } catch (error) {
    return response.status(400).send(error);
  }
});

// router.route("/login")
//   .post(bodyParser, function(request, response) {
//     passport.authenticate("local", function(error, user, info){
//       if(!user) {
//         return response.status(401).json(info);
//       }
//       var tokenSignature = user.generateJwt();
//       return response.status(200).json(tokenSignature);
//     })(request, response);
//   });
//
// router.route("/profile")
//   .get(authorize, function(request, response) {
//     User.findById(request.payload._id, function(error, user) {
//       return response.status(200).json(user);
//     });
//   });

export default router;
