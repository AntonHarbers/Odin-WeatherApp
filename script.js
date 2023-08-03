const endpoint = "http://api.weatherapi.com/v1";
const apiKey = "6c5d19286ef047d387d103759230108";
let city = "London";

let forecastEndpoint = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`

// main info elements
const conditionImg = document.querySelector("#conditionImg");
const cityText = document.querySelector("#city");
const countryText = document.querySelector("#country");
const localTimeText = document.querySelector("#localTime");
const tempText = document.querySelector("#temp");
const feelsLikeText = document.querySelector("#feelsLike");
const conditionText = document.querySelector("#condition");

// secondary info elements
const windSpeedText = document.querySelector("#windSpeed");
const windDirectionImage = document.querySelector("#windDirection");
const humidityText = document.querySelector("#humidity");
const uvText = document.querySelector("#uv");
const pressureText = document.querySelector("#pressure");


let isCelcius = true;
let isDay = true;
let isWindKph = true;

const celciusCheckbox = document.querySelector("#checkbox");
const celciusCheckboxLabel = document.querySelector("#checkboxLabel");
const windCheckbox = document.querySelector("#windCheckbox");
const windCheckboxLabel = document.querySelector("#windCheckboxLabel");

const searchForm = document.querySelector("form");

const forecastDay1Date = document.querySelector("#forecastDay1Date");
const forecastDay1ConditionImg = document.querySelector("#forecastDay1Img");
const forecastDay1Temp = document.querySelector("#forecastDay1Temp");

const forecastDay2Date = document.querySelector("#forecastDay2Date");
const forecastDay2ConditionImg = document.querySelector("#forecastDay2Img");
const forecastDay2Temp = document.querySelector("#forecastDay2Temp");

const forecastDay3Date = document.querySelector("#forecastDay3Date");
const forecastDay3ConditionImg = document.querySelector("#forecastDay3Img");
const forecastDay3Temp = document.querySelector("#forecastDay3Temp");


// load isCelcius and isWindKph from local storage
if (localStorage.getItem("isCelcius") === null) {
  localStorage.setItem("isCelcius", true);
} else {
  isCelcius = JSON.parse(localStorage.getItem("isCelcius"));
  if (isCelcius) {
    celciusCheckboxLabel.innerHTML = "°C";
  } else {
    celciusCheckboxLabel.innerHTML = "°F";
    celciusCheckbox.checked = true;
  }
}

if (localStorage.getItem("isWindKph") === null) {
  localStorage.setItem("isWindKph", true);
} else {
  isWindKph = JSON.parse(localStorage.getItem("isWindKph"));
  if (isWindKph) {
    windCheckboxLabel.innerHTML = "km/h";
  } else {
    windCheckboxLabel.innerHTML = "mph";
    windCheckbox.checked = true;
  }
}


searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  city = e.target[0].value;
  forecastEndpoint = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`

  getWeather();
});

celciusCheckbox.addEventListener("change", () => {
  isCelcius = !isCelcius;
  if (isCelcius) {
    celciusCheckboxLabel.innerHTML = "°C";
  } else {
    celciusCheckboxLabel.innerHTML = "°F";
  }
  // set local storage 
  localStorage.setItem("isCelcius", isCelcius);

  getWeather();
});

windCheckbox.addEventListener("change", () => {
  isWindKph = !isWindKph;
  if (isWindKph) {
    windCheckboxLabel.innerHTML = "km/h";
  } else {
    windCheckboxLabel.innerHTML = "mph";
  }

  // set local storage
  localStorage.setItem("isWindKph", isWindKph);
  getWeather();
});

const getWeather = async () => {
  // create loading spinner
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  document.body.appendChild(spinner);

  try {
    const response = await fetch(forecastEndpoint);
    const data = await response.json();
    console.log(data);

    // set main info elements
    conditionImg.src = await data.current.condition.icon;
    localTimeText.innerHTML = await data.location.localtime;
    cityText.innerHTML = await data.location.name;
    countryText.innerHTML = await data.location.country;
    if (isCelcius) {
      tempText.innerHTML = (await data.current.temp_c) + "°C";
      feelsLikeText.innerHTML = (await data.current.feelslike_c) + "°C";
    } else {
      tempText.innerHTML = (await data.current.temp_f) + "°F";
      feelsLikeText.innerHTML = (await data.current.feelslike_f) + "°F";
    }
    conditionText.innerHTML = await data.current.condition.text;

    // set secondary info elements
    humidityText.innerHTML = (await data.current.humidity) + "%";
    uvText.innerHTML = await data.current.uv;
    pressureText.innerHTML = (await data.current.pressure_mb) + " mb";

    forecastDay1Date.textContent = await data.forecast.forecastday[0].date;
    forecastDay1ConditionImg.src = await data.forecast.forecastday[0].day.condition.icon;
    forecastDay2Date.textContent = await data.forecast.forecastday[1].date;
    forecastDay2ConditionImg.src = await data.forecast.forecastday[1].day.condition.icon;
    forecastDay3Date.textContent = await data.forecast.forecastday[2].date;
    forecastDay3ConditionImg.src = await data.forecast.forecastday[2].day.condition.icon;
    
    if (isCelcius) {
      forecastDay1Temp.textContent = await data.forecast.forecastday[0].day.avgtemp_c + "°C";
      forecastDay2Temp.textContent = await data.forecast.forecastday[1].day.avgtemp_c + "°C";
      forecastDay3Temp.textContent = await data.forecast.forecastday[2].day.avgtemp_c + "°C";
    } else {
      forecastDay1Temp.textContent = await data.forecast.forecastday[0].day.avgtemp_f + "°F";
      forecastDay2Temp.textContent = await data.forecast.forecastday[1].day.avgtemp_f + "°F";
      forecastDay3Temp.textContent = await data.forecast.forecastday[2].day.avgtemp_f + "°F";
    }
    
    // set wind direction image according to wind direction
    console.log(await data.current.wind_dir)
    const windDirection = await data.current.wind_dir;
    if (windDirection === "N") {
      windDirectionImage.src = "images/arrows/up.png";
    } else if (windDirection === "S") {
      windDirectionImage.src = "images/arrows/down.png";
    } else if (windDirection === "E") {
      windDirectionImage.src = "images/arrows/right.png";
    } else if (windDirection === "W") {
      windDirectionImage.src = "images/arrows/left.png";
    } else if (windDirection === "NE") {
      windDirectionImage.src = "images/arrows/up-right.png";
    } else if (windDirection === "NNW" || windDirection === "WNW" || windDirection === "NW") {
      windDirectionImage.src = "images/arrows/up-left.png";
    } else if (windDirection === "SE") {
      windDirectionImage.src = "images/arrows/down-right.png";
    } else if (windDirection === "WSW" || windDirection === "SSW" || windDirection === "SW") {
      windDirectionImage.src = "images/arrows/down-left.png";
    }


    if (isWindKph) {
      windSpeedText.innerHTML = (await data.current.wind_kph) + " km/h";
    } else {
      windSpeedText.innerHTML = (await data.current.wind_mph) + " mph";
    }

    // set body background color according to day/night
    if (await data.current.is_day) {
      // set background image to a gradient that looks like a sunny day
      document.body.style.backgroundImage = "linear-gradient(skyblue, orange)";

    } else {
      document.body.style.backgroundImage = "linear-gradient(black, midnightblue)";
    }
  } catch (e) {
    console.log(e);
    alert("City not found");
  }

  //remove loading spinner
  spinner.remove();
};

getWeather();
