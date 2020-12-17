const API_KEY = "56448ac28fd421d365dfb80175a496aa";
const COORDS = "coords";

function getWeather(lat, lng) {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  ).then(function(response) {
    return response.json();
  })
}

function saveCoords(value) {
  localStorage.setItem(COORDS, JSON.stringify(value));
}

function handleError() {
  console.log('error!');
}

function handleSucess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const positionObj = {
    latitude,
    longitude
  };
  saveCoords(positionObj);
  getWeather(latitude, longitude);
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(handleSucess,handleError);
}

function loadCoords(){
  const loadedCoord = localStorage.getItem(COORDS);
  if(loadedCoord === null) {
    askCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoord);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
}

function init() {
  loadCoords();
}

init();