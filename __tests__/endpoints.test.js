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

  describe("POST /api/games", () => {
    it("should respond with a status code of 201 when creating a game", () => {
      return request(app)
        .post("/api/user")
        .send({ name: "bob", username: "bob", password: "password" })
        .then(() => {
          return request(app)
            .post("/api/games")
            .expect(201)
            .send({
              game: {
                user: "bob",
                songs: {
                  track_ids: ["125155p2", "51o2j5po25j1", "451opj51po2"],
                },
              },
            });
        });
    });
    it("should respond with a 401 when provided with an incorrect request body", () => {
      return request(app)
        .post("/api/games")
        .expect(401)
        .send({
          games: {
            user: "bob",
            songs: {
              track_ids: ["125155p2", "51o2j5po25j1", "451opj51po2"],
            },
          },
        });
    });
    it("should respond with a 401 when provided with an incorrect request body", () => {
      return request(app)
        .post("/api/games")
        .expect(401)
        .send({
          game: {
            songs: {
              track_ids: ["125155p2", "51o2j5po25j1", "451opj51po2"],
            },
          },
        });
    });
    it("should respond with a 404 if provided a nonexistant user property", () => {
      return request(app)
        .post("/api/games")
        .expect(404)
        .send({
          game: {
            user: "testbob",
            songs: {
              track_ids: ["125155p2", "51o2j5po25j1", "451opj51po2"],
            },
          },
        });
    });
  });
});

//
