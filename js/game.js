'use strict';
/*
	game.js is primarily a utility file
	with functions unbound from classes.
*/

function Game(container, gameMode) {

	if (gameMode == 'normal') {

		this.level = new Level(
				defaultLevel(600, 500, 20), 20, 600, 500,
				Date.now(), 60000, new Player(20, 300, 20, 20));
			
			this.level.update(Date.now());

			this.updateLoop = setInterval(function() {
				level.update(Date.now());
			}, 50);


	} else if (gameMode == 'create') {

		this.level = new LevelCreator(
				defaultLevel(600, 500, 20), 30, 600, 500,
				Date.now(), this);
			
			this.level.update(Date.now());

			this.updateLoop = setInterval(function() {
				level.update(Date.now());
			}, 16);
	}

	document.onkeydown = this.level.handleKeyDown.bind(this.level);
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

	},
	end: function() {
		this.resetVariables();
	},
	resetVariables: function() {
		this.isRunning = false;

	clearInterval(updateLoop);

	timeAttackTimeElement.text('');

	$(htmlCanvas).click(null);
	},
	createDefaultLevel: function(_width, _height, tileSize) {
	return (function() {
		var array = [];

		var width = _width / tileSize;
		var height = _height / tileSize;

		var max = width * height;

		for (var i = 0; i < max; i++) {
			array[i] = 0;
		}

		return array;

	})();
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
