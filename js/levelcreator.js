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
	exportMap: function() {
		for (var y = 0; y < this.height; y += this.tileSize){
			for (var x = 0; x < this.width; x += this.tileSize) {
				this.grid.push(this.get(x, y));
			}
		}
		return this.grid;
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
	toggleBlock: function() {
		if (this.get(this.pointer.x, this.pointer.y) == 1) {
			this.removeBlock();
		} else {
			this.placeBlock();
		}
	},
	mouseMove: function(e) {
		var canvasRect = htmlCanvas[0].getBoundingClientRect();

		this.pointer.x = Math.min(Math.max((Math.round((e.x - canvasRect.left - (this.tileSize / 2)) / this.tileSize)) * this.tileSize, 0), this.width - this.tileSize);
		this.pointer.y = Math.min(Math.max((Math.round((e.y - canvasRect.top - (this.tileSize / 2)) / this.tileSize)) * this.tileSize, 0), this.height - this.tileSize);
		
		this.pointer.update();

		if (this.mode == this.modeAdd) {
			this.placeBlock();
		} else if (this.mode == this.modeDelete) {
			this.removeBlock();
		}
	},
	mouseDown: function(e) {
		if (this.insideCanvas(e)) {
			if (this.get(this.pointer.x, this.pointer.y) == 1) {
				this.mode = this.modeDelete;
				this.removeBlock();
			} else {
				this.mode = this.modeAdd;
				this.placeBlock();
			}
		}
	},
	mouseUp: function(e) {
		this.mode = this.modeNone;
	},
	keyDown: function(e) {
		switch (keyboard.mapKey(e.which)) {
			case 'up':
				if (this.pointer.y > 0) {
					this.pointer.y -= this.tileSize;
				}
				e.preventDefault();
				break;
			case 'left':
				if (this.pointer.x > 0) {
					this.pointer.x -= this.tileSize;
				}
				e.preventDefault();
				break;
			case 'down':
				if (this.pointer.y < (this.height - this.tileSize)) {
					this.pointer.y += this.tileSize;
				}
				e.preventDefault();
				break;
			case 'right':
				if (this.pointer.x < (this.width - this.tileSize)) {
					this.pointer.x += this.tileSize;
				}
				e.preventDefault();
				break;
			case 'enter':
				this.toggleBlock();
				e.preventDefault();
				break;
			case 'space':
				this.toggleBlock();
				e.preventDefault();
				break;
		}
		this.pointer.update();
	},
	insideCanvas: function(e) {
		var canvasRect = htmlCanvas[0].getBoundingClientRect();
		return (e.x > canvasRect.left && e.x < canvasRect.right && e.y > canvasRect.top && e.y < canvasRect.bottom);
	},
	die: function() {
		this.end();
	},
	end: function() {
		this.entities.forEach(function(e) {
			e.remove();
		});
		this.entities.splice(0, this.entities.length);
	},
	clearMap: function() {
		this.entities.forEach(function(e) {
			e.remove();
		});
		this.entities.splice(0, this.entities.length);
	},
	entities: [],
	directionLeft: 37,
	directionUp: 38,
	directionRight: 39,
	directionDown: 40,
	modeNone: -1,
	modeAdd: 1,
	modeDelete: 0,
	mode: this.modeNone,
};