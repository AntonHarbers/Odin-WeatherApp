# Weather App - The Odin Project

A weather app using the weather API built using HTML, CSS and Javascript for the Odin Project.

API used is weather.api

[Live Link](https://antonharbers.github.io/Weather-App-Demo/)

![Screenshot of Weather app](/images/repoImage.png)

## Folder Structure

```
    /.git           -> This git repo
    /images         -> Images used for the project, favicon, repoImage
    /scripts
        script.js   -> Contains all the JS
    /styles
        keyframes.css   -> CSS Animations here
        small.css       -> CSS for small screen sizes
        style.css       -> Main CSS file
    index.html      -> Contains all the HTML
    README.md       -> This readme file
```

## Key Concepts

### API's

This project required me to make an API call to any API that delivers Weather data. This involved learning about APIs in general, how to call them using javascipt, dealing with JSON data (more on this below) and using the concept of async/await (more on this below as well).

I chose the weather.api API provider for this project. The Javascript Implementation to access this API was documeted on their website and the code I used is in the following snippet:

JS:

```
    const endpoint = 'http://api.weatherapi.com/v1';
    const apiKey = '6c5d19286ef047d387d103759230108';
    let city = 'London';
    let forecastEndpoint = `http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${city}&days=3&aqi=no&alerts=no`;
```

Here i combine my API key with the endpoint and a default starting city (in this case London) to create the endpoint I will be using to get the needed weather data.

### Async / Await

The concept of Asyncronous Functions wasnt completely new to me, however it was still intersting diving back to the basics. For this project i used async/await in order to get the data from my above mentioned endpoint and then once that data had been delivered from the API i could do a couple of ui updates and so forth. Implementation in the following snippet:

JS:

```
    const getWeather = async () => {
        try {
            const response = await fetch(forecastEndpoint);
            const data = await response.json();
            UpdateUI(data);
        } catch (e) {
            console.log(e);
            alert('City not found');
        }
    };
```

What happens here is that whatever is in the try{} block will be run first, if an error occurs then the code will go to the catch{} block and in this case just console log the error and alert the user that the city could not be found (this can be improved upon in the future, as there is more reasons for why the try block might fail).

Inside the try block, we create a response variable that await the resulting data of our API request. We utilize the JS fetch library here.

Once we have our response, we extract the data in JSON format from our response and update the UI once that data is gotten. Pretty neat!

### JSON Data

Responses from API requests usually come directly in JSON or some form that can be converted to JSON. The syntax is pretty basic and this has made it stand the test of time. In this case once we extract our data we get a JSON object that looks like this:

JSON:

```
{
    current: {last_updated_epoch: 1702654200, last_updated: "2023-12-15 15:30", temp_c: 9, temp_f: 48.2, is_day: 1,…}
    cloud: 75
    condition: {text: "Partly cloudy", icon: "//cdn.weatherapi.com/weather/64x64/day/116.png", code: 1003}
    feelslike_c: 7.9
    feelslike_f: 46.3
    gust_kp: 12.8
    gust_mph: 8
    humidity: 76
    is_day: 1
    last_updated: "2023-12-15 15:30"
    last_updated_epoch: 1702654200
    precip_in: 0
    precip_mm: 0
    pressure_in: 30.62
    pressure_mb: 1037
    temp_c: 9
    temp_f: 48.2
    uv: 3
    vis_km: 10
    vis_miles: 6
    wind_degree: 250
    wind_dir: "WSW"
    wind_kph: 9
    wind_mph: 5.6
    forecast: {,…}
    forecastday: [{date: "2023-12-15", date_epoch: 1702598400,…}, {date: "2023-12-16", date_epoch: 1702684800,…},…]
    location: {name: "London", region: "City of London, Greater London", country: "United Kingdom", lat: 51.52,…}
    country: "United Kingdom"
    lat: 51.52
    localtime: "2023-12-15 15:37"
    localtime_epoch: 1702654676
    lon: -0.11
    name: "London"
    region: "City of London, Greater London"
    tz_id: "Europe/London"
}
```

This response contains all the informations needed to display a simple or even quite complex weather app. I used some of this data and update it in my UI whenever the use loads the page or looks for a new location.

## Final Notes

This was a fantastic project to get a simple understanding for API's, Asynchronous Functions and how it all fits together with the barebones of Javascript, html and css. It was fun trying to disect the data and find useful parts that I wanted to show my users. Overall styling and creating animations to make the whole thing look and feel good were a little tricky, especially with updating value sizes but the experience was well worth it. I now catch myself looking at an App I built for real world use from time to time and thats super cool. I can only recommend this project or something similar to get started with APIs.
