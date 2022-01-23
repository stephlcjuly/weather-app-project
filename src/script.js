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

function searchCity(cityInput) {
  let apiKey = `65dceb3147c1a28e1221b1b5336180c3`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityInput}&appid=${apiKey}&units=imperial`;
  axios.get(apiUrl).then(displayWeather);
}

function displayWeather(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector(".current-weather-description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#wind-speed").innerHTML = Math.round(
    response.data.wind.speed
  );
  let iconElement = document.querySelector(".icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/10d@2x.png`
  );
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
