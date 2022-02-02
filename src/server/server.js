// Setup empty JS object to act as endpoint for all routes
let dataPoint = {};

// Require Express to run server and routes
const express = require("express");

// Start up an instance of app
const app = express();

/* Middleware*/
//Here we are configuring express to use body-parser as middle-ware.
const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Initialize the main project folder
app.use(express.static("dist"));

module.exports = app;
// Callback function to complete GET '/all'
app.get("/all", (req, res) => {
  res.send(dataPoint);
});

// Post Route

app.post("/addData", addData);

function addData(req, res) {
  dataPoint["longtitude"] = req.body.longtitude;
  dataPoint["latitude"] = req.body.latitude;
  dataPoint["country"] = req.body.country;
  dataPoint["city"] = req.body.city;

  dataPoint["time"] = req.body.time;

  res.send(dataPoint);
  console.log(dataPoint);
  console.log(req.body);
}

app.post("/addDataWeather", addDataWeather);

function addDataWeather(req, res) {
  dataPoint["highTemp"] = req.body.highTemp;
  dataPoint["lowTemp"] = req.body.lowTemp;
  dataPoint["description"] = req.body.description;
  dataPoint["icon"] = req.body.icon;

  dataPoint["highTempPlusOne"] = req.body.highTempPlusOne;
  dataPoint["lowTempPlusOne"] = req.body.lowTempPlusOne;
  dataPoint["descriptionPlusOne"] = req.body.descriptionPlusOne;
  dataPoint["iconPlusOne"] = req.body.iconPlusOne;

  dataPoint["highTempPlusTwo"] = req.body.highTempPlusTwo;
  dataPoint["lowTempPlusTwo"] = req.body.lowTempPlusTwo;
  dataPoint["descriptionPlusTwo"] = req.body.descriptionPlusTwo;
  dataPoint["iconPlusTwo"] = req.body.iconPlusTwo;

  res.send(dataPoint);
  console.log(dataPoint);
  console.log(req.body);
}

app.post("/addDataImage", addDataImage);

function addDataImage(req, res) {
  dataPoint["image"] = req.body.image;

  res.send(dataPoint);
  console.log(dataPoint);
  console.log(req.body);
}
