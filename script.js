const bird = document.getElementById("bird");
const container = document.getElementById("gameContainer");
const scoreText = document.getElementById("score");
const gameOverText = document.getElementById("gameOverText");
const restartBtn = document.getElementById("restartBtn");

let birdTop = 200;
let gravity = 2;
let velocity = 0;
let isGameOver = false;
let timer = 600; // 10 minutes

function jump() {
  if (isGameOver) return;
  velocity = -10;
}

document.addEventListener("keydown", jump);
document.addEventListener("click", jump);

function updateBird() {
  velocity += gravity;
  birdTop += velocity;
  bird.style.top = birdTop + "px";

  if (birdTop < 0 || birdTop > 560) {
    endGame("Bird hit the ground!");
  }
}

function createPipe() {
  if (isGameOver) return;

  const gap = 150;
  const pipeTopHeight = Math.floor(Math.random() * 250) + 50;
  const pipeBottomHeight = 600 - pipeTopHeight - gap;

  const topPipe = document.createElement("div");
  topPipe.classList.add("pipe");
  topPipe.style.height = pipeTopHeight + "px";
  topPipe.style.top = 0;
  topPipe.style.left = "400px";

  const bottomPipe = document.createElement("div");
  bottomPipe.classList.add("pipe");
  bottomPipe.style.height = pipeBottomHeight + "px";
  bottomPipe.style.bottom = "0";
  bottomPipe.style.left = "400px";

  container.appendChild(topPipe);
  container.appendChild(bottomPipe);

  let pipeLeft = 400;
  const moveInterval = setInterval(() => {
    if (isGameOver) {
      clearInterval(moveInterval);
      topPipe.remove();
      bottomPipe.remove();
      return;
    }

    pipeLeft -= 2;
    topPipe.style.left = pipeLeft + "px";
    bottomPipe.style.left = pipeLeft + "px";

    // Collision Detection
    if (
      pipeLeft < 90 && pipeLeft > 10 &&
      (birdTop < pipeTopHeight || birdTop > pipeTopHeight + gap)
    ) {
      endGame("Bird hit the pipe!");
    }

    if (pipeLeft < -60) {
      clearInterval(moveInterval);
      topPipe.remove();
      bottomPipe.remove();
    }
  }, 20);
}

function endGame(message) {
  isGameOver = true;
  gameOverText.innerText = "Game Over! " + message;
  restartBtn.style.display = "inline-block";
  clearInterval(timerInterval);
}

restartBtn.addEventListener("click", () => {
  window.location.reload();
});

setInterval(updateBird, 20);
setInterval(createPipe, 1500);

const timerInterval = setInterval(() => {
  if (timer <= 0) {
    endGame("Time's up!");
    return;
  }
  timer--;
  scoreText.innerText = `Time Left: ${timer}s`;
}, 1000);
