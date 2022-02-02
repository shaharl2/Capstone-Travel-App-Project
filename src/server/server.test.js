const app = require("./server"); // Link to server file
const supertest = require("supertest");
const request = supertest(app);
it("Testing /all endpoint", async (done) => {
  const response = await request.get("/all");
  expect(response.status).toBe(200); // check if request was successfull
  expect(response.body).toBeDefined(); // check if response returned value of dataPoint
  done();
});
