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

// Display forecast:

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];

  return day;
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#weather-forecast");

  let forecastHTML = "";

  forecast.forEach(function (forecastDays, index) {
    if (index > 0 && index < 7) {
      forecastHTML =
        forecastHTML +
        `
          <div class="col-2">
            <div class="weather-forecast-date">
              <div class="forecast-day">${formatDay(forecastDays.dt)}</div>
              <img
                src="http://openweathermap.org/img/wn/${
                  forecastDays.weather[0].icon
                }@2x.png"
                alt=""
                id="icon-today"
                width="42px"
              />
              <div class="weather-forecast-temperatures">
                <span class="weather-forecast-max"> ${Math.round(
                  forecastDays.temp.max
                )} °C</span>
                <span class="weather-forecast-min"> | ${Math.round(
                  forecastDays.temp.min
                )} °C</span>
              </div>
              <ul class="climate-values-small">
                <li id="forecast-description" class="description">${
                  forecastDays.weather[0].description
                }</li>
                <li id="forecast-humidity">Humidity: ${
                  forecastDays.humidity
                } %</li>
                <li id="forecast-wind">Wind: ${Math.round(
                  forecastDays.wind_speed
                )} km/h</li>
              </ul>
            </div>
          </div>
        `;
    }
  });

  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "99b8f9330a1bfba3a85e523fd3c2e528";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&exclude=minutely&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

// Change city:

function getTemperature(response) {
  celsiusTemperature = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#temp-today");
  let windElement = document.querySelector("#wind");
  let humidityElement = document.querySelector("#humidity");
  let descriptionElement = document.querySelector("#description");
  let iconElement = document.querySelector("#icon-today");
  let h1 = document.querySelector("#current-city");

  tempToday.innerHTML = `${celsiusTemperature}`;
  windElement.innerHTML = `Wind: ${Math.round(response.data.wind.speed)} km/h`;
  humidityElement.innerHTML = `Humidity: ${response.data.main.humidity} %`;
  descriptionElement.innerHTML = `${response.data.weather[0].description}`;
  h1.innerHTML = `${response.data.name}`;

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);

  getForecast(response.data.coord);
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
