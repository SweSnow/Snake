/*
	GameOptions are configurable but theese should
	be considerd the default configuration. 
	The variable gameMode is stored here
	*/
var gameOptions = {
	refreshRate: 50
};

var lastFoodSpawn = null,
	lastBugSpawn = null;

var player = {
	moveDistance: 20,
	size: 20,
	x: 20,
	y: 300
};

var gameModes = {
	normal: {
		init: function() {
			timeAttackStartTime = Date.now();
			
			update();
			updateLoop = setInterval(update, gameOptions.refreshRate);

			updateScoreDisplay(null, null);
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
			$(canvas).click(mouseDownEvent);

			$('#clear-button').css('display', 'block');
		},
		pointer: {
			x: 100,
			y: 100
		}
	}
};

var isRunning = false;

var tailArray = [];
//We set the tail length to 1 initially to match the size of the snake itself
var tailLength = 1;

//39 is right which is our default
var directionCurrent = 39;
var directionLastUsed = 39;

var directionLeft = 37;
var directionUp = 38;
var directionRight = 39;
var directionDown = 40;

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