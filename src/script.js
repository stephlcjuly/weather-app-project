let now = new Date();
function formatDate() {
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = now.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "Decemeber",
  ];
  let month = months[now.getMonth()];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let date = now.getDate();
  return `${day} ${month} ${date}, ${hours}:${minutes}`;
}

let currentDate = document.querySelector(".current-date");
currentDate.innerHTML = formatDate(now);

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
   <div class="col">
     <div class="card" style="width: 10rem">
       <div class="card-body">
         <h5 class="card-title" id="forecast-day">${formatDay(
           forecastDay.dt
         )}</h5>
         <p class="card-text" id="forecast-image"><img src="http://openweathermap.org/img/wn/${
           forecastDay.weather[0].icon
         }@2x.png"</p>
         <div class="temp" id="forecast-temp-max">HI: ${Math.round(
           forecastDay.temp.max
         )}° F</div>
         <div class="temp" id="forecast-temp-min">LO: ${Math.round(
           forecastDay.temp.min
         )}° F</div>
       </div>
     </div>
   </div>
`;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function searchCity(cityInput) {
  let apiKey = `65dceb3147c1a28e1221b1b5336180c3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = `65dceb3147c1a28e1221b1b5336180c3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function displayWeather(response) {
  fahrenheitTemperature = response.data.main.temp;

  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    fahrenheitTemperature
  );
  document.querySelector(".current-weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector(".icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  getForecast(response.data.coord);
}

function submitButton(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input").value;
  searchCity(cityInput);
}
let cityForm = document.querySelector(".city-search");
cityForm.addEventListener("submit", submitButton);

let searchButton = document.querySelector("#search-button");
searchButton.addEventListener("click", submitButton);

function showPosition(position) {
  let apiKey = `65dceb3147c1a28e1221b1b5336180c3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function getCurrentPosition() {
  navigator.geolocation.getCurrentPosition(showPosition);
}

let locationButton = document.querySelector("#current-location-button");
locationButton.addEventListener("click", getCurrentPosition);

function displayCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  let celsiusTemperature = ((fahrenheitTemperature - 32) * 5) / 9;
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

function displayFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let fahrenheitTemperature = null;

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsius);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheit);
