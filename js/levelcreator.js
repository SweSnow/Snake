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

	this.pointer = new Pointer(240, 290);
}

LevelCreator.prototype = {
	update: function(now) {
		this.pointer.update(this);

		for (var i = 0; i < this.entities.length; i++) {
		//	entities[i].update();
		}
	},
	get: function(x, y) {
		return this.grid[x + (y * this.width)];
	},
	set: function(x, y, value) {
		this.grid[x + (y * this.width)] = value;

		this.entities = [];

		for(var y = 0, i = 0; y < this.height / this.tileSize; y++) {
			for(var x = 0; x < this.width / this.tileSize; x++, i++) {
				if (this.grid[i] == 1) {
					this.entities.push(new Obstacle(x * this.tileSize, y * this.tileSize));
				}
			}
		}

		console.log(this.grid);

	},
	copy: function() {
		return new Level(this.grid.slice(), this.width, this.height);
	},
	placeBlock: function() {
		var pointerX = this.pointer.x / this.tileSize;
		var pointerY = this.pointer.y / this.tileSize;

		if (this.get(pointerX, pointerY) == 0) {
			this.set(pointerX, pointerY, 1);
		} else {
			this.set(pointerX, pointerY, 0);
		}
	},
	mouseMove: function(e) {
		var canvasRect = htmlCanvas[0].getBoundingClientRect();

		this.pointer.x = Math.min(Math.max((Math.round((e.x - canvasRect.left - (this.tileSize / 2)) / this.tileSize)) * this.tileSize, 0), this.width - this.tileSize);
		this.pointer.y = Math.min(Math.max((Math.round((e.y - canvasRect.top - (this.tileSize / 2)) / this.tileSize)) * this.tileSize, 0), this.height - this.tileSize);
	},
	mouseClick: function(e) {
		this.placeBlock();
	},
	entities: [],
	directionLeft: 37,
	directionUp: 38,
	directionRight: 39,
	directionDown: 40
};