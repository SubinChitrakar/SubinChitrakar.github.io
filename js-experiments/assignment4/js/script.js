function Box(element) {
    this.x=0;
    this.y=0;
    this.dx=0;
    this.dy=0;
    this.movingPx=5;

    console.log(element);
    this.move=function(moveY,moveX) {
        this.dy=moveY*this.movingPx;
        this.dx=moveX*this.movingPx;
    };

    this.updatePosition=function () {
        this.x=this.x+this.dx;
        this.y=this.y+this.dy;
        element.style.top=this.y+"px";
        element.style.left=this.x+"px";
    }
}

var mainbox=document.getElementById("mainbox");
var movingBox=document.getElementById("smallbox");
var smallBox=new Box(movingBox);
setInterval(function () {
    document.onkeydown=function (event) {
        if (event.keyCode==38){
            smallBox.move(-1,0)
        }
        if (event.keyCode==40){
            smallBox.move(1,0);
        }
        if (event.keyCode==37){
            smallBox.move(0,-1);
        }
        if (event.keyCode==39) {
            smallBox.move(0,1);
        }
    };
   smallBox.updatePosition();
},100);

for (var i = 0; i < 20; i++) {
    mainbox.appendChild(createNewChild());
}

function createNewChild() {
    var obstacle=document.createElement("div");
    obstacle.style.position="absolute";
    obstacle.style.width="20px";
    obstacle.style.height="20px";
    obstacle.style.backgroundColor="black";

    var obstacleBox=new Box(obstacle);
    obstacleBox.x= Math.random()*(1200-20);
    obstacleBox.y=Math.random()*(800-20);
    obstacleBox.updatePosition();

    obstacle.onclick=function () {
        alert("You Clicked Here:  Top-->"+obstacle.style.top+ " Left-->"+obstacle.style.left);
    };
    return obstacle;
}
