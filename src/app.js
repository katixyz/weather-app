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
let apiKey = "99b8f9330a1bfba3a85e523fd3c2e528";

function getTemperature(response) {
  let temperature = Math.round(response.data.main.temp);
  let tempToday = document.querySelector("#temp-today");
  tempToday.innerHTML = `${temperature} °C`;
}

function changeCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city");
  let heading = document.querySelector("h1");
  heading.innerHTML = `${city.value}`;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&units=metric&appid=${apiKey}`;
  axios.get(apiUrl).then(getTemperature);
}

let cityForm = document.querySelector("#search-city");
cityForm.addEventListener("submit", changeCity);
