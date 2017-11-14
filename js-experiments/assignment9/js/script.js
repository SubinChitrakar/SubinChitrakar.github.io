const SPACE_KEY_CODE = 32;
const BACKGROUND_MOVEMENT=1;
const GAME_HEIGHT = 368;
const MIN_GAME_TOP=0;
const MAX_GAME_TOP=340;
const BIRD_DOWN_MOVEMENT = 3;
const BIRD_UP_MOVEMENT=50;
const BIRD_LEFT=-40;
const PIPE_DIFFERENCE = 150;
const PIPE_HEIGHT = 62;
const PIPE_WIDTH = 130;
const PIPE_LEFT = 900;
const PIPE_MOVEMENT=10;
const END_LEFT=-130;
const OFFSET_IMAGE=-3;
const BIRD_FLY_DOWN=0;
const BIRD_FLY_UP=-40;
const BIRD_CRASH=-85;

/*===============================Classes======================================*/

/*World Class*/
class World {
  constructor(element) {
    this.background = '';
    this.flappyBird = '';
    this.obstacleList = [];
    this.tempObstacleList = [];
    this.scoreCard = '';
    this.parentElement = element;
  }

  startScreen() {
    let playScreen = document.createElement("div");
    playScreen.className = "play-screen";
    mainBody.appendChild(playScreen);

    let playButton = document.createElement("button");
    playButton.className = "play-button";
    playScreen.appendChild(playButton);

    playButton.onclick = () => {
      mainBody.removeChild(playScreen);
      this.playGame();
    }
  };

  playGame() {
    this.createEnvironment();
    this.moveEnvironment();
  }

  createEnvironment() {
    this.background = new Background(this.parentElement);
    this.background.createBackground();
    this.flappyBird = new flappyBird(this.background.backgroundElement);
    this.flappyBird.createBird();
    this.scoreCard = document.createElement("div");
    this.scoreCard.className = "score-card";
    this.background.backgroundElement.appendChild(this.scoreCard);
  }

  createObstacles() {
    let randomHeight = Math.random() * (GAME_HEIGHT - PIPE_DIFFERENCE);
    let pipeTopHeight = Math.random() * randomHeight;
    let pipeBottomHeight = (GAME_HEIGHT - PIPE_DIFFERENCE) - pipeTopHeight;

    let pipe = new Pipe(this.background.backgroundElement);
    pipe.createPipeTop(pipeTopHeight);
    pipe.createPipeBottom(pipeBottomHeight);
    this.obstacleList.push(pipe);
  }

  moveEnvironment() {
    let createStatus = false;
    let detection = false;
    setKeys(this.flappyBird);
    let status = 0;
    gameEnvironment = setInterval(() => {
      if (status === 100) {
        this.createObstacles();
        status = 0;
        this.scoreCard.innerHTML = counter;
        counter++;
        createStatus = true;
      }
      this.background.updateBackground();
      this.flappyBird.updateFlappy();

      if (createStatus) {
        this.moveObstacle();
        detection = this.detectCollision();
      }

      if (this.flappyBird.checkPosition(this.flappyBird.birdY) || detection) {
        this.flappyBird.birdElement.style.backgroundPositionX=BIRD_CRASH+'px';
        this.endGame();
      }
      status++;
    }, 30);
  }

  moveObstacle() {
    for (let i = 0; i < this.obstacleList.length; i++) {
      if (this.obstacleList[i].pipeX > (END_LEFT)) {
        this.obstacleList[i].movePipe();
        this.tempObstacleList[i]=this.obstacleList[i];
      }
      else {
        this.obstacleList[i].removePipe();
        this.tempObstacleList[i]=null;
      }
    }
    this.obstacleList = filterArray(this.tempObstacleList);
  }

  detectCollision() {
    let birdLeft = this.flappyBird.birdX;
    let birdTop = this.flappyBird.birdY;
    let birdHeight = this.flappyBird.birdElement.offsetHeight;
    let birdWidth = this.flappyBird.birdElement.offsetWidth;

    let topPipeLeft;
    let topPipeTop;
    let topPipeWidth;
    let topPipeHeight;

    let bottomPipeLeft;
    let bottomPipeTop;
    let bottomPipeWidth;
    let bottomPipeHeight;
    for (let i = 0; i < this.obstacleList.length; i++) {
      topPipeLeft = parseInt(this.obstacleList[i].pipeElementTop.style.left);
      topPipeTop = parseInt(this.obstacleList[i].pipeElementTop.style.top);
      topPipeHeight = parseInt(this.obstacleList[i].pipeElementTop.style.height);
      topPipeWidth = parseInt(this.obstacleList[i].pipeElementTop.style.width);

      bottomPipeLeft = parseInt(this.obstacleList[i].pipeElementBottom.style.left);
      bottomPipeTop = parseInt(this.obstacleList[i].pipeElementBottom.style.top);
      bottomPipeHeight = parseInt(this.obstacleList[i].pipeElementBottom.style.height);
      bottomPipeWidth = parseInt(this.obstacleList[i].pipeElementBottom.style.width);


      if (topPipeLeft > BIRD_LEFT && bottomPipeLeft > BIRD_LEFT) {
        if ((topPipeLeft <= (birdLeft + topPipeWidth)) && ((topPipeTop + topPipeHeight) > birdTop)) {
          return true;
        }

        if (((bottomPipeLeft) <= (birdLeft + bottomPipeWidth)) && (bottomPipeTop < (birdTop + birdHeight))) {
          return true;
        }

        return false;
      }
    }
  }

  endGame() {
    clearInterval(gameEnvironment);
    stopKeys();
    this.endScreen();
    this.obstacleList = [];
  }

  endScreen() {
    let endScreen = document.createElement('div');
    endScreen.className = 'end-screen';
    mainBody.appendChild(endScreen);

    let gameoverText = document.createElement('h2');
    gameoverText.innerHTML = 'GAME OVER';
    endScreen.appendChild(gameoverText);

    let line = document.createElement('hr');
    endScreen.appendChild(line);
    let line2 = document.createElement('hr');
    endScreen.appendChild(line2);

    let score = document.createElement('span');
    score.className = 'score';
    score.innerHTML = 'Your Score';
    endScreen.appendChild(score);

    let scoreNumber = document.createElement('span');
    scoreNumber.className = 'score-number';
    scoreNumber.innerHTML = counter;
    endScreen.appendChild(scoreNumber);

    let playAgain = document.createElement('button');
    playAgain.className = 'play-again-button';
    playAgain.innerHTML = 'Play Again';
    endScreen.appendChild(playAgain);

    let endLine = document.createElement('hr');
    endScreen.appendChild(endLine);
    let endLine2 = document.createElement('hr');
    endScreen.appendChild(endLine2);

    playAgain.onclick = () => {
      wrapper.removeChild(this.background.backgroundElement);
      mainBody.removeChild(endScreen);
      counter = 0;
      this.playGame();
    }
  }
}

/*Background Class*/
class Background {
  constructor(element) {
    this.backgroundX = 0;
    this.backgroundDX = BACKGROUND_MOVEMENT;
    this.backgroundElement = '';
    this.parentElement = element;
  }

  createBackground() {
    this.backgroundElement = document.createElement('div');
    this.backgroundElement.className = 'background';
    this.parentElement.appendChild(this.backgroundElement);
  }

  updateBackground() {
    this.backgroundElement.style.backgroundPositionX = this.backgroundX + 'px';
    this.backgroundX = this.backgroundX - this.backgroundDX;
  }
}


/*Flappy Bird Class*/
class flappyBird {
  constructor(element) {
    this.birdY = 0;
    this.birdX = 0;
    this.birdDY = BIRD_DOWN_MOVEMENT;
    this.birdElement = '';
    this.parentElement = element;
  }

  createBird() {
    this.birdElement = document.createElement('div');
    this.birdElement.className = 'bird';
    this.parentElement.appendChild(this.birdElement);
  }

  checkPosition(positionY) {
    return positionY < MIN_GAME_TOP || positionY > MAX_GAME_TOP;
  }

  updateFlappy(direction) {
    if (direction === 'UP') {
      this.birdDY = BIRD_UP_MOVEMENT;
      this.birdY = this.birdY - this.birdDY;
      this.birdElement.style.backgroundPositionX=BIRD_FLY_UP+'px';
    }
    else {
      this.birdDY = BIRD_DOWN_MOVEMENT;
      this.birdY = this.birdY + this.birdDY;
      this.birdElement.style.backgroundPositionX=BIRD_FLY_DOWN+'px';
    }
    this.birdElement.style.top = this.birdY + 'px';
  }
}

/*Pipe Class*/
class Pipe {
  constructor(element) {
    this.pipeY = 0;
    this.pipeX = PIPE_LEFT;
    this.pipeDY = 0;
    this.pipeDX = PIPE_MOVEMENT;
    this.parentElement = element;
    this.pipeElementTop = '';
    this.pipeElementBottom = '';
  }

  createPipeTop(height) {
    if (height < PIPE_HEIGHT) {
      height = PIPE_HEIGHT;
    }

    this.pipeElementTop = document.createElement('div');
    this.pipeElementTop.className = "pipe";
    this.pipeElementTop.style.left = this.pipeX + 'px';
    this.pipeElementTop.style.height = height + 'px';
    this.pipeElementTop.style.width = PIPE_WIDTH + 'px';
    this.pipeElementTop.style.top = 0 + 'px';
    this.parentElement.appendChild(this.pipeElementTop);

    let pipeImage = document.createElement('img');
    pipeImage.src = 'images/pipe-bottom.png';
    pipeImage.style.top = (height - PIPE_HEIGHT) + 'px';
    //To manage the image of Pipe Top's bottom Image
    pipeImage.style.left = OFFSET_IMAGE + 'px';
    pipeImage.style.position = 'absolute';
    this.pipeElementTop.appendChild(pipeImage);
  }

  createPipeBottom(height) {
    if (height < PIPE_HEIGHT) {
      height = PIPE_HEIGHT;
    }

    this.pipeElementBottom = document.createElement('div');
    this.pipeElementBottom.className = "pipe";
    this.pipeElementBottom.style.left = this.pipeX + 'px';
    this.pipeElementBottom.style.top = (GAME_HEIGHT - height) + 'px';
    this.pipeElementBottom.style.width = PIPE_WIDTH + 'px';
    this.pipeElementBottom.style.height = height + 'px';
    this.parentElement.appendChild(this.pipeElementBottom);

    let pipeImage = document.createElement('img');
    pipeImage.src = 'images/pipe-top.png';
    //To manage the image of Pipe Bottom's top Image
    pipeImage.style.left = OFFSET_IMAGE + 'px';
    pipeImage.style.position = 'absolute';
    this.pipeElementBottom.appendChild(pipeImage);
  }

  movePipe() {
    this.pipeX = this.pipeX - this.pipeDX;
    this.pipeElementTop.style.left = this.pipeX + 'px';
    this.pipeElementBottom.style.left = this.pipeX + 'px';
  }

  removePipe(){
    this.parentElement.removeChild(this.pipeElementTop);
    this.parentElement.removeChild(this.pipeElementBottom);
  }
}
/*============================Functions=======================================*/
/*Set Keys*/
function setKeys(element) {
  document.onkeydown = (event) => {
    if (event.keyCode == SPACE_KEY_CODE) {
      element.updateFlappy('UP');
    }
  }
}

/*Stop Keys*/
function stopKeys() {
  document.onkeydown = (event) => {
    if (event.keyCode == SPACE_KEY_CODE) {
    }
  }
}

/*Filter Array*/
function filterArray(unsortedArray){
  let tempSortedArray=[];
  for(let i=0; i<unsortedArray.length;i++){
    if(unsortedArray[i]!=null){
      tempSortedArray.push(unsortedArray[i]);
    }
  }
  return tempSortedArray;
}

/*================================Main Function======================================*/
let mainBody = document.getElementById('world');
let wrapper = document.createElement('div');
mainBody.appendChild(wrapper);
let world = new World(wrapper);
let gameEnvironment;
let counter = 0;
world.startScreen();
