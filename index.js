const leftWeight = document.querySelector(".weight-left > span");
const rightWeight = document.querySelector(".weight-right > span");
const nextWeight = document.querySelector(".weight-next > span");
const plankAngleInfo = document.querySelector(".plank-angle-info > span");
const ballFrame = document.querySelector(".ball-frame");
const plank = document.querySelector(".plank");
const resetButton = document.querySelector(".button-reset")

const colors = {
  "1":"red",
  "2":"green",
  "3":"yellow",
  "4":"blue",
  "5":"orange",
  "6":"purple",
  "7":"brown",
  "8":"olive",
  "9":"violet",
  "10":"black"
}

let leftWeightValue = localStorage.getItem('leftWeightValue') ? parseFloat(localStorage.getItem('leftWeightValue')) : 0;
let rightWeightValue = localStorage.getItem('rightWeightValue') ? parseFloat(localStorage.getItem('rightWeightValue')) : 0;
let leftTorqueValue = localStorage.getItem('leftTorqueValue') ? parseFloat(localStorage.getItem('leftTorqueValue')) : 0;
let rightTorqueValue = localStorage.getItem('rightTorqueValue') ? parseFloat(localStorage.getItem('rightTorqueValue')) : 0;
let tiltAngle = localStorage.getItem('plankTiltAngle') ? parseFloat(localStorage.getItem('plankTiltAngle')) : 0;

let nextBallWeight = Math.round(Math.random() * 9) + 1;

let ball = null;

if (tiltAngle !== 0) {
  leftWeight.textContent = `${leftWeightValue} kg`;
  rightWeight.textContent = `${rightWeightValue} kg`;
  nextWeight.textContent = `${nextBallWeight} kg`;
  tiltPlank();
}

ballFrame.addEventListener("pointermove", (event) => {
  const box = ballFrame.getBoundingClientRect();
  if(
    event.clientX >= box.left &&
    event.clientX <= box.right &&
    event.clientY >= box.top &&
    event.clientY <= box.bottom
  ) {
    if(ball) {
      const ballSize = nextBallWeight * 7.5;
      ball.style.left = (event.clientX - box.left - ballSize / 2) + "px";
      ball.style.top = (event.clientY - box.top - ballSize / 2) + "px";
      document.querySelector(".location-value").textContent = `x: ${(event.clientX - box.left).toFixed()}px`
    }
  }
});

function createBall(event){
  const currentBallWeight = nextBallWeight;
  const box = ballFrame.getBoundingClientRect();
  const ballSize = 15 + (nextBallWeight * 7.5);

  ball = document.createElement('div');
  ball.classList.add('ball');
  ball.style.position = "absolute";
  ball.style.left = (event.clientX - box.left - ballSize / 2) + "px";
  ball.style.top = (event.clientY - box.top - ballSize / 2) + "px";
  ball.style.width = ballSize + "px";
  ball.style.height = ballSize + "px";
  ball.style.fontSize = (8 + (currentBallWeight * 3)) + "px";
  ball.textContent = currentBallWeight + "kg";
  ball.style.backgroundColor = colors[Math.floor(currentBallWeight)];
  const location = document.createElement('div')
  location.classList.add('location-value')
  const indicator = document.createElement('span');
  indicator.classList.add('indicator');
  indicator.append(location)
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
  const currentBallWeight = nextBallWeight;
  const ballSize = 15 + (nextBallWeight * 7.5);
  let realX = event.clientX - plankBox.left;
  let torque = (realX - (plankBox.width / 2)) * currentBallWeight;
  if(torque < 0){
    leftTorqueValue += Math.abs(torque / 5);
    leftWeightValue += currentBallWeight;
    localStorage.setItem('leftTorqueValue', leftTorqueValue);
    localStorage.setItem('leftWeightValue', leftWeightValue);
  } else {
    rightTorqueValue += Math.abs(torque / 5);
    rightWeightValue += currentBallWeight;
    localStorage.setItem('rightTorqueValue', rightTorqueValue);
    localStorage.setItem('rightWeightValue', rightWeightValue);
  }

  const droppedBall = document.createElement('div');
  droppedBall.classList.add('ball');
  droppedBall.style.position = "absolute";
  droppedBall.style.left = (event.clientX - plankBox.left - ballSize / 2) + "px";
  droppedBall.style.top = (event.clientY - plankBox.top - ballSize / 2) + "px";
  droppedBall.style.width = ballSize + "px";
  droppedBall.style.height = ballSize + "px";
  droppedBall.style.transition = "top 0.3s ease-in";
  droppedBall.style.fontSize = (8 + (currentBallWeight * 3)) + "px";
  droppedBall.textContent = currentBallWeight + "kg";
  droppedBall.style.backgroundColor = colors[Math.floor(currentBallWeight)];
  plank.append(droppedBall);
  nextBallWeight = Math.round(Math.random() * 9) + 1;
  nextWeight.textContent = `${nextBallWeight} kg`;

  setTimeout(()=>{
    droppedBall.style.top = (-ballSize) + "px";
  }, 50);

  setTimeout(()=>{
    tiltAngle = Math.max(-30, Math.min(30, (rightTorqueValue - leftTorqueValue) / 10))
    leftWeight.textContent = `${leftWeightValue} kg`;
    rightWeight.textContent = `${rightWeightValue} kg`;
    
  }, 300);

  setTimeout(()=>{
    tiltPlank();
  }, 350);
  
  ballFrame.querySelectorAll('.ball').forEach(ball => ball.remove());
};

function tiltPlank() {
  
  if(tiltAngle >= 30) {
    plank.style.transform = "translateX(-50%) rotate(30deg)";
    plankAngleInfo.textContent = "30°";

  } else if(tiltAngle <= -30) {
    plank.style.transform = "translateX(-50%) rotate(-30deg)";
    plankAngleInfo.textContent = "-30°";

  } else {
    plank.style.transform = `translateX(-50%) rotate(${tiltAngle}deg)`;
    plankAngleInfo.textContent = `${tiltAngle.toFixed(1)}°`;
  }
  localStorage.setItem('plankTiltAngle', tiltAngle.toFixed(1));
};

function resetGame() {
  leftWeightValue = 0;
  rightWeightValue = 0;
  leftTorqueValue = 0;
  rightTorqueValue = 0;
  tiltAngle = 0;
  plankAngleInfo.textContent = `${tiltAngle}°`
  plank.style.transform = "translateX(-50%) rotate(0deg)";
  nextBallWeight = Math.round(Math.random() * 9) + 1;
  nextWeight.textContent = `${nextBallWeight} kg`;
  leftWeight.textContent = `${leftWeightValue} kg`;
  rightWeight.textContent = `${rightWeightValue} kg`;
  const allBalls = plank.querySelectorAll(".ball");
  allBalls.forEach(ball => ball.remove());
}