// import { checkForName } from "./js/nameChecker";
import { handleSubmit } from "./js/app";
// import { performAction } from "./js/app";

import "./styles/style.scss";

// console.log(checkForName, handleSubmit);
console.log(handleSubmit);

console.log("CHANGE!!");
alert("Work!");

document.getElementById("generate").addEventListener("click", handleSubmit);

// export { checkForName, handleSubmit };

// const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
// const apiKey = "&APPID=c8b54500d5e9ffa850e25490925f845c&units=imperial";

// // Create a new date instance dynamically with JS
// let d = new Date();
// let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

// // Event listener to add function to existing HTML DOM element

// document.getElementById("generate").addEventListener("click", performAction);

// /* Function called by event listener */

// function performAction(e) {
//   let d = new Date();
//   let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();
//   const newZip = document.getElementById("zip").value;
//   const newFeelings = document.getElementById("feelings").value;
//   getWeather(baseURL, newZip, apiKey).then(function (data) {
//     // Add data
//     postData("/addData", {
//       date: newDate,
//       temp: data.main.temp,
//       zip: newZip,
//       feelings: newFeelings,
//     });
//     updateUI();
//   });
// }

// /* Function to GET Web API Data*/

// const getWeather = async (baseURL, zip, key) => {
//   const res = await fetch(baseURL + zip + key);
//   try {
//     const data = await res.json();
//     console.log(data);
//     return data;
//   } catch (error) {
//     console.log("error", error);
//     // appropriately handle the error
//   }
// };

// /* Function to POST data */

// const postData = async (url = "", data = {}) => {
//   const response = await fetch(url, {
//     method: "POST",
//     credentials: "same-origin",
//     headers: {
//       "Content-Type": "application/json",
//     },

//     body: JSON.stringify(data),
//   });

//   try {
//     const newData = await response.json();
//     return newData;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

// /* Function to GET Project Data and dynamically update the UI*/

// const updateUI = async () => {
//   const request = await fetch("/all");
//   try {
//     const allData = await request.json();
//     document.getElementById("date").innerHTML = allData.date;
//     document.getElementById("temp").innerHTML =
//       Math.round(allData.temperature) + " degrees";
//     document.getElementById("content").innerHTML = allData.feelings;
//   } catch (error) {
//     console.log("error", error);
//   }
// };

export { handleSubmit };
