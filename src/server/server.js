// Setup empty JS object to act as endpoint for all routes
projectData = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
// const cors = require("cors");
// app.use(cors());

// Initialize the main project folder
app.use(express.static("dist"));

// Setup Server

const port = 3030;

const server = app.listen(port, () => {
  console.log(`running on localhost: ${port}`);
});

// Callback function to complete GET '/all'
// app.get("/", function (req, res) {
//   res.sendFile("dist/index.html");
// });
app.get("/all", (req, res) => {
  res.send(projectData);
});

// Post Route

app.post("/addData", addData);

function addData(req, res) {
  projectData["longtitude"] = req.body.longtitude;
  projectData["latitude"] = req.body.latitude;
  projectData["country"] = req.body.country;
  projectData["city"] = req.body.city;

  // projectData["feelings"] = req.body.feelings;
  projectData["time"] = req.body.time;

  res.send(projectData);
  console.log(projectData);
  console.log(req.body);
}

app.post("/addDataw", addDataw);

function addDataw(req, res) {
  projectData["highTemp"] = req.body.highTemp;
  projectData["lowTemp"] = req.body.lowTemp;
  projectData["description"] = req.body.description;
  projectData["icon"] = req.body.icon;

  projectData["highTempPlusOne"] = req.body.highTempPlusOne;
  projectData["lowTempPlusOne"] = req.body.lowTempPlusOne;
  projectData["descriptionPlusOne"] = req.body.descriptionPlusOne;
  projectData["iconPlusOne"] = req.body.iconPlusOne;

  projectData["highTempPlusTwo"] = req.body.highTempPlusTwo;
  projectData["lowTempPlusTwo"] = req.body.lowTempPlusTwo;
  projectData["descriptionPlusTwo"] = req.body.descriptionPlusTwo;
  projectData["iconPlusTwo"] = req.body.iconPlusTwo;

  res.send(projectData);
  console.log(projectData);
  console.log(req.body);
}

app.post("/addDatai", addDatai);

function addDatai(req, res) {
  projectData["image"] = req.body.image;

  res.send(projectData);
  console.log(projectData);
  console.log(req.body);
}
// app.get("/", function (req, res) {
//   res.sendFile("dist/index.html");
// });

// // designates what port the app will listen to for incoming requests
// app.listen(3030, function () {
//   console.log("Example app listening on port 3030!");
// });

// app.get("/test", function (req, res) {
//   res.send(mockAPIResponse);
// });

// app.post("/test", async function (req, res) {
//   const data = await fetch(
//     `https://api.meaningcloud.com/sentiment-2.1?key=${apikey}&url=${req.body.url}&lang=en`
//   );

//   try {
//     const newData = await data.json();
//     res.send(newData);
//     console.log(newData);
//   } catch (error) {
//     console.log("error", error);
//   }
// });
