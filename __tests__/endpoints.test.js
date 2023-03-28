const request = require("supertest");
const { app } = require("../app");
const connection = require("../db/connect");

afterAll(() => connection.end());

describe("app endpoint tests", () => {
  describe("testing invalid paths handler", () => {
    it("should respond with a status 404 and msg", () => {
      return request(app)
        .get("/api/invalid-path")
        .expect(404)
        .then(({ body }) => {
          expect(body.msg).toBe("Sorry, path not found");
        });
    });
  });

  describe("POST /api/user", () => {
    it("should respond with a status 201 created and create a new user", () => {
      return request(app)
        .post("/api/user")
        .expect(201)
        .send({ username: "wdasdwawda", name: "andy", password: "password" })
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
    // it('should respond ? user already exists', () => {
    //   return request(app)
    //     .post('/api/user')
    //     .expect(201)
    //     .send({ name: 'phil', username: 'philly', password: 'password' })
    //     .then(() => {
    //       return request(app)
    //         .post('/api/user')
    //         .expect(401)
    //         .send({ name: 'phil', username: 'philly', password: 'password' })
    //         .then(({ body }) => {
    //           expect(body.msg).toBe('user already exists');
    //         });
    //     });
    // });
  });
  describe("POST /api/games", () => {
    it("Should respond with a status code of 201 and post a game to the database", () => {
      return request(app)
        .post("/api/games")
        .expect(201)
        .send({
          game: {
            user: "testuser",
            songs: {
              track_id: "1240us0rasoierj12z",
            },
          },
        })
        .then((res) => {
          expect(res.body.msg).toBe("Game created");
        });
    });
  });
});
