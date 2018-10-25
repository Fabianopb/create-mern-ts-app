import * as jwt from "express-jwt";

// A-ha! So this is where the AUTH_SHARED_SECRET from .env is used!
export const authorize = jwt({
  secret: process.env.AUTH_SHARED_SECRET
});
