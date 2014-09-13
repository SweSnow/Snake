function initialize(gameMode) {

	document.onkeydown = checkKey;
	function checkKey(e) {

	    e = e || window.event;
	   	var code = (e.keyCode ? e.keyCode : e.which);

	   	if (code == 32 || code == 13) {
	   		if (gameOptions.gameMode == gameModes['createmap']) {
	   			e.preventDefault();

	    		placeBlock();
	    	}
	   	}

	    if (code > 36 && code < 41) {

	    	e.preventDefault();

	    	if (gameOptions.gameMode == gameModes['createmap']) {
	    		movePointer(code);
	    	}

	    	if (canTurn(code, directionLastUsed)) {
	    		directionCurrent = code;
	    	}
	  	}
	}

	$('#reset-button').css('display', 'block');

	gameOptions.gameMode = gameModes[gameMode];

	gameOptions.gameMode.level = defaultLevel.copy();
	gameOptions.gameMode.init();

	requestAnimationFrame(draw);

}

function end(text) {
	if (text) {
		$('#start-overlay').css('display', 'none');
		$('#game-over-overlay').css('display', 'block');
	} else {
		$('#start-overlay').css('display', 'block');
		$('#game-over-overlay').css('display', 'nonw');
	}

	$('#reset-button').css('display', 'none');
	$('#clear-button').css('display', 'none');
	$('#game-over-text').text(text);
	$('#game-over-score').text(score);

	resetVariables();
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

function movePointer(code) {

	switch(code) {
		case directionLeft:
			if (gameOptions.gameMode.pointer.x != 0)
				gameOptions.gameMode.pointer.x -= player.size;

		break
		case directionRight:
			if (gameOptions.gameMode.pointer.x != gameOptions.canvasWidth - player.size)
				gameOptions.gameMode.pointer.x += player.size;

		break
		case directionUp:
			if (gameOptions.gameMode.pointer.y != 0)
				gameOptions.gameMode.pointer.y -= player.size;

		break
		case directionDown:
			if (gameOptions.gameMode.pointer.y != gameOptions.canvasHeight - player.size)
				gameOptions.gameMode.pointer.y += player.size;

		break
	}
}

function placeBlock() {

	var pointerX = gameOptions.gameMode.pointer.x / player.size;
	var pointerY = gameOptions.gameMode.pointer.y / player.size;

	if (gameOptions.gameMode.level.get(pointerX, pointerY) == 0) {
		gameOptions.gameMode.level.set(pointerX, pointerY, 1);
	} else {
		gameOptions.gameMode.level.set(pointerX, pointerY, 0);
	}
}

function mouseDownEvent(event) {

	if (gameOptions.gameMode != gameModes['createmap'])
		return;

	var x = Math.floor((event.offsetX) / player.size);
	var y = Math.floor((event.offsetY) / player.size);

	if (gameOptions.gameMode.level.get(x, y) == 1) {
		gameOptions.gameMode.level.set(x, y, 0);
	} else {
		gameOptions.gameMode.level.set(x, y, 1);
	}
}

function getEmptySpot() {
	while(true) {
		var proposedX = Math.floor(Math.random() * gameOptions.canvasWidth / foodSize) * foodSize;
		var proposedY = Math.floor(Math.random() * gameOptions.canvasWidth / foodSize) * foodSize;

		if (isEmptySpot(proposedX, proposedY)) {
			return {
				x: proposedX,
				y: proposedY
			}
		}
	}
}

function isEmptySpot(proposedX, proposedY) {

	for (var i = 0; i < foodArray.length; i++) {
		if (foodArray[i].x == proposedX && foodArray[i].y == proposedY) {
			return false;
		}
	}
	
	for (var i = 0; i < bugArray.length; i++) {
		if (bugArray[i].x == proposedX && bugArray[i].y == proposedY) {
			return false;
		}
	}

	for (var i = 0; i < tailLength; i++) {
		if (tailArray[tailArray.length - i - 1].x == proposedX && tailArray[tailArray.length - i - 1].y == proposedY) {
			return false;
		}
	}

	if (gameOptions.gameMode == gameModes['obstacle']) {
		for (var yi = 0; yi < 50; yi++) {
			for (var xi = 0; xi < 50; xi++) {
				if (proposedX == xi && proposedY == yi) {
					return false;
				}
			}
		}
	}

	return true;
}

function resetVariables() {
	writeLogMessage('===================');
	writeLogMessage('Reset all variables');
	writeLogMessage('===================');

	var now = Date.now()

	isRunning = false;
	clearInterval(updateLoop);

	timeAttackTimeElement.text('');

	foodArray.splice(0, foodArray.length);
	bugArray.splice(0, bugArray.length);

	tailLength = 1;
	tailArray = [];

	player.x = 20;
	player.y = 300;

	score = 0;

	lastFoodSpawn = null,
	lastBugSpawn = null;

	directionCurrent = directionRight;
	$(canvas).click(null);

	updateScoreDisplay(now, null);
}