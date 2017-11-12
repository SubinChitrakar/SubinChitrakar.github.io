var container = document.getElementById('container');
var count = 3;
var currentIndex = 0;
var left = 0;
var endPoint = 0;
var tempValue;
var previousIndex;
var slider = document.createElement('div');
slider.style.width = '100%';
slider.classList = 'clear-fix';
container.appendChild(slider);

/*Load Components*/
var previousButton = document.createElement('button');
previousButton.style.float = 'left';
previousButton.innerHTML = 'Previous';
previousButton.style.width = '100px';
previousButton.style.marginTop = '200px';
previousButton.style.padding = '20px';
slider.appendChild(previousButton);

var imageContainer = document.createElement('div');
imageContainer.style.float = 'left';
imageContainer.style.width = '720px';
imageContainer.style.height = '540px';
imageContainer.style.overflow = 'hidden';
imageContainer.style.margin = '0 10px';
slider.appendChild(imageContainer);

var imageList = document.createElement('ul');
imageList.style.height = '540px';
imageList.style.width = 720 * (count + 1) + 'px';
imageList.style.listStyle = 'none';
imageList.style.position = 'relative';
imageContainer.appendChild(imageList);

var nextButton = document.createElement('button');
nextButton.style.float = 'left';
nextButton.innerHTML = 'Next';
nextButton.style.width = '100px';
nextButton.style.marginTop = '200px';
nextButton.style.padding = '20px';
slider.appendChild(nextButton);


/*Load Image*/
var loadImages = function () {
  for (var i = 1; i <= (count + 1); i++) {
    var image = document.createElement('li');
    image.style.width = '720px';
    image.style.display = 'inline';
    imageList.appendChild(image);

    var imageSrc = document.createElement("IMG");
    imageSrc.style.display = 'inline-block';
    imageSrc.style.width = '720px';
    imageSrc.style.height = '540px';
    imageSrc.src = 'images/image' + i + '.jpg';
    image.appendChild(imageSrc);
  }
};

/*Move To Previous Image*/
var previousImage = function (index) {
  previousButton.disabled = true;
  currentIndex = checkIndex(index);
  endPoint = (currentIndex * 720) * -1;
  if (left >= 0) {
    endPoint = -2160;
    left = -2880;
  }
  var moveLeft = setInterval(function () {
    left += 10;
    if (left === endPoint) {
      clearInterval(moveLeft);
      previousButton.disabled = false;
    }
    imageList.style.left = left + 'px';
  }, 10);
};


/*Move To Next Image*/
var nextImage = function (index) {
  nextButton.disabled = true;
  currentIndex = checkIndex(index);
  endPoint = (currentIndex * 720) * -1;

  if (left <= -2160) {
    endPoint = 0;
    left = 720;
  }
  var moveRight = setInterval(function () {
    left -= 10;
    if (left === endPoint) {
      clearInterval(moveRight);
      nextButton.disabled = false;
    }
    imageList.style.left = left + 'px';
  }, 10);
};


/*Jump to Image*/
var jumpToImage=function (index) {
  currentIndex=(index-1);
  endPoint = (currentIndex * 720) * -1;
  console.log("current",currentIndex);
  console.log('end',endPoint);
  var goToImage = setInterval(function () {
    if (endPoint<=left){
      left -= 10;
    }

    if(endPoint>=left){
      left+=10;
    }


    if (left === endPoint) {
      clearInterval(goToImage);
    }
    imageList.style.left = left + 'px';
  }, 10);
};

var loadImageNumbers=function(){
  var numberList = document.createElement('ul');
  numberList.style.listStyle='none';
  numberList.style.marginTop='550px';
  numberList.style.textAlign='center';
  slider.appendChild(numberList);

  for(var i=1; i<=(count+1); i++){
    var number = document.createElement('li');
    number.style.float='left';
    numberList.appendChild(number);

    var numberButton=document.createElement('button');
    numberButton.innerHTML=i;
    numberButton.style.padding='10px';
    numberList.appendChild(numberButton);

    numberButton.onclick=function (event) {
      tempValue=event.path[0].innerHTML;
      jumpToImage(tempValue);
    }
  }
};

/*Checking the Index of the Image*/
var checkIndex = function (index) {
  if (index < 0) {
    index = count;
  }
  if (index > count) {
    index = 0;
  }
  return index;
};


loadImages();
loadImageNumbers();
previousButton.onclick = function () {
  currentIndex -= 1;
  previousImage(currentIndex);
};
nextButton.onclick = function () {
  currentIndex += 1;
  nextImage(currentIndex);
};


