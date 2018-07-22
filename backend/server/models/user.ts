import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";

interface User extends mongoose.Document {
  email: string;
  hash: string;
  salt: string;
  setPassword(password: string): void;
  isPasswordValid(password: string): boolean;
  generateJwt(): { token: string; expiry: Date };
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    required: true
  },
  hash: {
    type: String,
    required: true
  },
  salt: {
    type: String,
    required: true
  }
});

class UserClass {
  private _id: string;
  private email: string;
  private salt: string;
  private hash: string;

  public setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, "sha512").toString("hex");
  }

  public isPasswordValid(password: string): boolean {
    const hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, "sha512").toString("hex");
    return this.hash === hash;
  }

  public generateJwt(): { token: string; expiry: Date } {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 30);

    const token = jwt.sign({
      _id: this._id,
      email: this.email,
      exp: Math.round(expiry.getTime() / 1000),
    }, process.env.BEER_CELLAR_KEY);

    return { token, expiry };
  }
}

userSchema.loadClass(UserClass);

export default mongoose.model<User>("User", userSchema);
