function initialize(gameMode) {

	update();

	updateLoop = setInterval(update, gameOptions.refreshRate);
	requestAnimationFrame(draw);

	document.onkeydown = checkKey;
	function checkKey(e) {

	    e = e || window.event;
	   	var code = (e.keyCode ? e.keyCode : e.which);

	    if (code > 36 && code < 41) {

	    	e.preventDefault();

	    	if (canTurn(code, directionLastUsed)) {
	    		directionCurrent = code;
	    	}
	  	}
	}

	gameOptions.gameMode = gameModes[gameMode];
	gameOptions.gameMode.init();

}

function end() {
	isRunning = false;
	clearInterval(updateLoop);

	$('#game-over-overlay').css('display', 'block');

	foodArray.splice(0, foodArray.length);
	bugArray.splice(0, bugArray.length);
	obstacleArray.splice(0, obstacleArray.length);

	tailArray.splice(0, tailArray.length)
	tailLength = 1;

	score = 0;

	updateScoreDisplay(Date.now(), null);
}

function canTurn(from, to) {
	var canTurn = true;
	    	
	if (to == directionLeft && from == directionRight) {
		canTurn = false;
	}

	if (to == directionUp && from == directionDown) {
		canTurn = false;
	}

	if (to == directionRight && from == directionLeft) {
		canTurn = false;
	}

	if (to == directionDown && from == directionUp) {
		canTurn = false;
	}

	return canTurn;
}