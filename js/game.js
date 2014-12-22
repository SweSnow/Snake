'use strict';
/*
	game.js is primarily a utility file
	with functions unbound from classes.
*/

function Game(container, gameMode, tiles, master) {

	this.master = master;

	if (gameMode == 'normal') {

		this.gameOptions = GameOptions.Default;

		var player1 = new Player(20, 220, 20, 20, {
			left: 37,
			up: 38,
			right: 39,
			down: 40,
		}, '#009688', '#4DB6AC');
		var player2 = new Player(20, 300, 20, 20,{
			left: 65,
			up: 87,
			right: 68,
			down: 83,
		}, '#FF5722', '#FF8A65');

		this.level = new Level(
				tiles, 20, 600, 500,
				Date.now(), -1, [player1, player2],
				this.gameOptions, this);
			
		this.level.end = this.end;

		this.level.update();

		document.onkeydown = this.level.handleKeyDown.bind(this.level);

		this.resume();

	} else if (gameMode == 'create') {

		this.level = new LevelCreator(
				Level.createDefaultLevel(600, 500, 20), 20, 600, 500,
				Date.now(), this);
			
		this.level.update();

		var level = this.level;

		this.updateLoop = setInterval(function() {
			level.update();
		}, 16);

		window.addEventListener('mousemove', level.mouseMove.bind(this.level));
		window.addEventListener('click', level.mouseClick.bind(this.level));
	}

	

}

Game.prototype = {
	resume: function() {

		var level = this.level;
		var gameOptions = this.gameOptions;

		var self = this;
		this.updateLoop = setInterval(function() {
			console.log('tick', self);
			level.update();
		}, gameOptions.updateInterval);

	},
	pause: function() {
		clearInterval(this.updateLoop);
	},
	end: function(message) {
		this.pause();
		this.master.end(message);
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
