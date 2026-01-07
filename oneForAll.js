((self)=>{
  const classes = {
    mainFrame : "main-priv-frame",
    infoBar : "info-bar",
    infoBox : "info-box",
    leftWeightInfo : "weight-left",
    rightWeightInfo : "weight-right",
    nextWeightInfo : "weight-next",
    plankAngleInfo : "plank-angle-info",
    leftWeight : ".weight-left > span",
    leftTorqueInfo : ".torque-info-left",
    rightWeight : ".weight-right > span",
    rightTorqueInfo : ".torque-info-right",
    nextWeight : ".weight-next > span",
    plankAngleValueInfo : ".plank-angle-info > span",
    gameFrame : "game-priv-frame",
    ball : "ball",
    location : "location-value",
    indicator : "indicator",
    ballFrame : "ball-frame",
    plank : "plank",
    stabilizer : "plank-stabilizer",
    resetButton : "custom-priv-button-reset",
    customStyle : "custom-private-style"
  };

    self.onreset = () => {
      document.querySelectorAll(`.${classes.customStyle}`).forEach(el => el.remove());
    }

    self.buildCss = () => {

      const customPrivStyle = `
      <style class="${classes.customStyle}">
        .${classes.mainFrame} {
          height: 650px;
          width: 700px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          margin: auto;
          font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
        }
        .${classes.infoBar} {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-top: 5px;
          margin-bottom: 20px;
          border-radius: 10px;
        }
        .${classes.infoBox} {
          display: flex;
          height: 90px;
          width: 150px;
          align-items: center;
          justify-content: center;
          background: #f8f9fa;
          border-radius: 6px;
          min-width: 120px;
          border: 1px solid #e9ecef;
        }
        .${classes.leftWeightInfo}, 
        .${classes.rightWeightInfo}, 
        .${classes.nextWeightInfo}, 
        .${classes.plankAngleInfo} {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
        p {
          color: darkslateblue;
          margin: 4px 0;
        }
        span {
          color: mediumslateblue;
        }
        p, span {
          font-size: 18px;
          font-weight: bold;
        }
        .${classes.gameFrame} {
          height: 500px;
          width: 500px;
          background-color: rgb(235, 235, 235);
          position: relative;
          overflow: hidden;
          transition: all 1s ease;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin: auto;
          border-radius: 10px;
        }
        .${classes.ballFrame} {
          width: 400px;
          height: 250px;
          position: relative;
          bottom: 50px;
          cursor: none;
        }

        .${classes.plank} {
          height: 20px;
          width: 400px;
          background-color: rgb(19, 5, 51);
          position: absolute;
          bottom: 160px;
          left: 50%;
          transform: translateX(-50%);
          transition: all 0.5s ease;
          border-radius: 10px;
        }
        .${classes.stabilizer} {
          height: 0;
          width: 0;
          border-left: 15px solid transparent;
          border-right: 15px solid transparent;
          border-bottom: 15px solid black;
          position: absolute;
          bottom: 145px;
          left: 50%;
          transform: translateX(-50%);
          border-radius: 5px;
        }
        .${classes.ball} {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: white;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          user-select: none;
        }
        .${classes.indicator} {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 120px;
          background-color: rgba(124, 104, 238, 0.336);
        }
        .${classes.location} {
          width: 75px;
          height: 40px;
          position: absolute;
          top: 50%;
          margin-left: 5px;
        }
        .${classes.resetButton} {
          height: 45px;
          width: 120px;
          color: white;
          background-color: darkslateblue;
          border: 2px solid white;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          position: absolute;
          bottom: 20px;
          left: 50%;
          transform: translateX(-50%);
        }
        .${classes.resetButton}:hover {
          background-color: slateblue;
        }
      </style>
      `
      document.querySelector("head").insertAdjacentHTML('beforeend', customPrivStyle);
    }

    self.buildSeesawHtml = () => {
      const {
        mainFrame,
        infoBar,
        infoBox,
        leftWeightInfo,
        rightWeightInfo,
        nextWeightInfo,
        plankAngleInfo,
        gameFrame,
        ballFrame,
        plank,
        stabilizer,
        resetButton
      } = classes;

      const seesawHtml = `
        <div class="${mainFrame}">
            <div class="${infoBar}">
                <div class="${infoBox}">
                    <div class="${leftWeightInfo}">
                        <p>Left weight: </p>
                        <span>0 kg</span>
                        <p class="torque-info-left">0.0 Nm</p>
                    </div>
                </div>
                <div class="${infoBox}">
                    <div class="${nextWeightInfo}">
                        <p>Next weight: </p>
                        <span>0 kg</span>
                    </div>
                </div>
                <div class="${infoBox}">
                    <div class="${rightWeightInfo}">
                        <p>Right weight: </p>
                        <span>0 kg</span>
                        <p class="torque-info-right">0.0 Nm</p>
                    </div>
                </div>
                <div class="${infoBox}">
                    <div class="${plankAngleInfo}">
                        <p>Tilt Angle: </p>
                        <span>0°</span>
                    </div>
                </div>
            </div>
            <div class="${gameFrame}">
                <div class="${ballFrame}"></div>
                <div class="${plank}"></div>
                <span class="${stabilizer}"></span>
                <button class="${resetButton}">Clear Board</button>
            </div>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', seesawHtml);
    }

    self.seesawEvents = () => {
      const leftWeight = document.querySelector(".weight-left > span");
      const leftTorqueInfo = document.querySelector(".torque-info-left");
      const rightWeight = document.querySelector(".weight-right > span");
      const rightTorqueInfo = document.querySelector(".torque-info-right");
      const nextWeight = document.querySelector(".weight-next > span");
      const plankAngleInfo = document.querySelector(".plank-angle-info > span");
      const ballFrame = document.querySelector(".ball-frame");
      const plank = document.querySelector(".plank");
      const resetButton = document.querySelector(".custom-priv-button-reset");

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

      let leftWeightValue = localStorage.getItem('leftWeightValue') 
        ? parseFloat(localStorage.getItem('leftWeightValue')) : 0;
      let rightWeightValue = localStorage.getItem('rightWeightValue') 
        ? parseFloat(localStorage.getItem('rightWeightValue')) : 0;
      let leftTorqueValue = localStorage.getItem('leftTorqueValue') 
        ? parseFloat(localStorage.getItem('leftTorqueValue')) : 0;
      let rightTorqueValue = localStorage.getItem('rightTorqueValue') 
        ? parseFloat(localStorage.getItem('rightTorqueValue')) : 0;
      let tiltAngle = localStorage.getItem('plankTiltAngle') 
        ? parseFloat(localStorage.getItem('plankTiltAngle')) : 0;

      let nextBallWeight = Math.round(Math.random() * 9) + 1;

      let ball = null;

      if (tiltAngle !== 0) {
        leftWeight.textContent = `${leftWeightValue} kg`;
        leftTorqueInfo.textContent = `${leftTorqueValue.toFixed(1)} Nm`;
        rightWeight.textContent = `${rightWeightValue} kg`;
        rightTorqueInfo.textContent = `${rightTorqueValue.toFixed(1)} Nm`;
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
      }

      ballFrame.addEventListener("mouseenter", createBall);
      ballFrame.addEventListener("mouseleave", deleteBall);
      ballFrame.addEventListener("click", dropBall);

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
        droppedBall.style.top = (250 - plankBox.top - ballSize / 2) + "px";
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
          leftTorqueInfo.textContent = `${leftTorqueValue.toFixed(1)} Nm`;
          rightWeight.textContent = `${rightWeightValue} kg`;
          rightTorqueInfo.textContent = `${rightTorqueValue.toFixed(1)} Nm`;
          
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
        leftTorqueInfo.textContent = `${leftTorqueValue.toFixed(1)} Nm`;
        rightWeight.textContent = `${rightWeightValue} kg`;
        rightTorqueInfo.textContent = `${rightTorqueValue.toFixed(1)} Nm`;
        const allBalls = plank.querySelectorAll(".ball");
        allBalls.forEach(ball => ball.remove());
        localStorage.removeItem('leftWeightValue');
        localStorage.removeItem('rightWeightValue');
        localStorage.removeItem('leftTorqueValue');
        localStorage.removeItem('rightTorqueValue');
        localStorage.removeItem('plankTiltAngle');
      }

      resetButton.addEventListener("click", resetGame);
    };

    self.init = () => {
      self.buildCss();
      self.buildSeesawHtml();
      self.seesawEvents();
    };

    self.init();
})(window);