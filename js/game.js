function initialize(gameMode) {

	document.onkeydown = checkKey;
	function checkKey(e) {

	    e = e || window.event;
	   	var code = (e.keyCode ? e.keyCode : e.which);

	   	if (code == 32 || code == 13) {
	   		if (gameOptions.gameMode == gameModes['createmap']) {
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

	gameOptions.gameMode = gameModes[gameMode];
	gameOptions.gameMode.init();

	requestAnimationFrame(draw);

}

function end() {
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

}

function placeBlock() {

	var pointerX = gameOptions.gameMode.pointer.x / player.size;
	var pointerY = gameOptions.gameMode.pointer.y / player.size;

	if (gameOptions.gameMode.level[pointerX][pointerY] == 0) {
		gameOptions.gameMode.level[pointerX][pointerY] = 1;
	} else {
		gameOptions.gameMode.level[pointerX][pointerY] = 0;
	}
}

function mouseDownEvent(event) {

	var x = Math.floor((event.offsetX) / 20);
	var y = Math.floor((event.offsetY) / 20);

	if (gameOptions.gameMode.level[x][y] == 1) {
		gameOptions.gameMode.level[x][y] = 0;
	} else {
		gameOptions.gameMode.level[x][y] = 1;
	}
}