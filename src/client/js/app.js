function handleSubmit(event) {
  event.preventDefault();

  const baseURL = "http://api.geonames.org/search?name=";
  const apiKey = "&maxRows=10&type=json&username=shaharl2";

  const baseURL_weather = "https://api.weatherbit.io/v2.0/forecast/daily?&lat=";
  const apiKey_weather = "&key=904d5aa577174973a423e19d13fbe5c5";

  const baseURL_weather_normals = "https://api.weatherbit.io/v2.0/normals?lat=";

  const baseURL_pixabay = "https://pixabay.com/api/?&category=travel&key=";
  const apiKey_pixabay = "25361170-52a1345cf2abb255a53c1d824&q=";

  const getData = async (baseURL, city, key) => {
    const res = await fetch(baseURL + city + key);
    try {
      const data = await res.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log("error", error);
    }
  };

  const cityName = document.getElementById("city").value;

  // ++++get the input departure date in milliseconds+++++
  const timeCounter = document.getElementById("departure").valueAsNumber;
  // ++++get the input departure date in ISO8601 format+++++
  const departureDate = document.getElementById("departure").value;
  // ++++get the input departure date in date string format+++++
  const departureDateString = document.getElementById("departure").valueAsDate;
  // ++++setting the next day date++++
  departureDateString.setDate(departureDateString.getDate() + 1);

  // ++++next day date in ISO8601 format+++++
  const departureDatePlusOne = departureDateString.toISOString().split("T")[0];
  // ++++setting the day after the next day date++++
  departureDateString.setDate(departureDateString.getDate() + 1);

  // ++++day after the next day date in ISO8601 format+++++
  const departureDatePlusTwo = departureDateString.toISOString().split("T")[0];

  console.log(departureDate);
  console.log(departureDateString);
  console.log(departureDatePlusOne);
  console.log(departureDatePlusTwo);

  const now = new Date().getTime();
  console.log(timeCounter);
  console.log(now);

  //++++time left to departure in milliseconds
  const timeLeft = timeCounter - now;
  //++++restricting the user to input only future departure dates
  if (timeLeft < 0) {
    alert("This flight has already departured! Try again!");
    return;
  }
  console.log(timeLeft);

  //converting time left to departure in ms to days left
  const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24));

  getData(baseURL, cityName, apiKey).then(function (data) {
    // Add data
    console.log(data.geonames[0].countryName);
    // chaining promises
    postData("/addData", {
      longtitude: data.geonames[0].lng,
      latitude: data.geonames[0].lat,
      city: cityName,
      country: data.geonames[0].countryName,
      time: daysLeft,
    });

    // ++++if the trip is within 16 days we use weatherbit Forecast API (16 day / daily)++++
    if (daysLeft < 16) {
      const getWeather = async (baseURLw, latitude, longtitude, keyw) => {
        const res = await fetch(
          baseURLw + latitude + "&lon=" + longtitude + keyw
        );
        try {
          const dataWeather = await res.json();
          console.log(dataWeather);
          return dataWeather;
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
      ).then(function (dataWeather) {
        // Add data
        console.log(dataWeather.data[daysLeft].max_temp);
        postDataWeather("/addDataWeather", {
          highTemp: dataWeather.data[daysLeft].max_temp,
          lowTemp: dataWeather.data[daysLeft].min_temp,
          description: dataWeather.data[daysLeft].weather.description,
          icon: dataWeather.data[daysLeft].weather.icon,
          highTempPlusOne: dataWeather.data[daysLeft + 1].max_temp,
          lowTempPlusOne: dataWeather.data[daysLeft + 1].min_temp,
          descriptionPlusOne:
            dataWeather.data[daysLeft + 1].weather.description,
          iconPlusOne: dataWeather.data[daysLeft + 1].weather.icon,
          highTempPlusTwo: dataWeather.data[daysLeft + 2].max_temp,
          lowTempPlusTwo: dataWeather.data[daysLeft + 2].min_temp,
          descriptionPlusTwo:
            dataWeather.data[daysLeft + 2].weather.description,
          iconPlusTwo: dataWeather.data[daysLeft + 2].weather.icon,
        });
        updateUI();
      });
      // ++++if the trip starts after 16 days we use weatherbit Climate Normals API that returns the average of 30 year historical climate (daily)++++
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
          const dataWeather = await res.json();
          console.log(dataWeather);
          return dataWeather;
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
        departureDatePlusTwo.slice(5),
        apiKey_weather
      ).then(function (dataWeather) {
        // Add data
        console.log(dataWeather);

        console.log(dataWeather.data[0].max_temp);
        postDataWeather("/addDataWeather", {
          highTemp: dataWeather.data[0].max_temp,
          lowTemp: dataWeather.data[0].min_temp,
          highTempPlusOne: dataWeather.data[1].max_temp,
          lowTempPlusOne: dataWeather.data[1].min_temp,
          highTempPlusTwo: dataWeather.data[2].max_temp,
          lowTempPlusTwo: dataWeather.data[2].min_temp,
        });
        updateUI();
      });
    }

    const getImage = async (baseURLi, keyi, city) => {
      const res = await fetch(baseURLi + keyi + city);
      try {
        const dataImage = await res.json();
        console.log(dataImage);
        return dataImage;
      } catch (error) {
        console.log("error", error);
        // appropriately handle the error
      }
    };

    getImage(baseURL_pixabay, apiKey_pixabay, cityName).then(function (
      dataImage
    ) {
      // Add data
      console.log(dataImage.hits[0].webformatURL);
      console.log(dataImage.total);

      if (dataImage.total > 0) {
        postDataImage("/addDataImage", {
          image: dataImage.hits[0].webformatURL,
        });
        updateUI();
      } else {
        alert("No hits! Please enter a valid destination");
      }
    });
  });

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

  const postDataWeather = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    try {
      const newDataWeather = await response.json();
      return newDataWeather;
    } catch (error) {
      console.log("error", error);
    }
  };
  const postDataImage = async (url = "", data = {}) => {
    const response = await fetch(url, {
      method: "POST",
      credentials: "same-origin",
      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify(data),
    });

    try {
      const newDataimage = await response.json();
      return newDataImage;
    } catch (error) {
      console.log("error", error);
    }
  };
  /* Function to GET Project Data and dynamically update the UI*/

  const updateUI = async () => {
    const request = await fetch("/all");
    try {
      const allData = await request.json();
      // document.getElementById("country").innerHTML =
      //   "Country: " + allData.country;
      document.getElementById("destination").innerHTML =
        "Your trip to " +
        allData.city +
        ", " +
        allData.country +
        " is " +
        allData.time +
        " days away";
      document.getElementById("date").innerHTML = "Departing: " + departureDate;

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
        ).innerHTML = `A typical weather at ${departureDatePlusOne.slice(
          5
        )} would be: <br> High: ${allData.highTempPlusOne} Low: ${
          allData.lowTempPlusOne
        }`;
        document.getElementById("iconPlusOne").firstChild.src = "";
        document.getElementById(
          "weatherPlusTwo"
        ).innerHTML = `A typical weather at ${departureDatePlusTwo.slice(
          5
        )} would be: <br> High: ${allData.highTempPlusTwo} Low: ${
          allData.lowTempPlusTwo
        }`;
        document.getElementById("iconPlusTwo").firstChild.src = "";
      }
      // document.getElementById("lng").innerHTML =
      //   "Longtitude: " + allData.longtitude;
      // document.getElementById("lat").innerHTML =
      //   "Latitude: " + allData.latitude;
      // document.getElementById("content").innerHTML = allData.feelings;
      // document.getElementById("timeLeft").innerHTML =
      //   "Your trip is " + allData.time + " days away";
      // document.getElementById("high").innerHTML =
      //   "High Temp: " + allData.highTemp;
      // document.getElementById("low").innerHTML = "Low Temp: " + allData.lowTemp;
      document.getElementById("photo").firstChild.src = allData.image;
    } catch (error) {
      console.log("error", error);
    }
  };
}

export { handleSubmit };
