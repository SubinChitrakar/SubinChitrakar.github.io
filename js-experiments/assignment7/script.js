var Background = function (parentElement) {
    this.backgroundY = 0;
    this.backgroundDY = 100;
    this.backgroundElement = "";
    this.mainElement = parentElement;
    var that = this;

    this.createBackground = function () {
        this.backgroundElement = document.createElement("div");
        this.backgroundElement.className = "road";
        this.mainElement.appendChild(that.backgroundElement);
    };

    this.updateBackground = function () {
        this.backgroundElement.style.backgroundPositionY = this.backgroundDY + "px";
        this.backgroundDY += 100;
    }
};

var Car = function (parentElement) {
    this.carY = 680;
    this.carX = 150;
    this.dx = 0;
    this.carElement = "";
    this.backgroundElement = parentElement;
    var that = this;

    this.createCar = function () {
        console.log(this.backgroundElement);
        this.carElement = document.createElement("div");
        this.carElement.className = "car";
        this.backgroundElement.appendChild(that.carElement);
    };

    this.moveCar = function (direction) {
        this.carElement.style.top = this.carY + "px";
        this.carElement.style.left = this.carX + "px";
        console.log(this.carX);
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
    }
};

var World = function (element) {
    this.newRoad = new Background(element);
    this.newRoad.createBackground();
    this.newCar = new Car(this.newRoad.backgroundElement);
    this.newCar.createCar();
};

var mainBody1 = document.getElementById("world");
var mainBody2 = document.getElementById("world1");
var gameScenario = new World(mainBody1);
var gameScenario1 = new World(mainBody2);

setInterval(function () {
    gameScenario.newRoad.updateBackground();
    gameScenario1.newRoad.updateBackground();
    document.onkeydown = function (event) {
        if (event.keyCode == 37) {
            gameScenario.newCar.moveCar("Left");
            gameScenario1.newCar.moveCar("Left");
        }
        if (event.keyCode == 39) {
            gameScenario.newCar.moveCar("Right");
            gameScenario1.newCar.moveCar("Right");
        }
    }
}, 100);
