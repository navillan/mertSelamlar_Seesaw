((self)=>{
  const classes = {
    mainFrame : "main-frame",
    infoBar : "info-bar",
    infoBox : "info-box",
    leftWeightInfo : "weight-left",
    rightWeightInfo : "weight-right",
    nextWeightInfo : "weight-next",
    plankAngleInfo : "plank-angle-info",
    leftWeight : ".weight-left > span",
    rightWeight : ".weight-right > span",
    nextWeight : ".weight-next > span",
    plankAngleValueInfo : ".plank-angle-info > span",
    gameFrame : "game-frame",
    ball : "ball",
    location : "location-value",
    indicator : "indicator",
    ballFrame : "ball-frame",
    plank : "plank",
    stabilizer : "plank-stabilizer",
    resetButton : "button-reset",
    customStyle : "custom-private-style"
  };

    self.onreset = () => {
      document.querySelectorAll(`.${classes.customStyle}`).forEach(el => el.remove());
    }

    self.buildCss = () => {

      const customPrivStyle = `
      <style class="${classes.customStyle}">
        ${classes.mainFrame} {
          height: 650px;
          width: 700px;
          background-color: white;
          border-radius: 10px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
          margin: auto;
          font-family: 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu', sans-serif;
        }
        ${classes.infoBar} {
          height: 100px;
          display: flex;
          align-items: center;
          justify-content: space-around;
          margin-top: 5px;
          margin-bottom: 20px;
          border-radius: 10px;
        }
        ${classes.infoBox} {
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
        ${classes.leftWeightInfo}, 
        ${classes.rightWeightInfo}, 
        ${classes.nextWeightInfo}, 
        ${classes.plankAngleInfo} {
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
        ${classes.gameFrame} {
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
        ${classes.ballFrame} {
          width: 400px;
          height: 250px;
          position: relative;
          bottom: 90px;
          cursor: none;
        }

        ${classes.plank} {
          height: 20px;
          width: 400px;
          background-color: rgb(19, 5, 51);
          position: absolute;
          bottom: 160px;
          left: 50%;
          transform: translateX(-50%);
          transition: all 0.3s ease;
          border-radius: 10px;
        }
        ${classes.stabilizer} {
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
        ${classes.ball} {
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          color: white;
          font-weight: 600;
          box-shadow: 0 2px 6px rgba(0,0,0,0.2);
          user-select: none;
        }
        ${classes.indicator} {
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translateX(-50%);
          width: 2px;
          height: 120px;
          background-color: rgba(124, 104, 238, 0.336);
        }
        ${classes.location} {
          width: 75px;
          height: 40px;
          position: absolute;
          top: 50%;
          margin-left: 5px;
        }
        ${classes.resetButton} {
          height: 45px;
          width: 110px;
          color: white;
          background-color: darkslateblue;
          border: 2px solid white;
          border-radius: 10px;
          cursor: pointer;
          font-size: 14px;
          font-weight: bold;
          position: fixed;
          bottom: 24%;
          transform: translateX(-50%);
          left: 50%;
        }
      </style>
      `
      $("head").append(customPrivStyle)
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
                <div class="${ballFrame}"
                    onmouseenter="createBall(event)"
                    onmouseleave="deleteBall(event)"
                    onclick="dropBall(event)"
                ></div>
                <div class="${plank}"></div>
                <span class="${stabilizer}"></span>
            </div>
            <button class="${resetButton}" onclick="resetGame()">Clear Board</button>
        </div>
      `;
      document.body.insertAdjacentHTML('beforeend', seesawHtml);
    }
})(window);