import * as crypto from "crypto";
import * as jwt from "jsonwebtoken";
import * as mongoose from "mongoose";

interface User {
  email: string;
  hash: string;
  salt: string;
}
// Declare the model interface
interface UserDoc extends User, mongoose.Document {
  setPassword(password: string): void;
  isPasswordValid(password: string): boolean;
  generateJwt(): { token: string; expiry: Date };
}

type UserSchemaDef = { [K in keyof User]: mongoose.SchemaTypeOpts<any> };

const userSchemaDef: UserSchemaDef = {
  email: {
    type: String,
    // Important! We want users to be unique
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
};

// Declare the model schema
const userSchema = new mongoose.Schema(userSchemaDef);

// Define some public methods for our model
class UserClass {
  private _id: string;
  private email: string;
  private salt: string;
  private hash: string;

  // Create a salt and hash from the password
  public setPassword(password: string) {
    this.salt = crypto.randomBytes(16).toString("hex");
    this.hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, "sha512").toString("hex");
  }

  // Check if hashes match
  public isPasswordValid(password: string): boolean {
    const hash = crypto.pbkdf2Sync(password, this.salt, 100000, 512, "sha512").toString("hex");
    return this.hash === hash;
  }

  // Generate access token for 30 minutes
  public generateJwt(): { token: string; expiry: Date } {
    const expiry = new Date();
    expiry.setMinutes(expiry.getMinutes() + 30);

    const token = jwt.sign({
      _id: this._id,
      email: this.email,
      exp: Math.round(expiry.getTime() / 1000),
    }, process.env.AUTH_SHARED_SECRET);

    return { token, expiry };
  }
}

// Important! Don't forget to use loadClass so your new methods will be included in the model
userSchema.loadClass(UserClass);

export default mongoose.model<UserDoc>("User", userSchema);
