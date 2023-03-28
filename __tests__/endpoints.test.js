const request = require("supertest");
const { app } = require("../app");

describe("app endpoint tests", () => {
  describe("testing invalid paths handler", () => {
    it("should respond with a status 404 and msg", () => {
      return request(app).get("/api/invalid-path").expect(404);
    });
  });

  describe("POST /api/user", () => {
    it("should respond with a status 201 created and create a new user", () => {
      const alphabetStr = "abcdefghijklmnopqrstuvwxyz";
      const randomStr = alphabetStr.slice(Math.floor(Math.random() * 25));
      return request(app)
        .post("/api/user")
        .expect(201)
        .send({ username: `${randomStr}`, name: "andy", password: "password" })
        .then(({ body }) => {
          expect(body.msg).toBe("user created");
        });
    });
    it("should respond with a status code 400 user validation failed", () => {
      return request(app)
        .post("/api/user")
        .expect(400)
        .send({ name: "andy" })
        .then(({ body }) => {
          expect(body.msg).toBe("user validation failed");
        });
    });
    it("should respond 401 if user already exists", () => {
      return request(app)
        .post("/api/user")
        .send({ name: "phil", username: "philly", password: "password" })
        .then(() => {
          return request(app)
            .post("/api/user")
            .expect(401)
            .send({ name: "phil", username: "philly", password: "password" })
            .then(({ body }) => {
              expect(body.msg).toBe("user already exists");
            });
        });
    });
    it("should respond with a status code of 401 and a message when provided an incorrect password", () => {
      return request(app)
        .post("/api/user")
        .send({ name: "phil", username: "philly", password: "password" })
        .then(() => {
          return request(app)
            .post("/api/user")
            .expect(401)
            .send({
              name: "phil",
              username: "philly",
              password: "wrongpassword",
            })
            .then(({ body }) => {
              expect(body.msg).toBe("user already exists");
            });
        });
    });
  });
});

//
