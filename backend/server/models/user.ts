import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";

const Schema = mongoose.Schema;

const UserSchema = new Schema({
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

class UserModel extends mongoose.Model {
  private email: string;
  private hash: string;
  private salt: string;

  public setPassword = (password: string): void => {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, "sha512").toString("hex");
  }

  public isPasswordValid = (password: string): boolean => {
    const hash = crypto.pbkdf2Sync(password, this.salt, 1000000, 512, "sha512").toString("hex");
    return this.hash === hash;
  }

  public generateJwt = (): { token: string; expiry: Date } => {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 30);

    const token = jwt.sign({
      _id: this._id,
      email: this.email,
      name: this.name,
      exp: Math.round(expiry.getTime() / 1000),
    }, process.env.BEER_CELLAR_KEY);

    return { token, expiry };
  }
}

export default mongoose.model("User", UserSchema);
