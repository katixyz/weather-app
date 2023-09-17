src = "https://kit.fontawesome.com/c6d7aab294.js";
crossorigin = "anonymous";

// Create current day & time:
let now = new Date();

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

let hour = now.getHours();
let minutes = now.getMinutes();

let date = document.querySelector("#date");

if (minutes > 9) {
  date.innerHTML = `${day} ${hour}:${minutes}`;
} else {
  date.innerHTML = `${day} ${hour}:0${minutes}`;
}

// Change city:

function getTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#temp-today");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon-today");
  let h1 = document.querySelector("h1");

  tempToday.innerHTML = `${celsiusTemperature}`;
  windElement.innerHTML = `Wind: ${response.data.wind.speed} km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  h1.innerHTML = `${response.data.name}`;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
}

function search(city) {
  let apiKey = "99b8f9330a1bfba3a85e523fd3c2e528";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemperature);
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  search(city.value);
}

function displayFahrenheitTemperature(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp-today");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function displayCelsiusTemperature(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector("#temp-today");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null;

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", changeCity);

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click", displayFahrenheitTemperature);

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", displayCelsiusTemperature);

search("Berlin");
