const body = document.querySelector("body");

const IMG_NUM = 5;

function paintImage(imgNum) {
  const img = new Image();
  img.src = `images/${imgNum + 1}.jpg`;
  img.classList.add("bgImage");
  body.prepend(img)
}

function getRandom() {
  const number = Math.floor(Math.random() * IMG_NUM);
  return number
}

function init() {
  const randomNum = getRandom();
  paintImage(randomNum);
}

init();