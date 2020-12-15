const form = document.querySelector(".js-form"),
      input = form.querySelector("input"),
      greetings = document.querySelector(".js-greetings");

const USER_LOCAL = "currentUser",
      DISPLAY_BLOCK = "showing";  // display: block;

function saveName(text) {
  localStorage.setItem(USER_LOCAL, text)
}

function handleSubmit(e) {
  e.preventDefault();
  const currentValue = input.value;
  showGreeting(currentValue);
  saveName(currentValue);
}

function askName() {
  form.classList.add(DISPLAY_BLOCK);
  form.addEventListener("submit", handleSubmit);
}

function showGreeting(text) {
  form.classList.remove(DISPLAY_BLOCK); 
  greetings.classList.add(DISPLAY_BLOCK);
  greetings.innerText = `Hello, ${text}`;
}

function loadName() {
  const currentUser = localStorage.getItem(USER_LOCAL);
  if(currentUser === null){
    askName();
  } else {
    showGreeting(currentUser);
  }
}

function init() {
  loadName();
}

init();