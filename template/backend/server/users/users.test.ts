import * as _ from "lodash";
import MongodbMemoryServer from "mongodb-memory-server";
import * as mongoose from "mongoose";
import * as request from "supertest";
import app from "../app";
import User from "./user.model";

describe("/api/users tests", () => {

  const mongod = new MongodbMemoryServer();
  const registerNewUser = (): request.Test => {
    return request(app)
      .post("/api/users/register")
      .send({ email: "new@user.com", password: "test-password" });
  };

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true });
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });

  afterEach(async () => {
    await User.remove({});
  });

  it("should register user", async () => {
    const response = await registerNewUser();
    expect(response.status).toBe(200);
    expect(_.keys(response.body)).toEqual(["token", "expiry"]);
  });

  it("should catch errors when registering user", async () => {
    const response = await request(app)
      .post("/api/users/register")
      .send({});
    expect(response.status).toBe(400);
  });

  it("should login user", async () => {
    await registerNewUser();
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "new@user.com", password: "test-password" });
    expect(response.status).toBe(200);
    expect(_.keys(response.body)).toEqual(["token", "expiry"]);
  });

  it("should return invalid credentials error when login is invalid", async () => {
    await registerNewUser();
    const response = await request(app)
      .post("/api/users/login")
      .send({ email: "new@user.com", password: "wrong-password" });
    expect(response.status).toBe(400);
    expect(response.body).toEqual({ error: "Invalid credentials" });
  });

  it("should get user profile", async () => {
    const register = await registerNewUser();
    const response = await request(app)
      .get("/api/users/profile")
      .set("Authorization", `Bearer ${register.body.token}`);
    expect(response.status).toBe(200);
    expect(response.body.email).toBe("new@user.com");
  });

});
