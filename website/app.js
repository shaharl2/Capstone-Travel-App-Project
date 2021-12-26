/* Global Variables */
// Personal API Key for OpenWeatherMap API

let baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
let apiKey = "&APPID=c8b54500d5e9ffa850e25490925f845c&units=imperial";

// Create a new date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + "." + d.getDate() + "." + d.getFullYear();

// Event listener to add function to existing HTML DOM element

document.getElementById("generate").addEventListener("click", performAction);

/* Function called by event listener */

function performAction(e) {
  const newZip = document.getElementById("zip").value;
  const newFeelings = document.getElementById("feelings").value;
  getWeather(baseURL, newZip, apiKey).then(function (data) {
    // Add data
    postData("/add", {
      date: newDate,
      temp: data.main.temp,
      zip: newZip,
      feelings: newFeelings,
    });
    updateUI();
  });
}

/* Function to GET Web API Data*/

const getWeather = async (baseURL, zip, key) => {
  const res = await fetch(baseURL + zip + key);
  try {
    const data = await res.json();
    return data;
  } catch (error) {
    console.log("error", error);
    // appropriately handle the error
  }
};

/* Function to POST data */

const postData = async (url = "", data = {}) => {
  const response = await fetch(url, {
    method: "POST",
    credentials: "same-origin",
    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(data),
  });

  try {
    const newData = await response.json();
    return newData;
  } catch (error) {
    console.log("error", error);
  }
};

/* Function to GET Project Data and dynamically update the UI*/

const updateUI = async () => {
  const request = await fetch("/all");
  try {
    const allData = await request.json();
    document.getElementById("date").innerHTML = allData[0].date;
    document.getElementById("temp").innerHTML =
      Math.round(allData[0].temp) + " degrees";
    document.getElementById("content").innerHTML = allData[0].feelings;
  } catch (error) {
    console.log("error", error);
  }
};
