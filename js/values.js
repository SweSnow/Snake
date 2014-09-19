/*
	values.js contains values used by all the other classes
*/

var gameOptions = {
	refreshRate: 50
};

var lastFoodSpawn = null,
	lastBugSpawn = null;

var gameModes = {
	normal: {
		init: function() {

			var level = new Level(
				defaultLevel(600, 600, 20), 30, 600, 600,
				Date.now(), this, new Player(20, 300, 20, 20));
			
			level.update(Date.now());
			updateLoop = setInterval(level.update(Date.now(), 100));
		},
		maxTime: 60000
	},
	obstacle: {
		init: function() {
			update();
			updateLoop = setInterval(update, gameOptions.refreshRate);

			updateScoreDisplay(null, null);
		},
	},
	createmap: {
		init: function() {
			update();
			updateLoop = setInterval(update, gameOptions.refreshRate);
			htmlCanvas.click(mouseDownEvent);

			$('#clear-button').css('display', 'block');
		},
		pointer: {
			x: 100,
			y: 100
		}
	}
};

var isRunning = false;

//39 is right which is our default


var score = 0;

var snakeMaxColor = 255;
var snakeMinColor = 80;

var updateLoop;

var htmlCanvas;

//60 sec
var timeAttackTimeLimit = 60000;
var timeAttackTimeElement;
var timeAttackStartTime;

var rgbColorFormatter = format('rgb({0},{0},{0})');

// Johns kod här, jag har inte skrivit den 
//själv men har fått den förklarad för mig.
function format(format) {
  return function render(/*arg1, ... , argN*/) {
   var args = arguments;
   return format.replace(/{(\d+)}/g, function(match, number) {
    return typeof args[number] !== 'undefined'
     ? args[number]
     : match
    ;
   });
  }
}