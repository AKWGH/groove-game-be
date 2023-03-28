const request = require("supertest");
const app = require("../app");

describe("app endpoint tests", () => {
  describe("POST /api/user", () => {
    it("should respond with a status 201 created and create a new user", () => {
      return request(app)
        .post("/api/user")
        .expect(201)
        .send({ username: "andy", name: "andy", password: "andy" })
        .then(({ body }) => {
          expect(body.msg).toBe("user created");
        });
    });
    it("should respond with a status code 401 bad request", () => {
      return request(app)
        .post("/api/user")
        .expect(401)
        .send({ name: "andy" })
        .then(({ body }) => {
          expect(body.msg).toBe("Sorry, please fill out all fields");
        });
    });
  });
});
