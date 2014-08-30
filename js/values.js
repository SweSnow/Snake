
var gameOptions = {
	canvasWidth: 0,
	canvasHeight: 0,
	foodSpawnRate: 5000,
	bugSpawnRate: 12000,
	refreshRate: 50
};

var lastFoodSpawn = Date.now(),
	lastBugSpawn = Date.now();

var player = {
	moveDistance: 10,
	size: 10,
	x: 10,
	y: 240
};

function resetVariables() {
	isRunning = false;
	clearInterval(updateLoop);

	$('#game-over-overlay').css('display', 'block');

	timeAttackTimeElement.text('');

	foodArray.splice(0, foodArray.length);
	bugArray.splice(0, bugArray.length);
	obstacleArray.splice(0, obstacleArray.length);

	tailArray.splice(0, tailArray.length)
	tailLength = 1;

	player.x = 10;
	player.y = 240;

	lastFoodSpawn = Date.now(),
	lastBugSpawn = Date.now();

	score = 0;

	updateScoreDisplay(Date.now(), null);
}

var gameModes = {
	normal: {
		init: function() {
			timeAttackStartTime = Date.now();

			update();
			updateLoop = setInterval(update, gameOptions.refreshRate);

			spawnRandomFood();
			updateScoreDisplay(null, null);
		}
	},
	obstacle: {
		init: function() {
			update();
			updateLoop = setInterval(update, gameOptions.refreshRate);

			spawnRandomFood();
			spawnObstacles();
			updateScoreDisplay(null, null);
		},
		level: 1
	},
	createmap: {
		init: function() {
			update();
			updateLoop = setInterval(update, gameOptions.refreshRate);
		}
	}
};

var modeNormal = 1,
	modeObstacles = 2;

var isRunning = false;

var bugMaxScore = 7000;

var foodSize = 10;

var foodPoints = 10;

var foodArray = [];
var bugArray = [];
var obstacleArray = [];
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

var timeAttackTimeElement;
var timeAttackStartTime;

var level1 = [
	[1,1,1,1,1,1,1,1,1,1,1,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,0,0,2,0,0,0,0,0,2,2,1],
	[1,0,0,2,0,2,2,2,0,0,0,1],
	[1,0,0,2,0,0,0,0,0,0,2,1],
	[1,0,0,0,0,0,0,0,0,0,2,1],
	[1,0,0,0,0,0,0,2,0,0,0,1],
	[1,0,0,0,2,0,0,0,0,0,0,1],
	[1,0,2,2,2,2,0,0,0,0,0,1],
	[1,0,0,2,0,0,2,0,0,2,0,1],
	[1,0,0,0,0,0,0,0,0,0,0,1],
	[1,1,1,1,1,1,1,1,1,1,1,1]
];

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