var canvas = document.getElementById('myCanvas');
var ctx = canvas.getContext('2d');

function clearCanvas() {
	ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function africaVM() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[0].vm;
		var colors = 'yellow';
		drawHistogram(data, colors, 0);
	});
}

function africaVMBubble() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[0].vm;
		var colors = 'yellow';
		drawBuble(data, colors);
	});
}

function africaRN() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[0].rn;
		var colors = 'green';
		drawHistogram(data, colors, 5);
	});
}

function africaRNBubble() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[0].rn;
		var colors = 'green';
		drawBuble(data, colors);
	});
}

function africaRM() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[0].rm;
		var colors = 'red';
		drawHistogram(data, colors, 10);
	});
}

function africaRMBubble() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[0].rm;
		var colors = 'red';
		drawBuble(data, colors);
	});
}

function asiaVM() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[1].vm;
		var colors = 'yellow';
		drawHistogram(data, colors, 0);
	});
}

function asiaVMBubble() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[1].vm;
		var colors = 'yellow';
		drawBuble(data, colors);
	});
}

function asiaRN() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[1].rn;
		var colors = 'green';
		drawHistogram(data, colors, 5);
	});
}

function asiaRNBubble() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[1].rn;
		var colors = 'green';
		drawBuble(data, colors);
	});
}

function asiaRM() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[1].rm;
		var colors = 'red';
		drawHistogram(data, colors, 10);
	});
}

function asiaRMBubble() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[1].rm;
		var colors = 'red';
		drawBuble(data, colors, 10);
	});
}

function europaVM() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[2].vm;
		var colors = 'yellow';
		drawHistogram(data, colors, 0);
	});
}

function europaVMBubble() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[2].vm;
		var colors = 'yellow';
		drawBuble(data, colors);
	});
}

function europaRN() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[2].rn;
		var colors = 'green';
		drawHistogram(data, colors, 5);
	});
}

function europaRNBubble() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[2].rn;
		var colors = 'green';
		drawBuble(data, colors);
	});
}

function europaRM() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[2].rm;
		var colors = 'red';
		drawHistogram(data, colors, 10)
	});
}

function europaRMBubble() {
	$.getJSON("media/regiuni.json", function (json) {
		var data = json.regiuni[2].rm;
		var colors = 'red';
		drawBuble(data, colors);
	});
}

function drawHistogram(data, color, space) {
	ctx.fillStyle = color;
	for (var i = 0; i <= data.length; i++) {
		ctx.fillRect(space + [i] * 30, 700, 5, -data[i] * 5);
		ctx.restore();
	}
}

function drawBuble(data, color) {
	for (var i = 0; i <= data.length; i++) {
		var radius = (data[i] * 100) / 1000;
		drawARC([i] * 50, 600 - data[i], radius * 5, color);
	}
}

function drawARC(x, y, radius, color) {
	ctx.beginPath();
	ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
	ctx.fillStyle = color;
	ctx.fill();
	ctx.lineWidth = 1;
	ctx.strokeStyle = '#003300';
	ctx.stroke();
}

var animationData1 = 0;
var animationData2 = 0;
var index = 0;
var lastTime = 0

function loadAnimationData(regiune, data) {
	if (animationData1 === 0) {
		$.getJSON("media/regiuni.json", function (json) {
			if (data === 2) {
				loadAnimationData1(json.regiuni[regiune].rn);
			} else if (data === 3) {
				loadAnimationData1(json.regiuni[regiune].rm);
			}
		});
	} else if (animationData1 !== 0) {
		$.getJSON("media/regiuni.json", function (json) {
			if (data === 2) {
				loadAnimationData2(json.regiuni[regiune].rn);
			} else if (data === 3) {
				loadAnimationData2(json.regiuni[regiune].rm);
			}
		});
		setTimeout(function () {
			var startTime = (new Date()).getTime();
			animate(startTime);
		}, 1000);
	}
}

function loadAnimationData1(data) {
	console.log(data);
	animationData1 = data;
}

function loadAnimationData2(data) {
	animationData2 = data;
}

window.requestAnimFrame = (function (callback) {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();

function animate(startTime) {
	if (lastTime + 200 < (new Date()).getTime()) {
		lastTime = (new Date()).getTime()

		var time = (new Date()).getTime() - startTime;
		index = index + 1;

		ctx.clearRect(0, 0, canvas.width, canvas.height);

		var radiusA = (animationData1[index] * 100) / 1000;
		var radiusB = (animationData2[index] * 100) / 1000;
		drawARC(index * 30, 700 - animationData1[index], radiusA, 'black');
		drawARC(index * 30, 700 - animationData2[index], radiusB, 'blue');
	}

	if (index <= animationData1.length) {
		requestAnimFrame(function () {
			animate(startTime);
		});
	} else {
		animationData1 = 0;
		animationData2 = 0;
		index = 0;
	}
}


function drawTable() {
	$.getJSON("media/regiuni.json", function (json) {
		writeText(json.regiuni[0].vm, 10, 'VM');
		writeText(json.regiuni[0].rn, 50, 'RN');
		writeText(json.regiuni[0].rm, 100, 'RM');

		writeText(json.regiuni[1].vm, 150, 'VM');
		writeText(json.regiuni[1].rn, 200, 'RN');
		writeText(json.regiuni[1].rm, 250, 'RM');

		writeText(json.regiuni[2].vm, 300, 'VM');
		writeText(json.regiuni[2].rn, 350, 'RN');
		writeText(json.regiuni[2].rm, 400, 'RM');
	});
}

function writeText(data, position, column) {
	var y = 25;
	ctx.fillText(column, position, 10);
	for (var i = 0; i < data.length; i++) {
		ctx.fillText(data[i], position, y);
		y = y + 20;
		drawLineY(position);
		drawLineX(y)
	}
}

function drawLineY(xTOP) {
	ctx.beginPath();
	ctx.moveTo(xTOP + 30, 0);
	ctx.lineTo(xTOP + 30, canvas.height);
	ctx.stroke();
}

function drawLineX(yLEFT) {
	ctx.beginPath();
	ctx.moveTo(0, yLEFT + 5);
	ctx.lineTo(430, yLEFT + 5);
	ctx.stroke();
}