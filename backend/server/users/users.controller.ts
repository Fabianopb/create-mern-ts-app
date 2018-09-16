import * as bodyParser from "body-parser";
import { Router } from "express";
import * as mongoose from "mongoose";
import * as passport from "passport";
import { Strategy } from "passport-local";
import { authorize } from "../config";
import User from "./user.model";

passport.use(new Strategy({ usernameField: "email" }, async (username, password, done) => {
  try {
    // Tries to find the user matching the given username
    const user = await User.findOne({ email: username });
    // Check if the password is valid
    if (user && user.isPasswordValid(password)) {
      return done(null, user);
    } else {
      // Throws an error if credentials are not valid
      throw new Error("Invalid credentials");
    }
  } catch (error) {
    return done(error);
  }
}));

const router = Router();

router.route("/register").post(bodyParser.json(), async (request, response) => {
  try {
    const user = new User();
    user.email = request.body.email;
    // Set the password hash with the method created in the model
    user.setPassword(request.body.password);
    await user.save();
    // Returns a new token upon registering a user
    const tokenSignature = user.generateJwt();
    return response.status(200).json(tokenSignature);
  } catch (error) {
    return response.status(400).send(error);
  }
});

router.route("/login").post(bodyParser.json(), (request, response) => {
  // Use passport to authenticate user login
  passport.authenticate("local", (error, user) => {
    if (!user) {
      return response.status(400).json({ error: error.message });
    }
    // If login is valid generate a token and return it to the user
    const tokenSignature = user.generateJwt();
    return response.status(200).json(tokenSignature);
  })(request, response);
});

// This is an example of a protected route. Notice that we call `authorize` in the first place!
router.route("/profile").get(authorize, async (request, response) => {
  const user = await User.findById(request.user._id);
  return response.status(200).json(user);
});

export default router;
