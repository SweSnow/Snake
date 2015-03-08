'use strict';

function GameCreator(container, gameMode, tiles, master) {

	this.master = master;
	this.gameMode = gameMode;

	this.level = new LevelCreator(
			Level.createDefaultLevel(600, 500, 20), 20, 600, 500,
			Date.now(), this);

	this._mousemove = this.level.mouseMove.bind(this.level);
	this._mouseup = this.level.mouseUp.bind(this.level)
	this._mousedown = this.level.mouseDown.bind(this.level);

	window.addEventListener('mousemove', this._mousemove);
	window.addEventListener('mouseup', this._mouseup);
	window.addEventListener('mousedown', this._mousedown);
}

GameCreator.prototype = {
	resume: function() {
		window.addEventListener('mousemove', this._mousemove);
		window.addEventListener('mouseup', this._mouseup);
		window.addEventListener('mousedown', this._mousedown);
	},
	pause: function() {
		window.removeEventListener('mousemove', this._mousemove);
		window.removeEventListener('mouseup', this._mouseup);
		window.removeEventListener('mousedown', this._mousedown);
		},
	end: function() {
		this.pause();
		this.level.end();
	},
	clearMap: function() {
		this.level.clearMap();
	}
}