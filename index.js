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
  ballFrame.append(ball)
  
  ball.textContent = currentBallWeigth + "kg";
  return ball
};

function deleteBall(){
  const allBalls = ballFrame.querySelectorAll(".ball");
  allBalls.forEach(ball => ball.remove());
};