var container=document.getElementById('container');
var htmlPages=document.createElement("div");
container.appendChild(htmlPages);
var htmlCounter=4;
var htmlHeader=document.createElement("h2");
htmlHeader.innerHTML="HTML PAGES";
htmlPages.appendChild(htmlHeader);
var htmlLinks=document.createElement("ul");
htmlPages.appendChild(htmlLinks);
for(var i=1;i<=htmlCounter; i++){
  var linksList=document.createElement("li");
  htmlLinks.appendChild(linksList);
  var htmlLink=document.createElement("a");
  htmlLink.innerHTML='assignment'+i;
  htmlLink.href='https://subinchitrakar.github.io/html/assignment'+i+'/';
  linksList.appendChild(htmlLink);
}



var jsPages=document.createElement("div");
container.appendChild(jsPages);
var jsCounter=8;
var jsHeader=document.createElement("h2");
jsHeader.innerHTML="JS PAGES";
jsPages.appendChild(jsHeader);
var jsLinks=document.createElement("ul");
jsPages.appendChild(jsLinks);
for(var j=1;j<=jsCounter; j++){
  var jsList=document.createElement("li");
  jsLinks.appendChild(jsList);
  var jsLink=document.createElement("a");
  jsLink.innerHTML='assignment'+j;
  jsLink.href='https://subinchitrakar.github.io/js-experiments/assignment'+j+'/';
  jsList.appendChild(jsLink);
}