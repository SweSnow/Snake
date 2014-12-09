'use strict';

/* Constructor for level
	@param grid 		Grid preferably created by Game.createDefaultLevel
	@param tilesSize 	Pixel size of each tile in the grid
	@param width 		Pixel width of game container
	@param height 		Pixel height of game container
*/

function LevelCreator(grid, tileSize, width, height) {
	this.grid = grid;
	this.tileSize = tileSize;
	this.width = width;
	this.height = height;

	this.pointer = new Pointer(10, 10);
}

LevelCreator.prototype = {
	update: function(now) {
		isRunning = true;
		this.pointer.update();
	},
	get: function(x, y) {
		return this.grid[x + (y * this.width)];
	},
	set: function(x, y, value) {
		this.grid[x + (y * this.width)] = value;
	},
	copy: function() {
		return new Level(this.grid.slice(), this.width, this.height);
	},
	handleKeyDown: function(e) {
		e = e || window.event;
   		var code = e.keyCode || e.which;

   		if (code == 32 || code == 13) {
	   		if (gameOptions.gameMode == gameModes['createmap']) {
	   			e.preventDefault();

	    		this.placeBlock();
	    	}
	   	}


	    if (code > 36 && code < 41) {
	    	this.movePointer(code);
		}

	  	}

	},
	placeBlock: function() {
		var pointerX = this.pointer.x / this.tileSize;
		var pointerY = this.pointer.y / this.tileSize;

		if (this.level.get(pointerX, pointerY) == 0) {
			this.level.set(pointerX, pointerY, 1);
		} else {
			this.level.set(pointerX, pointerY, 0);
		}
	},
	movePointer: function (code) {

		switch(code) {
			case directionLeft:
				if (this.pointer.x != 0)
					this.pointer.x -= this.player.size;

			break
			case directionRight:
				if (this.pointer.x != this.width - this.player.size)
					this.pointer.x += this.player.size;

			break
			case directionUp:
				if (this.pointer.y != 0)
					this.pointer.y -= this.player.size;

			break
			case directionDown:
				if (this.pointer.y != this.width - this.player.size)
					this.pointer.y += this.player.size;

			break
		}
	},
	entities: [],
};