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
	get: function(x, y) {
		for (var i = 0; i < this.entities.length; i++) {
			if (this.entities[i].x == x && this.entities[i].y == y) {
				return 1;
			}
		}
		return 0;
	},
	set: function(x, y, value) {
		if (value == 1) {
			this.entities.push(new Obstacle(x, y));
		} else if (value == 0) {
			for (var i = 0; i < this.entities.length; i++) {
				if (this.entities[i].x == x && this.entities[i].y == y) {
					this.entities[i].die();
					this.entities.splice(this.entities.indexOf(this.entities[i]), 1);
				}
			}
		}
	},
	copy: function() {
		return new Level(this.grid.slice(), this.width, this.height);
	},
	placeBlock: function() {
		var pointerX = this.pointer.x;
		var pointerY = this.pointer.y;

		if (this.get(pointerX, pointerY) == 0) {
			this.set(pointerX, pointerY, 1);
		}
	},
	removeBlock: function() {
		var pointerX = this.pointer.x;
		var pointerY = this.pointer.y;

		if (this.get(pointerX, pointerY) == 1) {
			this.set(pointerX, pointerY, 0);
		}
	},
	mouseMove: function(e) {
		var canvasRect = htmlCanvas[0].getBoundingClientRect();

		this.pointer.x = Math.min(Math.max((Math.round((e.x - canvasRect.left - (this.tileSize / 2)) / this.tileSize)) * this.tileSize, 0), this.width - this.tileSize);
		this.pointer.y = Math.min(Math.max((Math.round((e.y - canvasRect.top - (this.tileSize / 2)) / this.tileSize)) * this.tileSize, 0), this.height - this.tileSize);
		
		this.pointer.update();

		if (this.lastMouse === 'down') {
			this.placeBlock();
		} else if (this.lastMouse === 'up') {
			this.removeBlock();
		}
	},
	mouseDown: function(e) {

		this.lastMouse = 'down';



		var canvasRect = htmlCanvas[0].getBoundingClientRect();
		if (e.x > canvasRect.left && e.x < canvasRect.right && e.y > canvasRect.top && e.y < canvasRect.bottom) {
			
		}
	},
	mouseUp: function(e) {

		this.lastMouse = 'up';

		var canvasRect = htmlCanvas[0].getBoundingClientRect();
		if (e.x > canvasRect.left && e.x < canvasRect.right && e.y > canvasRect.top && e.y < canvasRect.bottom) {
			this.placeBlock();		
		}

	},
	entities: [],
	directionLeft: 37,
	directionUp: 38,
	directionRight: 39,
	directionDown: 40,
};