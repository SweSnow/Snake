'use strict';

/* Constructor for game
	@param container	Container HTML element
	@param gameMode		String indicating the used game mode, 'create' or 'normal'
	@param tiles 		Array with the map obstacles
	@param master		Master object, preferably duarte-game, useful for callbacks
	@param playerCount	Number indication number of players, 1 or 2 for now
	@param ai 			Boolean indicating use of AI player
	@param timeLimit 	Time limit for the game, set as -1 for infinite
*/

function Game(container, gameMode, tiles, master, playerCount, ai, timeLimit) {

	this.master = master;
	this.gameMode = gameMode;

	this.gameOptions = GameOptions.Default;

	var playerArray = [];

	var player1 = new Player(20, 220, 20, 20, {
	 	left: 37,
	 	up: 38,
	 	right: 39,
		down: 40,
	}, '#009688', '#4DB6AC');

	if(ai) {
		var aiPlayer = new AI(20, 300, 20, 20, '#FF5722', '#FF8A65');
		playerArray.push(aiPlayer);
	}

	playerArray.push(player1);

	if(playerCount == 2) {
		var player2 = new Player(20, 300, 20, 20,{
			left: 65,
			up: 87,
			right: 68,
			down: 83,
		}, '#FF5722', '#FF8A65');

		playerArray.push(player2);
	}

	this.level = new Level(
			tiles, 20, 600, 500,
			Date.now(), timeLimit, playerArray,
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