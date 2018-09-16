import MongodbMemoryServer from "mongodb-memory-server";
import * as mongoose from "mongoose";
import * as request from "supertest";
import app from "../app";
import User from "../users/user.model";
import Item from "./item.model";

describe("/api/items tests", () => {

  const mongod = new MongodbMemoryServer();
  let token: string = "";

  // Connect to mongoose mock, create a test user and get the access token
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

  // Remove test user, disconnect and stop database
  afterAll(async () => {
    await User.remove({});
    await mongoose.disconnect();
    await mongod.stop();
  });

  // Create a sample item
  beforeEach(async () => {
    const item = new Item();
    item.name = "item name";
    item.value = 1000;
    await item.save();
  });

  // Remove sample items
  afterEach(async () => {
    await Item.remove({});
  });

  it("should get items", async () => {
    const response = await request(app)
      .get("/api/items")
      .set("Authorization", `Bearer ${token}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual([expect.objectContaining({ name: "item name", value: 1000 })]);
  });

  it("should post items", async () => {
    const response = await request(app)
      .post("/api/items")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "new item", value: 2000 });
    expect(response.status).toBe(200);
    expect(response.body).toBe("Item saved!");
  });

  it("should catch errors when posting items", async () => {
    const response = await request(app)
      .post("/api/items")
      .set("Authorization", `Bearer ${token}`)
      .send({});
    expect(response.status).toBe(400);
  });
});
