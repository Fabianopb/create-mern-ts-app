import { expect, should } from "chai";
import {} from "jest";
import * as request from "supertest";
import * as app from "../server/server";

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/")
      .expect(200)
      .then(res => {
        expect(res.body).have.property("message");
      });
  });
});
