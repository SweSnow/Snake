function Level(grid, tiles, width, height, startTime, gameMode, player) {
	this.grid = grid;
	this.tiles = tiles;
	this.width = width;
	this.height = height;
	this.startTime = startTime;
	this.gameMode = gameMode;
	this.player = player;

	this.tileSize = width / tiles;
}

Level.prototype = {
	update: function(now) {
		isRunning = true;

		if (this.gameMode == gameModes['normal']) {

			var timeRemaining = this.maxTim - (now - this.startTime);
			if (timeRemaining > 0) {
				timeAttackTimeElement.text(Math.floor(timeRemaining / 1000) + 's');
			} else {
				end('Time ran out :(');
			}
		}

		//Update all entites (player, food, bug, obstacles)
		entities.foreach(function(entity) {
			entity.update(now, this);
		});

		//Manage bug and food spawn
		if (now - this.lastFoodSpawn > Food.prototype.duration || this.lastFoodSpawn == null) {
			spawnRandomFood(true);
		}

		if (this.lastBugSpawn == null) {
			this.lastBugSpawn = now;
		} else {
			if (now - this.lastBugSpawn > Bug.prototype.duration) {
				spawnRandomBug();
			}	
		}
	},
	get: function(x, y) {
		return this.grid[x + (y * this.width)];
	},
	set: function(x, y, value) {
		this.grid[x + (y * this.width)] = value;
	},
	copy: function() {
		return new Level(this.grid.slice(), this.width, this.height);
	}
	entities: [],
	spawnRandomFood: function(logLastSpawn) {

		if (logLastSpawn) {
			lastFoodSpawn = Date.now();
		}

		var spot = getEmptySpot();
		var food = new Food(spot.x, spot.y, Date.now());

		entities.push(food);

		writeLogMessage('Spawned food at (' + food.x + ', ' + food.y + ')');
	},
	spawnRandomBug: function() {
		var spot = getEmptySpot();
		var food = new Food(spot.x, spot.y, Date.now());

		writeLogMessage('Spawned bug at (' + bug.x + ', ' + bug.y + ')');
	},
	lastFoodSpawn: null,
	lastBugSpawn: null
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