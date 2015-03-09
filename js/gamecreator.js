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
	this._keydown = this.level.keyDown.bind(this.level);

	window.addEventListener('mousemove', this._mousemove);
	window.addEventListener('mouseup', this._mouseup);
	window.addEventListener('mousedown', this._mousedown);
	window.addEventListener('keydown', this._keydown);
}

GameCreator.prototype = {
	resume: function() {
		window.addEventListener('mousemove', this._mousemove);
		window.addEventListener('mouseup', this._mouseup);
		window.addEventListener('mousedown', this._mousedown);
		window.addEventListener('keydown', this._keydown);
	},
	pause: function() {
		window.removeEventListener('mousemove', this._mousemove);
		window.removeEventListener('mouseup', this._mouseup);
		window.removeEventListener('mousedown', this._mousedown);
		window.removeEventListener('keydown', this._keydown);
		},
	end: function() {
		this.pause();
		this.level.end();
	},
	enableGameInput: function() {
		window.addEventListener('keydown', this._keydown);
	},
	disableGameInput: function() {
		window.removeEventListener('keydown', this._keydown);
	},
	clearMap: function() {
		this.level.clearMap();
	}
}