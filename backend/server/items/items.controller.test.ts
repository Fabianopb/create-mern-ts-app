import MongodbMemoryServer from "mongodb-memory-server";
import * as mongoose from "mongoose";
import * as request from "supertest";
import app from "../app";
import User from "../users/user.model";

describe("routes/items tests", () => {

  const mongod = new MongodbMemoryServer();
  let token: string = "";

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true });
    const user = new User();
    user.email = "test@email.com";
    user.setPassword("test-password");
    await user.save();
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "test@email.com", password: "test-password" });
    token = response.body.token;
  });

  afterAll(async () => {
    User.remove({});
    mongoose.disconnect();
    mongod.stop();
  });

  it("should get items", async () => {
    const response = await request(app)
      .get("/api/items")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });
});
