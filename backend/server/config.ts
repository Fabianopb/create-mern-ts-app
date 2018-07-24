import * as jwt from "express-jwt";

export const authorize = jwt({
  secret: process.env.AUTH_SHARED_SECRET
});
