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
      const ballSize = nextBallWeigth * 7.5;
      ball.style.left = (event.clientX - box.left - ballSize / 2) + "px";
      ball.style.top = (event.clientY - box.top - ballSize / 2) + "px";
    }
  }
});

function createBall(event){
  const currentBallWeigth = nextBallWeigth;
  const box = ballFrame.getBoundingClientRect();
  const ballSize = nextBallWeigth * 7.5;

  ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.position = "absolute";
  ball.style.left = (event.clientX - box.left - ballSize / 2) + "px";
  ball.style.top = (event.clientY - box.top - ballSize / 2) + "px";
  ball.style.width = ballSize + "px";
  ball.style.height = ballSize + "px";
  ball.style.fontSize = (currentBallWeigth * 3) + "px";
  ball.textContent = currentBallWeigth + "kg";

  const indicator = document.createElement('span');
  indicator.classList.add('indicator');
  ball.append(indicator);
  ballFrame.append(ball);
  
  return ball
};

function deleteBall(){
  const allBalls = ballFrame.querySelectorAll(".ball");
  allBalls.forEach(ball => ball.remove());
};

function dropBall(event){
  const plankBox = plank.getBoundingClientRect();
  const currentBallWeigth = nextBallWeigth;
  const ballSize = nextBallWeigth * 7.5;

  const droppedBall = document.createElement('div');
  droppedBall.classList.add('ball');
  droppedBall.style.position = "absolute";
  droppedBall.style.left = (event.clientX - plankBox.left - ballSize / 2) + "px";
  droppedBall.style.top = (event.clientY - plankBox.top - ballSize / 2) + "px";
  droppedBall.style.width = ballSize + "px";
  droppedBall.style.height = ballSize + "px";
  droppedBall.style.fontSize = (currentBallWeigth * 3) + "px";
  droppedBall.textContent = currentBallWeigth + "kg";
  plank.append(droppedBall);
  nextBallWeigth = Math.round(Math.random() * 9) + 1;
  nextWeigth.textContent = "Next: " + nextBallWeigth + "kg";

  setTimeout(()=>{
    droppedBall.style.transition = "top 0.6s ease-in";
    droppedBall.style.top = (-ballSize) + "px";
  }, 10);

  setTimeout(()=>{
    if(event.clientX < plankBox.left + (plankBox.width / 2)) {
      leftWeigthValue = leftWeigthValue + currentBallWeigth
      tiltAngle = tiltAngle - leftWeigthValue
    } else {
      rightWeigthValue = rightWeigthValue + currentBallWeigth
      tiltAngle = tiltAngle + rightWeigthValue
    };
    leftWeigth.textContent = `Left Weigth: ${leftWeigthValue}kg`;
    rightWeigth.textContent = `Right Weigth: ${rightWeigthValue}kg`;
    
  }, 300);

  setTimeout(()=>{
    tiltPlank();
  }, 700);

  ballFrame.querySelectorAll('.ball').forEach(ball => ball.remove());
};

function tiltPlank() {
  if (tiltAngle >= 30) {
    plank.style.transform = "rotate(30deg)";
    plank.style.left = "10%";
    plankAngleInfo.textContent = "30deg";

  } else if (tiltAngle <= -30) {
    plank.style.transform = "rotate(-30deg)";
    plank.style.left = "10%";
    plankAngleInfo.textContent = "-30deg";

  } else {
    plank.style.transform = `rotate(${tiltAngle}deg)`;
    plank.style.left = "10%";
    plankAngleInfo.textContent =
      `Tilt Angle: ${tiltAngle}deg`;
  }
};

function resetGame() {
  leftWeigthValue = 0;
  rightWeigthValue = 0;
  tiltAngle = 0;
  plankAngleInfo.textContent = `Tilt Angle: ${tiltAngle}deg`
  plank.style.transform = "rotate(0deg)";
  nextBallWeigth = Math.round(Math.random() * 9) + 1;
  nextWeigth.textContent = "Next: " + nextBallWeigth + "kg";
  leftWeigth.textContent = `Left Weigth: ${leftWeigthValue}kg`;
  rightWeigth.textContent = `Right Weigth: ${rightWeigthValue}kg`;
  const allBalls = plank.querySelectorAll(".ball");
  allBalls.forEach(ball => ball.remove());
}