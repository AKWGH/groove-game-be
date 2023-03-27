const request = require("supertest");
const { app, start } = require("../app.js");

beforeEach(() => {
  start();
});

afterAll(() => {});

describe("API Testing", () => {
  describe("/api/songs/:genre", () => {
    it("Should return an array of objects containing songs", () => {
      return request(app)
        .get("/api/songs/pop")
        .expect(200)
        .then((res) => {
          console.log(res);
        });
    });
  });
});
