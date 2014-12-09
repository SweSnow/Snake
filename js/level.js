'use strict';
/*
	level.js contains the master level objects
	which houses all entities all children. It
	manages maps.
*/

function Level(grid, tiles, width, height, startTime, gameMode, player) {
	this.grid = grid;
	this.tiles = tiles;
	this.width = width;
	this.height = height;
	this.startTime = startTime;
	this.gameMode = gameMode;
	this.player = player;

	this.entities = [];
	this.tileSize = width / tiles;

	this.score(0, true);
}

Level.prototype = {
	update: function(now) {
		isRunning = true;

		if (this.gameMode == gameModes['normal']) {

			var timeRemaining = this.gameMode.maxTime - (now - this.startTime);
			if (timeRemaining > 0) {
				timeAttackTimeElement.text(Math.floor(timeRemaining / 1000) + 's');
			} else {
				end('Time ran out :(');
			}
		}

		//We update player first separately
		this.player.update(now, this);
		this.player.render();

		//Update all entites (food, bug, obstacles)
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(now, this);
			if (this.entities[i])
				this.entities[i].render();
		}

		//Manage bug and food spawn
		if (now - this.lastFoodSpawn > Food.prototype.duration || this.lastFoodSpawn == null) {
			this.spawnRandomFood(true, this);
		}

		if (this.lastBugSpawn == null) {
			this.lastBugSpawn = now;
		} else {
			if (now - this.lastBugSpawn > Bug.prototype.duration) {
				this.spawnRandomBug(this);
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
	},
	handleKeyDown: function(e) {
		e = e || window.event;
   		var code = e.keyCode || e.which;

   		/*

   		if (code == 32 || code == 13) {
	   		if (gameOptions.gameMode == gameModes['createmap']) {
	   			e.preventDefault();

	    		placeBlock();
	    	}
	   	}
*/

	    if (code > 36 && code < 41) {

	    	e.preventDefault();

	    	if (canTurn(code, this.player.directionLastUsed, this.player)) {
	    		this.player.directionCurrent = code;
	    	}
	  	}

	},
	spawnRandomFood: function(logLastSpawn, level) {

		if (logLastSpawn) {
			this.lastFoodSpawn = Date.now();
		}

		var spot = getEmptySpot(level);
		var food = new Food(spot.x, spot.y, Date.now());

		this.entities.push(food);
	},
	spawnRandomBug: function(level) {
		
		this.lastBugSpawn = Date.now();

		var spot = getEmptySpot(level);
		var bug = new Bug(spot.x, spot.y, Date.now());

		this.entities.push(bug);


		//writeLogMessage('Spawned bug at (' + bug.x + ', ' + bug.y + ')');
	},
	lastFoodSpawn: null,
	lastBugSpawn: null,
	scoreAmount: 0,
	score: function(amount, override) {
		if (override) {
			this.scoreAmount = amount;
		} else {
			this.scoreAmount += amount;
		}

		scoreTextElement.text(this.scoreAmount + ' Points');
	}
};

//This is the base levels which only contains zeroes
function defaultLevel(_width, _height, tileSize) {
	return (function() {
		var array = [];

		var width = _width / tileSize;
		var height = _height / tileSize;

		var max = width * height;

		for (var i = 0; i < max; i++) {
			array[i] = 0;
		}

		return array;

	})();
}