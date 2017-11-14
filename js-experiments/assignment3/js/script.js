var obj = {
    firstName: "Subin",
    lastName: "Chitrakar",
    age: "21",
    highSchool: "Kendriya Vidyalaya",
    college: "Islington College",
    degree: "B.Sc (Hons.) in Computing"
};

var container = document.getElementById("container");
var infoList = document.createElement("ul");
container.appendChild(infoList);
var objKeys = Object.keys(obj);

for (var i = 0; i < objKeys.length; i++) {
    var info = document.createElement("li");
    info.style.padding = "5px";
    var key = objKeys[i];
    info.innerHTML = key + ": " + obj[key];
    infoList.appendChild(info);
}
