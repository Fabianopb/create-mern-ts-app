import * as request from "supertest";
import * as app from "../server/server";

describe("GET /api", () => {
  it("should return 200 OK", () => {
    return request(app)
      .get("/api")
      .expect(200)
      .then(res => {
        console.log(res.body);
        expect(res.body).toEqual({message: "The backend is running!"});
      });
  });
});
