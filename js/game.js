'use strict';

function Game(container, gameMode, tiles, master) {

	this.master = master;
	this.gameMode = gameMode;

	this.gameOptions = GameOptions.Default;

	var player1 = new Player(20, 220, 20, 20, {
		left: 37,
		up: 38,
		right: 39,
		down: 40,
	}, '#009688', '#4DB6AC');
//	var player2 = new Player(20, 300, 20, 20,{
//		left: 65,
//		up: 87,
//		right: 68,
//		down: 83,
//	}, '#FF5722', '#FF8A65');

	this.level = new Level(
			tiles, 20, 600, 500,
			Date.now(), -1, [player1/*, player2*/],
			this.gameOptions, this);
		
	this.level.end = this.end;
	this.level.update();

	this._keydown = this.level.handleKeyDown.bind(this.level);

	keyboard.listen();
	this.resume();

}

Game.prototype = {
	resume: function() {

		var level = this.level;
		var gameOptions = this.gameOptions;

		var self = this;
		this.updateLoop = setInterval(function() {
			level.update();
		}, gameOptions.updateInterval);

		if (this.gameMode === 'normal') {
			keyboard.listen();
		}

		window.addEventListener('keydown', this._keydown);

	},
	pause: function() {
		clearInterval(this.updateLoop);
		keyboard.cancel();

		window.removeEventListener('keydown', this._keydown);
	},
	end: function(message) {
		this.pause();
		this.master.end(message);
	},
	die: function() {
		this.level.die();
	}
}