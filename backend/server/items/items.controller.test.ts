import MongodbMemoryServer from "mongodb-memory-server";
import * as mongoose from "mongoose";
import * as request from "supertest";
import app from "../app";

describe("routes/items tests", () => {

  const mongod = new MongodbMemoryServer();

  beforeAll(async () => {
    const uri = await mongod.getConnectionString();
    await mongoose.connect(uri, { useNewUrlParser: true });
  });

  afterAll(async () => {
    mongoose.disconnect();
    mongod.stop();
  });

  it("should get items", () => {
    return request(app).get("/api/items")
      .expect(200)
      .then((response: any) => {
        expect(response.body).toEqual({});
      });
  });
});
