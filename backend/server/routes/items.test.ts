import * as request from "supertest";
import app, { closeServer } from "../server";
import itemsRoutes from "./items";

describe("routes/items tests", () => {

  afterAll(() => {
    closeServer();
  });

  it("should get items", () => {
    return request(app).get("/api")
      .expect(200)
      .then((response: any) => {
        expect(response.body).toEqual("Root route works!!!");
      });
  });
});
