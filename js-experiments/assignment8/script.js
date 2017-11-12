/*World Class*/
var World = function (element) {
  wrapper = document.createElement("div");
  element.appendChild(wrapper);
  this.newRoad = new Background(wrapper);
  this.newRoad.createBackground();
  this.newCar = new Car(this.newRoad.backgroundElement);
  this.newCar.createCar();
};

/*BackGround Class*/
var Background = function (parentElement) {
  this.backgroundY = 0;
  this.backgroundDY = 100;
  this.backgroundElement = "";
  this.mainElement = parentElement;
  var that = this;

  this.createBackground = function () {
    this.backgroundElement = document.createElement("div");
    this.backgroundElement.className = "road";
    this.mainElement.appendChild(this.backgroundElement);
  };

  this.updateBackground = function () {
    this.backgroundElement.style.backgroundPositionY = this.backgroundDY + "px";
    this.backgroundDY += 10;
  }
};

/*Car Class*/
var Car = function (parentElement) {
  this.carY = 0;
  this.carX = 0;
  this.dx = 0;
  this.carElement = "";
  this.backgroundElement = parentElement;
  var that = this;

  this.createCar = function () {
    this.carElement = document.createElement("div");
    this.carElement.className = "car";
    this.backgroundElement.appendChild(this.carElement);
  };

  this.resetCar = function () {
    this.carY = 720;
    this.carX = 150;
    this.carElement.style.top = this.carY + "px";
    this.carElement.style.left = this.carX + "px";
  };

  this.moveCar = function (direction) {
    this.carElement.style.top = this.carY + "px";
    this.carElement.style.left = this.carX + "px";
    if (direction == "Right" && this.carX <= 150) {
      this.dx = 110;
    }
    else if (direction == "Left" && this.carX >= 150) {
      this.dx = -110
    }
    else {
      this.dx = 0;
    }
    this.carX += this.dx;
    this.carElement.style.left = this.carX + "px";
  };
};


/*Obstacle Class*/
var Obstacle = function (parentElement) {
  this.obstacleX = 0;
  this.obstacleY = 0;
  this.obstacleDX = 0;
  this.obstacleDY = 0;
  this.health = 2;
  this.obstacleElement = "";
  this.backgroundElement = parentElement;
  var that = this;

  this.createObstacle = function () {
    var positions = [40, 150, 260];
    var random = Math.floor(Math.random() * positions.length);
    this.obstacleX = positions[random];

    this.obstacleElement = document.createElement("div");
    this.obstacleElement.className = "obstacle";
    this.obstacleElement.style.left = this.obstacleX + "px";
    this.backgroundElement.appendChild(this.obstacleElement);
  };

  this.moveObstacle = function () {
    this.obstacleY += 15;
    this.obstacleElement.style.top = this.obstacleY + "px";
  };

  this.removeObstacle = function () {
    this.backgroundElement.removeChild(that.obstacleElement);
  }
};

var Rocket = function (roadElement, carElement) {
  this.rocketX = 0;
  this.rocketY = 0;
  this.rocketDX = 0;
  this.rocketDY = 10;
  this.rocketStatus = true;
  this.parentElement = roadElement;
  this.carElement = carElement;
  this.rocketElement = "";
  var that = this;

  this.createRocket = function () {
    this.rocketElement = document.createElement("div");
    this.rocketElement.className = "rocket";
    this.rocketX = this.carElement.offsetLeft;
    this.rocketY = this.carElement.offsetTop + 20;
    this.rocketElement.style.left = this.rocketX + "px";
    this.rocketElement.style.top = this.rocketY + "px";
    this.parentElement.appendChild(this.rocketElement);
  };

  this.updateRocket = function () {
    this.rocketY = this.rocketY - this.rocketDY;
    this.rocketElement.style.top = this.rocketY + "px";
  };

  this.deleteRocket = function () {
    this.parentElement.removeChild(that.rocketElement);
  }
};


/*====================================================================================================================*/
/*Creating Obstacles*/
var createObstacles = function () {
  var obstacle = new Obstacle(gameScenario.newRoad.backgroundElement);
  obstacle.createObstacle();
  obstacleList.push(obstacle);
};

/*Moving Obstacles*/
var updateObstacles = function () {
  for (var i = 0; i < obstacleList.length; i++) {
    if (obstacleList[i].obstacleY < 1000) {
      obstacleList[i].moveObstacle();
    }
    else {
      obstacleList.splice(obstacleList.indexOf(obstacleList[i]), 1);
    }
  }
};


/*Collision Check*/
var collisionCheck = function () {
  var carLeft = gameScenario.newCar.carX;
  var carTop = gameScenario.newCar.carY;
  var carWidth = gameScenario.newCar.carElement.offsetWidth;
  var carHeight = gameScenario.newCar.carElement.offsetHeight;

  var obstacleLeft = 0;
  var obstacleTop = 0;
  var obstacleWidth = 0;
  var obstacleHeight = 0;

  var rocketLeft = 0;
  var rocketTop = 0;
  var rocketWidth = 0;
  var rocketHeight = 0;

  for (var i = 0; i < obstacleList.length; i++) {
    obstacleLeft = obstacleList[i].obstacleX;
    obstacleTop = obstacleList[i].obstacleY;
    obstacleWidth = obstacleList[i].obstacleElement.offsetWidth;
    obstacleHeight = obstacleList[i].obstacleElement.offsetHeight;
    if (((obstacleLeft + obstacleWidth) > carLeft) && (obstacleLeft < (carLeft + carWidth)) && ((obstacleTop + obstacleHeight) > carTop) && (obstacleTop < (carTop + carHeight))) {
      crashEffect(carLeft, carTop);
    }

    for (var j = 0; j < weaponList.length; j++) {
      rocketLeft = weaponList[j].rocketX;
      rocketTop = weaponList[j].rocketY;
      rocketWidth = weaponList[j].rocketElement.offsetWidth;
      rocketHeight = weaponList[j].rocketElement.offsetHeight;

      if (((rocketLeft + rocketWidth) > obstacleLeft) && (rocketLeft < (obstacleLeft + obstacleWidth)) && ((rocketTop + rocketHeight) > obstacleTop) && (rocketTop < (obstacleTop + obstacleHeight))) {
        obstacleList[i].health -= 1;
        weaponList[j].deleteRocket();
        weaponList[j].rocketStatus = false;
        if (obstacleList[i].health == 0) {
          obstacleList[i].removeObstacle();
          rocketHitEffect(obstacleLeft, obstacleTop);
        }
      }
    }
  }
};

/*Update Rocket*/
function moveRocket() {
  for (var i = 0; i < weaponList.length; i++) {
    if (weaponList[i].rocketStatus) {
      weaponList[i].updateRocket();
    }
  }
}

/*Crash Effect*/
var crashEffect = function (positionX, positionY) {
  var crash = document.createElement("div");
  crash.className = "explosion";
  crash.style.left = (positionX - 10) + "px";
  crash.style.top = positionY + "px";
  gameScenario.newRoad.backgroundElement.appendChild(crash);
  explosion = true;
  stopGame();
};

/*Rocket Hit Effect*/
var rocketHitEffect = function (positionX, positionY) {
  var rocketHit = document.createElement("div");
  rocketHit.className = "explosion";
  rocketHit.style.left = (positionX - 10) + "px";
  rocketHit.style.top = positionY + "px";
  gameScenario.newRoad.backgroundElement.appendChild(rocketHit);
  rocketHit.style.backgroundPosition = "0px " + "0px";

  var hitEffectDuration = setInterval(updateAnimate, 100);
  var hitEffectDurationCounter = 0;
  counter += 5;

  function updateAnimate() {
    if (hitEffectDurationCounter >= 1) {
      gameScenario.newRoad.backgroundElement.removeChild(rocketHit);
      clearInterval(hitEffectDuration);
    }
    hitEffectDurationCounter++;
  }

};

/*Start Screen*/
var startScreen = function () {
  var playScreen = document.createElement("div");
  playScreen.className = "play-screen";
  mainBody.appendChild(playScreen);

  var playButton = document.createElement("button");
  playButton.className = "play-button";
  playScreen.appendChild(playButton);

  playButton.onclick = function () {
    main();
    mainBody.removeChild(playScreen);
  }

};

/*Game Start*/
var main = function () {
  gameScenario = new World(mainBody);
  gameScenario.newCar.resetCar();

  var scoreCard = document.createElement("div");
  scoreCard.className = "score-card";
  gameScenario.newRoad.backgroundElement.appendChild(scoreCard);
  if (!explosion) {
    game = setInterval(function () {
      if (status == 67) {
        createObstacles();
        counter++;
        scoreCard.innerHTML = counter;
        status = 0;
      }
      status++;
      gameScenario.newRoad.updateBackground();

      document.onkeydown = function (event) {
        if (event.keyCode == 37) {
          gameScenario.newCar.moveCar("Left");
        }
        if (event.keyCode == 39) {
          gameScenario.newCar.moveCar("Right");
        }
        if (event.keyCode == 32) {
          var rocket = new Rocket(gameScenario.newRoad.backgroundElement, gameScenario.newCar.carElement);
          rocket.createRocket();
          weaponList.push(rocket);
        }
      };
      moveRocket();
      updateObstacles();
      collisionCheck();
    }, 15);
  }
};

/*Stop Game*/
var stopGame = function () {
  clearInterval(game);
  stopKeys();
  endScreen();
};

/*Stop Keys*/
var stopKeys = function () {
  document.onkeydown=function (event) {
    if (event.keyCode == 37) {
    }
    if (event.keyCode == 39) {
    }
    if (event.keyCode == 32) {
    }
  }
};

/*Game Over Screen*/
var endScreen = function () {
  var endScreen = document.createElement("div");
  endScreen.className = "end-screen";
  mainBody.appendChild(endScreen);

  var gameoverText=document.createElement("h2");
  gameoverText.innerHTML="GAME OVER";
  endScreen.appendChild(gameoverText);

  var line=document.createElement("hr");
  endScreen.appendChild(line);
  var line2=document.createElement("hr");
  endScreen.appendChild(line2);

  var score=document.createElement("span");
  score.className="score";
  score.innerHTML="Your Score";
  endScreen.appendChild(score);

  var scoreNumber=document.createElement("span");
  scoreNumber.className="score-number";
  scoreNumber.innerHTML=counter;
  endScreen.appendChild(scoreNumber);

  var playAgain = document.createElement("button");
  playAgain.className = "play-again-button";
  playAgain.innerHTML="Play Again";
  endScreen.appendChild(playAgain);

  var endLine=document.createElement("hr");
  endScreen.appendChild(endLine);
  var endLine2=document.createElement("hr");
  endScreen.appendChild(endLine2);

  playAgain.onclick = function () {
    explosion=false;
    counter=-1;
    status=0;
    var obstacleList = [];
    var weaponList = [];
    mainBody.removeChild(wrapper);
    mainBody.removeChild(endScreen);
    main();
  }
};


/*====================================================================================================================*/

var mainBody = document.getElementById("world");
var wrapper;
var gameScenario;
var obstacleList = [];
var weaponList = [];
var counter = 0;
var explosion = false;
var game;
var status = 0;
startScreen();




