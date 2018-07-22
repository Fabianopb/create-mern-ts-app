import * as bodyParser from "body-parser";
import { Router } from "express";
import * as mongoose from "mongoose";
import * as passport from "passport";
import { Strategy } from "passport-local";
import User from "../models/user";
// import authorize from "../config/authorize";
// require("../config/passport";

passport.use(new Strategy({ usernameField: "email" }, (username, password, done) => {
  User.findOne({ email: username }, (error, user) => {
    if (error) {
      return done(error);
    } else if (!user || !user.isPasswordValid(password)) {
      return done(null, false, {
        message: "Invalid credentials"
      });
    } else {
      return done(null, user);
    }
  });
}));

const router = Router();

router.route("/register").post(bodyParser.json(), async (request, response) => {
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

router.route("/login").post(bodyParser.json(), (request, response) => {
  passport.authenticate("local", (error, user, info) => {
    if (!user) {
      return response.status(401).json(info);
    }
    const tokenSignature = user.generateJwt();
    return response.status(200).json(tokenSignature);
  })(request, response);
});

// router.route("/profile")
//   .get(authorize, function(request, response) {
//     User.findById(request.payload._id, function(error, user) {
//       return response.status(200).json(user);
//     });
//   });

export default router;
