function initialize(gameMode) {

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

function mouseDownEvent(event) {

	var x = Math.floor((event.offsetX) / 20);
	var y = Math.floor((event.offsetY) / 20);

	if (gameOptions.gameMode.level[x][y] == 1) {
		gameOptions.gameMode.level[x][y] = 0;
	} else {
		gameOptions.gameMode.level[x][y] = 1;
	}
}