const request = require("supertest");
const { app, start } = require("../app.js");
const { tokenRefresh } = require("../api");

describe("API Testing", () => {
  describe("/api/songs/:genre", () => {
    it("Should return a status code of 200", () => {
      return request(app).get("/api/songs/pop").expect(200);
    });
    it("Should return an array of objects", () => {
      return request(app)
        .get("/api/songs/pop")
        .expect(200)
        .then((res) => {
          expect(res.body.tracks.length).not.toBe(0);
        });
    });
    it("Should return an array of objects containing objects with the correct properties", () => {
      return request(app)
        .get("/api/songs/rock")
        .expect(200)
        .then((res) => {
          res.body.tracks.forEach((obj) => {
            let keys = Object.keys(obj);
            expect(keys).toEqual([
              "album",
              "artists",
              "available_markets",
              "disc_number",
              "duration_ms",
              "explicit",
              "external_ids",
              "external_urls",
              "href",
              "id",
              "is_local",
              "name",
              "popularity",
              "preview_url",
              "track_number",
              "type",
              "uri",
            ]);
          });
        });
    });
    it("Should return an array of objects when selecting a different genre", () => {
      return request(app)
        .get("/api/songs/hip_hop")
        .expect(200)
        .then((res) => {
          res.body.tracks.forEach((obj) => {
            let keys = Object.keys(obj);
            expect(keys).toEqual([
              "album",
              "artists",
              "available_markets",
              "disc_number",
              "duration_ms",
              "explicit",
              "external_ids",
              "external_urls",
              "href",
              "id",
              "is_local",
              "name",
              "popularity",
              "preview_url",
              "track_number",
              "type",
              "uri",
            ]);
          });
        });
    });
    it("Should return a 404 when passed an invalid genre name", () => {
      return request(app)
        .get("/api/songs/invalidgenre")
        .expect(404)
        .then((res) => {
          expect(res.text).toBe("genre not found");
        });
    });
  });
});
