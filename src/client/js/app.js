/* Global Variables */
// Personal API Key for OpenWeatherMap API
function handleSubmit(event) {
  event.preventDefault();

  // const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=";
  // const apiKey = "&APPID=c8b54500d5e9ffa850e25490925f845c&units=imperial";
  const baseURL = "http://api.geonames.org/search?name=";
  const apiKey = "&maxRows=10&type=json&username=shaharl2";

  // const baseURL_weather = "https://api.weatherbit.io/v2.0/forecast/daily";
  // const apiKey_weather =
  //   "?&lat=52.524&lon=13.410&key=904d5aa577174973a423e19d13fbe5c5";
  const baseURL_weather = "https://api.weatherbit.io/v2.0/forecast/daily?&lat=";
  const apiKey_weather = "&key=904d5aa577174973a423e19d13fbe5c5";

  const baseURL_weather_normals = "https://api.weatherbit.io/v2.0/normals?lat=";

  // "?&lat=52.524&lon=13.410&key=904d5aa577174973a423e19d13fbe5c5";

  const baseURL_pixabay = "https://pixabay.com/api/?&category=travel&key=";
  const apiKey_pixabay = "25361170-52a1345cf2abb255a53c1d824&q=";

  // Create a new date instance dynamically with JS
  // let d = new Date();
  // let newDate = d.getMonth() + 1 + "/" + d.getDate() + "/" + d.getFullYear();

  // Event listener to add function to existing HTML DOM element
  //   fetch("http://localhost:3030/test", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //
  //     body: JSON.stringify
  //   })
  //     .then((res) => {
  //       console.log("RESPONSE, WAITING TO PARSE...", res);
  // const data = await res.json();
  // console.log(data);
  // return data;
  //       return res.json();
  //     })
  //     .then((data) => {
  //       console.log("DATA PARSED...");
  // const newZip = document.getElementById("zip").value;
  //   const newFeelings = document.getElementById("feelings").value;
  //   getWeather(baseURL, newZip, apiKey).then(function (data) {
  //     // Add data
  //     postData("/addData", {
  //       date: newDate,
  //       temp: data.main.temp,
  //       zip: newZip,
  //       feelings: newFeelings,
  //     });
  // const allData = await request.json();
  //     document.getElementById("date").innerHTML = allData.date;
  //     document.getElementById("temp").innerHTML =
  //       Math.round(allData.temperature) + " degrees";
  //     document.getElementById("content").innerHTML = allData.feelings;
  //      console.log(data);

  //     })
  //     .catch((e) => {
  //       console.log("OH NO! ERROR!", e);
  //     });
  // }
  // document.getElementById("generate").addEventListener("click", performAction);
  const getData = async (baseURL, city, key) => {
    const res = await fetch(baseURL + city + key);
    try {
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log("error", error);
      // appropriately handle the error
    }
  };

  /* Function called by event listener */
  // function performAction(e) {
  const cityName = document.getElementById("city").value;
  // const newFeelings = document.getElementById("feelings").value;
  const timeCounter = document.getElementById("departure").valueAsNumber;
  const departureDate = document.getElementById("departure").value;
  const departureDatePlusOne = document.getElementById("departure").valueAsDate;
  departureDatePlusOne.setDate(departureDatePlusOne.getDate() + 1);
  // const departureDateThree = new Date(departureDateTwo);
  const departureDatePlusTwo = departureDatePlusOne.toISOString().split("T")[0];
  departureDatePlusOne.setDate(departureDatePlusOne.getDate() + 1);
  const departureDatePlusThree = departureDatePlusOne
    .toISOString()
    .split("T")[0];

  console.log(departureDate);
  console.log(departureDatePlusOne);
  // console.log(departureDateTwo);
  // console.log(departureDateThree);
  console.log(departureDatePlusTwo);
  console.log(departureDatePlusThree);
  const now = new Date().getTime();
  //const countDownDate = timeCounter.valueAsNumber;
  console.log(timeCounter);
  console.log(now);
  //console.log(countDownDate);

  const timeLeft = timeCounter - now;
  if (timeLeft < 0) {
    alert("This flight has already departured! Try again!");
    return;
  }
  console.log(timeLeft);

  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  getData(baseURL, cityName, apiKey).then(function (data) {
    // Add data
    console.log(data.geonames[0].countryName);

    postData("/addData", {
      longtitude: data.geonames[0].lng,
      latitude: data.geonames[0].lat,
      city: cityName,
      country: data.geonames[0].countryName,
      // feelings: newFeelings,
      time: daysLeft,
    });
    // updateUI();
    if (daysLeft < 16) {
      const getWeather = async (baseURLw, latitude, longtitude, keyw) => {
        const res = await fetch(
          baseURLw + latitude + "&lon=" + longtitude + keyw
        );
        try {
          const dataw = await res.json();
          console.log(dataw);
          return dataw;
        } catch (error) {
          console.log("error", error);
          // appropriately handle the error
        }
      };
      getWeather(
        baseURL_weather,
        data.geonames[0].lat,
        data.geonames[0].lng,
        apiKey_weather
      ).then(function (dataw) {
        // Add data
        console.log(dataw.data[daysLeft].max_temp);
        postDataw("/addDataw", {
          highTemp: dataw.data[daysLeft].max_temp,
          lowTemp: dataw.data[daysLeft].min_temp,
          description: dataw.data[daysLeft].weather.description,
          icon: dataw.data[daysLeft].weather.icon,
          highTempPlusOne: dataw.data[daysLeft + 1].max_temp,
          lowTempPlusOne: dataw.data[daysLeft + 1].min_temp,
          descriptionPlusOne: dataw.data[daysLeft + 1].weather.description,
          iconPlusOne: dataw.data[daysLeft + 1].weather.icon,
          highTempPlusTwo: dataw.data[daysLeft + 2].max_temp,
          lowTempPlusTwo: dataw.data[daysLeft + 2].min_temp,
          descriptionPlusTwo: dataw.data[daysLeft + 2].weather.description,
          iconPlusTwo: dataw.data[daysLeft + 2].weather.icon,
        });
        updateUI();
      });
      // https://api.weatherbit.io/v2.0/normals?lat=35.5&lon=-75.5&start_day=02-02&end_day=02-03&key=904d5aa577174973a423e19d13fbe5c5
    } else {
      const getWeather = async (
        baseURLw,
        latitude,
        longtitude,
        start,
        end,
        keyw
      ) => {
        const res = await fetch(
          baseURLw +
            latitude +
            "&lon=" +
            longtitude +
            "&start_day=" +
            start +
            "&end_day=" +
            end +
            keyw
        );
        try {
          const dataw = await res.json();
          console.log(dataw);
          return dataw;
        } catch (error) {
          console.log("error", error);
          // appropriately handle the error
        }
      };
      getWeather(
        baseURL_weather_normals,
        data.geonames[0].lat,
        data.geonames[0].lng,
        departureDate.slice(5),
        departureDatePlusThree.slice(5),
        apiKey_weather
      ).then(function (dataw) {
        // Add data
        console.log(dataw);

        console.log(dataw.data[0].max_temp);
        postDataw("/addDataw", {
          highTemp: dataw.data[0].max_temp,
          lowTemp: dataw.data[0].min_temp,
          highTempPlusOne: dataw.data[1].max_temp,
          lowTempPlusOne: dataw.data[1].min_temp,
          highTempPlusTwo: dataw.data[2].max_temp,
          lowTempPlusTwo: dataw.data[2].min_temp,
        });
        updateUI();
      });
    }

    const getImage = async (baseURLi, keyi, city) => {
      const res = await fetch(baseURLi + keyi + city);
      try {
        const datai = await res.json();
        console.log(datai);
        return datai;
      } catch (error) {
        console.log("error", error);
        // appropriately handle the error
      }
    };

    getImage(baseURL_pixabay, apiKey_pixabay, cityName).then(function (datai) {
      // Add data
      console.log(datai.hits[0].webformatURL);
      console.log(datai.total);

      if (datai.total > 0) {
        postDatai("/addDatai", {
          image: datai.hits[0].webformatURL,
        });
        updateUI();
      } else {
        alert("No hits! Please enter a valid destination");
      }
    });
  });
  // }

  /* Function to GET Web API Data*/

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

  // const getWeather = async (baseURLw, latitude, longtitude, keyw) => {
  //   const res = await fetch(baseURLw + latitude + "&lon=" + longtitude + keyw);
  //   try {
  //     const dataw = await res.json();
  //     console.log(dataw);
  //     return dataw;
  //   } catch (error) {
  //     console.log("error", error);
  //     // appropriately handle the error
  //   }
  // };

  // getWeather(baseURL_weather, latitude, longtitude, apiKey_weather).then(
  //   function (dataw) {
  //     // Add data
  //     console.log(dataw.data[0].high_temp);
  //     postDataw("/addDataw", {
  //       highTemp: dataw.data[0].high_temp,
  //       lowTemp: dataw.data[0].app_min_temp,
  //     });
  //     updateUI();
  //   }
  // );

  const postDataw = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    try {
      const newDataw = await response.json();
      return newDataw;
    } catch (error) {
      console.log("error", error);
    }
  };
  const postDatai = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    try {
      const newDatai = await response.json();
      return newDatai;
    } catch (error) {
      console.log("error", error);
    }
  };
  /* Function to GET Project Data and dynamically update the UI*/

  const updateUI = async () => {
    const request = await fetch("/all");
    try {
      const allData = await request.json();
      document.getElementById("country").innerHTML =
        "Country: " + allData.country;
      document.getElementById("destination").innerHTML =
        "Your trip to " +
        allData.city +
        ", " +
        allData.country +
        " is " +
        allData.time +
        " days away";
      document.getElementById("date").innerHTML = "Departing: " + departureDate;
      // document.getElementById("tripCounter").innerHTML =
      //   allData.city +
      //   ", " +
      //   allData.country +
      //   " is " +
      //   allData.time +
      //   " days away";
      if (daysLeft < 16) {
        document.getElementById(
          "weather"
        ).innerHTML = `The weather forecast for ${allData.city}, ${allData.country} at ${departureDate} is: <br> High: ${allData.highTemp} Low: ${allData.lowTemp} <br> ${allData.description} throughout the day`;
        document.getElementById(
          "icon"
        ).firstChild.src = `https://www.weatherbit.io/static/img/icons/${allData.icon}.png`;
        document.getElementById(
          "weatherPlusOne"
        ).innerHTML = `The next day you should expect: <br> High: ${allData.highTempPlusOne} Low: ${allData.lowTempPlusOne} <br> ${allData.descriptionPlusOne} throughout the day`;
        document.getElementById(
          "iconPlusOne"
        ).firstChild.src = `https://www.weatherbit.io/static/img/icons/${allData.iconPlusOne}.png`;
        document.getElementById(
          "weatherPlusTwo"
        ).innerHTML = `The day after that you should expect: <br> High: ${allData.highTempPlusTwo} Low: ${allData.lowTempPlusTwo} <br> ${allData.descriptionPlusTwo} throughout the day`;
        document.getElementById(
          "iconPlusTwo"
        ).firstChild.src = `https://www.weatherbit.io/static/img/icons/${allData.iconPlusTwo}.png`;
      } else {
        document.getElementById("weather").innerHTML = `Typical weather for ${
          allData.city
        }, ${allData.country} at ${departureDate.slice(5)} is: <br> High: ${
          allData.highTemp
        } Low: ${allData.lowTemp}`;
        document.getElementById("icon").firstChild.src = "";
        document.getElementById(
          "weatherPlusOne"
        ).innerHTML = `A typical weather at ${departureDatePlusTwo.slice(
          5
        )} would be: <br> High: ${allData.highTempPlusOne} Low: ${
          allData.lowTempPlusOne
        }`;
        document.getElementById("iconPlusOne").firstChild.src = "";
        document.getElementById(
          "weatherPlusTwo"
        ).innerHTML = `A typical weather at ${departureDatePlusThree.slice(
          5
        )} would be: <br> High: ${allData.highTempPlusTwo} Low: ${
          allData.lowTempPlusTwo
        }`;
        document.getElementById("iconPlusTwo").firstChild.src = "";
      }
      document.getElementById("lng").innerHTML =
        "Longtitude: " + allData.longtitude;
      document.getElementById("lat").innerHTML =
        "Latitude: " + allData.latitude;
      // document.getElementById("content").innerHTML = allData.feelings;
      document.getElementById("timeLeft").innerHTML =
        "Your trip is " + allData.time + " days away";
      document.getElementById("high").innerHTML =
        "High Temp: " + allData.highTemp;
      document.getElementById("low").innerHTML = "Low Temp: " + allData.lowTemp;
      document.getElementById("photo").firstChild.src = allData.image;
    } catch (error) {
      console.log("error", error);
    }
  };
}

export { handleSubmit };
