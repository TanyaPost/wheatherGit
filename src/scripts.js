// Show Date
let now = new Date();
let date = document.querySelector("#date");
let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

function funcMinutes(timeMinutes) {
  if (timeMinutes< 10) {
    return(`0${timeMinutes}`)
  } else {
    return(timeMinutes)
  }
}
let minutes = funcMinutes(now.getMinutes());
date.innerHTML = `${days[now.getDay()]}, ${now.getHours()}:${minutes}`;





//Show Temperature
function displayWeather(response) {
  let tempDay = document.querySelector("#tempValueDay");
  let tempNight = document.querySelector("#tempValueNight");
  let cityDiv = document.querySelector("#city");
  let temperatureMax = Math.round(response.data.main.temp_max);
  let temperatureMin = Math.round(response.data.main.temp_min);
  let city = response.data.name;
  tempDay.innerHTML = `${temperatureMax}`;
  tempNight.innerHTML = `${temperatureMin}`;
  cityDiv.innerHTML = `${city}`;
}

function showCityTemp(event) {
  event.preventDefault();
  //Show City
  let input = document.querySelector("#searchInput");
  let cityDiv = document.querySelector("#city");
  cityDiv.innerHTML = `${input.value}`;

  //Api 
  let key = "ba862160e4c5ea70588aecec23aae589";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${input.value}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);

}

function getWeather(position) {
  let key = "ba862160e4c5ea70588aecec23aae589";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=metric`;
  axios.get(url).then(displayWeather);
}

function showCurrentTemp(event) {
  event.preventDefault();
  //GetCurrentPosition
  navigator.geolocation.getCurrentPosition(getWeather);
}

let searchForm = document.querySelector("#searchForm");
searchForm.addEventListener("submit", showCityTemp);

let current = document.querySelector("#current");
current.addEventListener("click", showCurrentTemp);


    
