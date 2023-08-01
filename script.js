const endpoint = "http://api.weatherapi.com/v1";
const apiKey = "6c5d19286ef047d387d103759230108";
let city = "London";

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
const windDirectionText = document.querySelector("#windDirection");
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

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  city = e.target[0].value;

  getWeather();
});

celciusCheckbox.addEventListener("change", () => {
  isCelcius = !isCelcius;
  if (isCelcius) {
    celciusCheckboxLabel.innerHTML = "°C";
  } else {
    celciusCheckboxLabel.innerHTML = "°F";
  }
  getWeather();
});

windCheckbox.addEventListener("change", () => {
  isWindKph = !isWindKph;
  if (isWindKph) {
    windCheckboxLabel.innerHTML = "km/h";
  } else {
    windCheckboxLabel.innerHTML = "mph";
  }
  getWeather();
});

const getWeather = async () => {
  // create loading spinner
  const spinner = document.createElement("div");
  spinner.classList.add("spinner");
  document.body.appendChild(spinner);

  try {
    const response = await fetch(
      `${endpoint}/current.json?key=${apiKey}&q=${city}`
    );
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
    windDirectionText.innerHTML = await data.current.wind_dir;

    if (isWindKph) {
      windSpeedText.innerHTML = (await data.current.wind_kph) + " km/h";
    } else {
      windSpeedText.innerHTML = (await data.current.wind_mph) + " mph";
    }

    // set body background color according to day/night
    if (await data.current.is_day) {
      document.body.style.backgroundColor = "#e6f7ff";
    } else {
      document.body.style.backgroundColor = "#1a1a1a";
    }
  } catch (e) {
    console.log(e);
    alert("City not found");
  }

  //remove loading spinner
  spinner.remove();
};

getWeather();
