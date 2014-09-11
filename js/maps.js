function Level(grid, width, height) {
	this.grid = grid;
	this.width = width;
	this.height = height;
}

Level.prototype = {
	get: function(x, y) {
		return this.grid[x + (y * this.width)];
	},
	set: function(x, y, value) {
		this.grid[x + (y * this.width)] = value;
	},
	copy: function() {
		return new Level(this.grid.slice(), this.width, this.height);
	}
};

var defaultLevel = new Level(
	(function() {
		var array = [];

		var width = gameOptions.canvasWidth / player.size;
		var height = gameOptions.canvasHeight / player.size;

		var max = width * height;

		for (var i = 0; i < max; i++) {
			array[i] = 0;
		}	

		return array;

	})(),
	gameOptions.canvasWidth / player.size,
	gameOptions.canvasHeight / player.size
);