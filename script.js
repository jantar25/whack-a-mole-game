let timer = document.querySelector(".timer");
let score = document.querySelector(".score");
const button = document.querySelector(".start-game");
const holes = document.querySelectorAll(".hole");
const moles = document.querySelectorAll(".mole");
let timeOver = false;
let lastIndex;
let counterDownTimer;
let peepTimer;
let gameTimer;

const countDown = () => {
  counterDownTimer = setInterval(() => {
    if (timer.textContent == 0) {
      clearInterval(counterDownTimer);
      return;
    }
    timer.textContent -= 1;
  }, 1000);
};

const peep = () => {
  const holeLocation = randomPeep();
  const peeptime = randomPeepTimer();
  holes[holeLocation].classList.add("up");
  setTimeout(() => {
    peepTimer = holes[holeLocation].classList.remove("up");
    if (!timeOver) peep();
  }, peeptime);
};

const randomPeep = () => {
  let index = Math.floor(Math.random() * holes.length);
  if (lastIndex == index) {
    return randomPeep();
  }
  lastIndex = index;
  return index;
};

const randomPeepTimer = (max = 1000, min = 100) => {
  const popUpTime = Math.floor(Math.random() * (max - min) + min);
  return popUpTime;
};

const startGame = () => {
  holes.forEach((hole) => hole.classList.remove("up"));
  score.textContent = 0;
  timer.textContent = 10;
  timeOver = false;
  clearInterval(counterDownTimer);
  clearInterval(peepTimer);
  clearInterval(gameTimer);

  peep();
  countDown();
  gameTimer = setTimeout(() => (timeOver = true), 10000);
};

const playPop = () => {
  const audio = new Audio("pop.mp3");
  audio.currentTime = 0;
  audio.play();
};

moles.forEach((mole) =>
  mole.addEventListener("click", (e) => {
    if (!e.isTrusted) return;
    const { parentNode } = mole;
    score.textContent++;
    playPop();
    parentNode.classList.remove("up");
  })
);

button.addEventListener("click", startGame);
