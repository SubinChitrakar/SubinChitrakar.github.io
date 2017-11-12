var Box=function (element) {
    this.x = 0;
    this.y = 0;
    this.dx = 0;
    this.dy = 0;
    this.width = 0;
    this.height = 0;
    this.element = element;

    this.updatePosition = function () {
        this.x = this.x + this.dx;
        this.y = this.y + this.dy;
        element.style.top = this.y + "px";
        element.style.left = this.x + "px";
    };

    this.restrict = function (parentBody) {
        var parentWidth = parentBody.offsetWidth-(50+10);
        var parentHeight = parentBody.offsetHeight-(55+10);

        if ((this.x >= parentWidth) || (this.x <= 0)) {
            this.dx = this.dx * -1;
        }

        else if ((this.y >= parentHeight) || (this.y <= 0)) {
            this.dy = this.dy * -1;
        }
    };

    this.killAnt = function () {
        totalAnt.splice(totalAnt.indexOf(this), 1);
    }
};

var World=function () {
    var that=this;

    this.startWindow=function () {
        var playBody = document.createElement("div");
        playBody.style.backgroundColor = "red";
        playBody.style.width = mainBox.offsetWidth + "px";
        playBody.style.height = mainBox.offsetHeight + "px";
        playBody.style.textAlign = "center";
        playBody.style.fontSize = "36px";
        mainBox.appendChild(playBody);

        var startButton = document.createElement("button");
        startButton.style.padding = "20px 50px";
        startButton.style.marginRight = "10px";
        startButton.style.marginTop = "50%";
        startButton.innerHTML = "Play";
        playBody.appendChild(startButton);

        startButton.onclick = function () {
            mainBox.removeChild(playBody);
            that.gameOn();
            that.addChild();
            gameOver = setInterval(that.gameLoop, 100);
        };
    };

    this.gameOn = function () {
        for (var i = 0; i < 5; i++) {
            var ant = document.createElement("div");
            ant.style.position = "absolute";
            var antImage = document.createElement("IMG");
            antImage.setAttribute("src", "ant.gif");
            antImage.setAttribute("width", "50");
            antImage.setAttribute("height", "55");
            ant.appendChild(antImage);

            var antBox = new Box(ant);
            antBox.x = Math.random() * (mainBox.offsetWidth - 50);
            antBox.y = Math.random() * (mainBox.offsetHeight - 55);
            antBox.width = 50;
            antBox.height = 55;

            var randomDX = Math.random();
            if (randomDX > 0.5) {
                randomDX *= 1;
            }
            else {
                randomDX *= -1;
            }

            var randomDY = Math.random();
            if (randomDY > 0.5) {
                randomDX *= 1;
            }
            else {
                randomDY *= -1;
            }
            antBox.dx = randomDX * 20;
            antBox.dy = randomDY * 20;

            totalAnt.push(antBox);

            totalAnt[i].element.onclick = function (_newAnt) {
                return function () {
                    mainBox.removeChild(_newAnt.element);
                    _newAnt.killAnt();
                }
            }(totalAnt[i]);
        }
    };

    this.addChild = function () {
        for (var j = 0; j < totalAnt.length; j++) {
            mainBox.appendChild(totalAnt[j].element);
        }
    };


    this.collisionCheck = function () {
        for (var i = 0; i < totalAnt.length; i++) {
            for (var j = i; j < totalAnt.length; j++) {
                if (totalAnt[i] === totalAnt[j]) {
                    continue;
                }

                var topA = totalAnt[i].y;
                var bottomA = totalAnt[i].y + totalAnt[i].height;
                var leftA = totalAnt[i].x;
                var rightA = totalAnt[i].x + totalAnt[i].width;

                var topB = totalAnt[j].y;
                var bottomB = totalAnt[j].y + totalAnt[j].height;
                var leftB = totalAnt[j].x;
                var rightB = totalAnt[j].x + totalAnt[j].width;

                if ((rightA > leftB) && (leftA < rightB) && (bottomA > topB) && (topA < bottomB)) {
                    clearInterval(gameOver);
                    if(totalAnt[i].x>totalAnt[j].x){
                        totalAnt[i].dx=Math.abs(totalAnt[i].dx);
                        totalAnt[j].dx=-Math.abs(totalAnt[j].dx);
                        if(totalAnt[i].y>totalAnt[j].y){
                            totalAnt[i].dy=Math.abs(totalAnt[i].dy);
                            totalAnt[j].dy=-Math.abs(totalAnt[j].dy);
                        }else{
                            totalAnt[j].dy=Math.abs(totalAnt[j].dy);
                            totalAnt[i].dy=-Math.abs(totalAnt[i].dy);
                        }
                    }else{
                        totalAnt[j].dx=Math.abs(totalAnt[j].dx);
                        totalAnt[i].dx=-Math.abs(totalAnt[i].dx);
                        if(totalAnt[i].y>totalAnt[j].y){
                            totalAnt[i].dy=Math.abs(totalAnt[i].dy);
                            totalAnt[j].dy=-Math.abs(totalAnt[j].dy);
                        }else{
                            totalAnt[j].dy=Math.abs(totalAnt[j].dy);
                            totalAnt[i].dy=-Math.abs(totalAnt[i].dy);
                        }
                    }
                    totalAnt[i].restrict(mainBox);
                    totalAnt[j].restrict(mainBox);
                    gameOver = setInterval(this.gameLoop, 100);
                }
            }
        }
    };

    this.gameLoop=function() {
        for (var i = 0; i < totalAnt.length; i++) {
            that.collisionCheck();
            totalAnt[i].updatePosition();
            totalAnt[i].restrict(mainBox);
        }

        if (totalAnt.length == 0) {
            var endScreen = document.createElement("div");
            endScreen.style.backgroundColor = "red";
            endScreen.style.width = mainBox.offsetWidth + "px";
            endScreen.style.height = mainBox.offsetHeight + "px";
            endScreen.style.textAlign = "center";
            endScreen.style.fontSize = "36px";

            var gameOverText = document.createElement("h2");
            gameOverText.innerHTML = "YOU WON";
            gameOverText.style.float = "left";
            gameOverText.style.marginTop = "40%";
            gameOverText.style.marginLeft = "30%";
            endScreen.appendChild(gameOverText);

            var restartButton = document.createElement("button");
            restartButton.style.padding = "15px";
            restartButton.style.float = "right";
            restartButton.style.marginRight = "10px";
            restartButton.style.marginTop = "10px";
            restartButton.innerHTML = "Restart";
            endScreen.appendChild(restartButton);

            mainBox.appendChild(endScreen);
            clearInterval(gameOver);

            restartButton.onclick = function () {
                mainBox.removeChild(endScreen);
                that.gameOn();
                that.addChild();
                gameOver = setInterval(that.gameLoop, 100);
            }
        }
    }
};

var mainBox = document.getElementById("mainbox");
var gameOver;
var totalAnt = [];
var gameWorld=new World();
gameWorld.startWindow();



