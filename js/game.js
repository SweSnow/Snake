'use strict';
/*
	game.js is primarily a utility file
	with functions unbound from classes.
*/

function Game(container, gameMode) {

	$('#reset-button').css('display', 'block');

	gameOptions.gameMode = gameModes[gameMode];

	gameOptions.gameMode.init();

	document.onkeydown = gameOptions.gameMode.level.handleKeyDown.bind(gameOptions.gameMode.level);
}

Game.prototype = {
	handleKeyDown: function(e) {

		e = e || window.event;
   		var code = e.keyCode || e.which;

		if(!this.level.checkKey(e))
			this.level.player.checkKey(e);
	},
	resume: function() {

	},
	pause: function() {
		
	}
};

function checkKey(e) {

    e = e || window.event;
   	var code = (e.keyCode ? e.keyCode : e.which);

   	if (code == 32 || code == 13) {
   		if (gameOptions.gameMode == gameModes['createmap']) {
   			e.preventDefault();

    		placeBlock();
    	}
   	}

   	else player.checkKey(e);

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

function canTurn(from, to, player) {
	var canTurn = true;
	    	
	if (to == player.directionLeft && from == player.directionRight) {
		canTurn = false;
	}

	if (to == player.directionUp && from == player.directionDown) {
		canTurn = false;
	}

	if (to == player.directionRight && from == player.directionLeft) {
		canTurn = false;
	}

	if (to == player.directionDown && from == player.directionUp) {
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

function getEmptySpot(level) {
	while(true) {
		var proposedX = Math.floor(Math.random() * level.width / level.tileSize) * level.tileSize;
		var proposedY = Math.floor(Math.random() * level.height / level.tileSize) * level.tileSize;

		if (isEmptySpot(proposedX, proposedY, level)) {
			return {
				x: proposedX,
				y: proposedY
			}
		}
	}
}

function isEmptySpot(proposedX, proposedY, level) {

	for (var i = 0; i < level.entities.length; i++) {
		if (level.entities[i].x == proposedX && level.entities[i].y == proposedY) {
			return false;
		}
	}
	
	if (level.player.x == proposedX && level.player.y == proposedY)
		return false;

	for (var i = 0; i < level.player.tailArray.length; i++) {
		if (level.player.tailArray[i].x == proposedX && level.player.tailArray[i].y == proposedY) {
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

	var now = Date.now()

	isRunning = false;
	clearInterval(updateLoop);

	timeAttackTimeElement.text('');

	score = 0;

	$(htmlCanvas).click(null);

	//updateScoreDisplay(now, null);
}