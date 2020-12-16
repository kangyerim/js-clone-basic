const body = document.querySelector("body");

const IMG_NUM = 5;


function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUM);
  return number
}

function init() {
  const randomNum = getRandom();
}

init();