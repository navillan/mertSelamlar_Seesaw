const leftWeigth = document.querySelector(".weigth-left");
const rightWeigth = document.querySelector(".weigth-right");
const nextWeigth = document.querySelector(".weigth-next");
const plankAngleInfo = document.querySelector(".plank-angle-info");
const ballFrame = document.querySelector(".ball-frame");
const plank = document.querySelector(".plank");
const resetButton = document.querySelector(".button-reset")

let tiltAngle = 0;
let leftWeigthValue = 0;
let rightWeigthValue = 0;

let nextBallWeigth = Math.round(Math.random() * 9) + 1;

let ball = null;

ballFrame.addEventListener("pointermove", (event) => {
  const box = ballFrame.getBoundingClientRect();
  if(
    event.clientX >= box.left &&
    event.clientX <= box.right &&
    event.clientY >= box.top &&
    event.clientY <= box.bottom
  ) {
    if(ball) {
      ball.style.left = (event.clientX - box.left) + "px";
      ball.style.top = (event.clientY - box.top) + "px";
    }
  }
});

function createBall(event){
  const currentBallWeigth = nextBallWeigth;

  ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.position = "absolute";
  ball.style.left = (event.pageX - window.scrollX - 150) + "px";
  ball.style.top = (event.pageY - window.scrollY - 150) + "px";
  ball.style.width = (nextBallWeigth * 8) + "px";
  ball.style.height = (nextBallWeigth * 8) + "px";
  ball.style.fontSize = (currentBallWeigth * 3) + "px";
  ball.textContent = currentBallWeigth + "kg";
  ballFrame.append(ball);
  
  return ball
};

function deleteBall(){
  const allBalls = ballFrame.querySelectorAll(".ball");
  allBalls.forEach(ball => ball.remove());
};

function dropBall(event){
  const box = ballFrame.getBoundingClientRect();
  const currentBallWeigth = nextBallWeigth;

  const ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.position = "absolute";
  ball.style.left = (event.pageX - box.left) + "px";
  ball.style.top = (event.pageY - box.top) + "px";
  ball.style.width = (nextBallWeigth * 8) + "px";
  ball.style.height = (nextBallWeigth * 8) + "px";
  ball.style.fontSize = (currentBallWeigth * 3) + "px";
  ball.textContent = currentBallWeigth + "kg";
  plank.append(ball);

  nextBallWeigth = Math.round(Math.random() * 9) + 1;
  nextWeigth.textContent = "Next: " + nextBallWeigth + "kg";
  ballFrame.querySelectorAll('.ball').forEach(ball => ball.remove());
  createBall(event);
};

function resetGame() {
  tiltAngle = 0;
  leftWeigthValue = 0;
  rightWeigthValue = 0;
  nextBallWeigth = Math.round(Math.random() * 9) + 1;
  const allBalls = plank.querySelectorAll(".ball");
  allBalls.forEach(ball => ball.remove());
}