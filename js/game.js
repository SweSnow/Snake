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


	/*

	switch (gameMode) {
		case gameOptions.modeNormal: 

			spawnRandomFood();
			updateScoreDisplay(null, null);

			foodSpawnLoop = setInterval(spawnRandomFood, 5000);
			bugSpawnLoop = setInterval(determineSpawnRandomBug, 12000);

		break;
		
		case gameOptions.modeObstacles:

			spawnRandomFood();
			updateScoreDisplay(null, null);

			foodSpawnLoop = setInterval(spawnRandomFood, 5000);
			bugSpawnLoop = setInterval(determineSpawnRandomBug, 12000);

		break;

		default: 
			spawnRandomFood();
			updateScoreDisplay(null, null);

			foodSpawnLoop = setInterval(spawnRandomFood, 5000);
			bugSpawnLoop = setInterval(determineSpawnRandomBug, 12000);

		break;

	}

	*/

	
}

function end() {

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

function die() {
	alert("DIE");
}