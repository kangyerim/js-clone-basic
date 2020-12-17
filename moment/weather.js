const COORDS = "coords";

function saveCoords(value) {
  localStorage.setItem(COORDS, JSON.stringify(value));
}

function handleError() {
  console.log('error!')
}

function handleSucess(position) {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const positionObj = {
    latitude,
    longitude
  };
  saveCoords(positionObj);
}

function askCoords() {
  navigator.geolocation.getCurrentPosition(handleSucess,handleError);
}

function loadCoords(){
  const loadedCoord = localStorage.getItem(COORDS);
  if(loadedCoord === null) {
    askCoords();
  } else {
    //showWeather()
  }
}

function init() {
  loadCoords();
}

init();