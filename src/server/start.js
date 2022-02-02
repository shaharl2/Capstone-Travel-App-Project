const app = require("./server.js");
const port = 3030;
const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});
