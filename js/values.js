/*
	GameOptions are configurable but theese should
	be considerd the default configuration. 
	The variable gameMode is stored here
	*/
var gameOptions = {
	canvasWidth: 0,
	canvasHeight: 0,
	foodSpawnRate: 5000,
	bugSpawnRate: 12000,
	refreshRate: 50
};

var lastFoodSpawn = null,
	lastBugSpawn = null;

var player = {
	moveDistance: 10,
	size: 10,
	x: 10,
	y: 240
};

function resetVariables() {
	writeLogMessage('===================');
	writeLogMessage('Reset all variables');
	writeLogMessage('===================');

	var now = Date.now()

	isRunning = false;
	clearInterval(updateLoop);

	$('#game-over-overlay').css('display', 'block');

	timeAttackTimeElement.text('');

	foodArray.splice(0, foodArray.length);
	bugArray.splice(0, bugArray.length);

	tailArray.splice(0, tailArray.length)
	tailLength = 1;

	player.x = 10;
	player.y = 240;

	score = 0;

	lastFoodSpawn = null,
	lastBugSpawn = null;

	updateScoreDisplay(now, null);
}

var gameModes = {
	normal: {
		init: function() {
			timeAttackStartTime = Date.now();

			update();
			updateLoop = setInterval(update, gameOptions.refreshRate);

			updateScoreDisplay(null, null);
		}
	},
	obstacle: {
		init: function() {
			update();
			updateLoop = setInterval(update, gameOptions.refreshRate);

			spawnObstacles();
			updateScoreDisplay(null, null);
		},
		level: baseLevel
	},
	createmap: {
		init: function() {
			update();
			updateLoop = setInterval(update, gameOptions.refreshRate);
			
			canvas.addEventListener('mousedown', mouseDownEvent, false);
		},
		level: baseLevel
	}
};

var isRunning = false;

var bugMaxScore = 7000;

var foodSize = 10;

var foodPoints = 10;

var foodArray = [];
var bugArray = [];
var createArray = [];

var tailArray = [];
//We set the tail length to 1 initially to match the size of the snake itself
var tailLenght = 1;

//39 is right which is our default
var directionCurrent = 39;
var directionLastUsed = 39;

var directionLeft = 37;
var directionUp = 38;
var directionRight = 39;
var directionDown = 40;

var score = 0;
var maxBugScore = 70;

var backgroundColor = "#000000";
var tileColor = '#00ff00';
var snakeColor = "#ffffff";
var foodColor = "#ff0000";
var bugColor = "#0000ff";

var snakeMaxColor = 255;
var snakeMinColor = 80;

var updateLoop;
var bugSpawnLoop;
var foodSpawnLoop;

var canvas;
var context;

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