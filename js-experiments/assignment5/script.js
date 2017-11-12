var data = [
    {
        tagName: 'div',
        className: 'test-class',
        styles: {
            width: "100px",
            height: "100px",
            backgroundColor: 'red'
        },
        children: [
            {
                tagName: 'div',
                className: 'box',
                styles: {
                    width: "50px",
                    height: "50px",
                    backgroundColor: 'blue'
                }
            },
            {
                tagName: 'div',
                className: 'box',
                styles: {
                    width: "50px",
                    height: "50px",
                    backgroundColor: 'brown',
                    float: 'right'
                }
            }
        ]
    }
];


var container = document.getElementById("container");
var innerContainer=document.createElement("div");
innerContainer.classList.add("test-class");

var innerContainerStyle=Object.keys(data[0].styles);
for (var i = 0; i < innerContainerStyle.length; i++) {
    var key=innerContainerStyle[i];
    innerContainer.style[key]=data[0].styles[key];
}

var children = data[0].children;
for(var j=0; j<children.length; j++){
    var childDiv=document.createElement(data[0].children[j].tagName);
    childDiv.className=data[0].children[j].className;
    var boxStyle=Object.keys(children[j].styles);
    for (var k = 0; k < boxStyle.length; k++) {
        var boxKey=boxStyle[k];
        childDiv.style[boxKey]=children[j].styles[boxKey];
    }
    innerContainer.appendChild(childDiv);
}

container.appendChild(innerContainer);

