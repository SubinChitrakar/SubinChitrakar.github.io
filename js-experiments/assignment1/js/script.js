var container = document.getElementById('container');

var areaDimensions=750;
var plotDimensions=20;

var area = document.createElement('div');
area.style.position='relative';
area.style.margin='0 auto';
area.style.height = areaDimensions+'px';
area.style.width = areaDimensions+'px';
area.style.backgroundColor='red';
area.style.float='left';

var plots = document.createElement('ol');
plots.style.float='left';
container.appendChild(area);
container.appendChild(plots);


function newPoint() {
	var plotAreas = document.createElement('div');
	plotAreas.style.position='absolute';
	plotAreas.style.height=plotDimensions+'px';
	plotAreas.style.width=plotDimensions+'px';
	plotAreas.style.backgroundColor='blue';

	plotAreas.style.top=Math.random() * (areaDimensions-plotDimensions)+'px';
    plotAreas.style.left=Math.random() * (areaDimensions-plotDimensions)+'px';

	plotAreas.onclick = function() {
		var plotList = document.createElement('li');
		plotList.style.padding = '5px';
		plotList.innerHTML = 'Top: ' + this.style.top + ' Left: ' + this.style.left;
		plots.appendChild(plotList);
		area.removeChild(plotAreas);
	};

	return plotAreas;
}

for (var i = 0; i < 15; i++) {
    area.appendChild(newPoint());
}