'use strict';
/*
	level.js contains the master level objects
	which houses all entities and children. It
	alsomanages maps.
*/

/* Constructor for level
	@param grid 		Grid preferably created by Game.createDefaultLevel
	@param tilesSize 	Pixel size of each tile in the grid
	@param width 		Pixel width of game container
	@param height 		Pixel height of game container
	@param startTime 	Date in unix standard time
	@param timeLimit 	Time limit for the game, set as -1 for infinite
	@param player 		Player object, create this before initializing Level
*/

function Level(grid, tileSize, width, height, startTime, timeLimit, player) {
	this.grid = grid;
	this.tileSize = tileSize;
	this.width = width;
	this.height = height;
	this.startTime = startTime;
	this.timeLimit = timeLimit;
	this.player = player;

	this.score(0, true);
}

Level.prototype = {
	update: function(now) {
		isRunning = true;

		//Time based
		if (this.timeLimit != -1) {
			var timeRemaining = this.timeLimit - (now - this.startTime);
			if (timeRemaining > 0) {
				timeAttackTimeElement.text(Math.floor(timeRemaining / 1000) + 's');
			} else {
				this.end('Time ran out :(');
			}
		}
		

		//We update player first separately, it renders itself
		this.player.update(now, this);

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
			if (now - this.lastBugSpawn > Bug.prototype.interval) {
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

	    if (code > 36 && code < 41) {

	    	e.preventDefault();

	    	//Art
			if (!(	code == this.player.directionLeft 
					&& this.player.directionCurrent == this.player.directionRight
				||	code == this.player.directionUp 
					&& this.player.directionCurrent == this.player.directionDown
				||	code == this.player.directionRight 
					&& this.player.directionCurrent == this.player.directionLeft
				||	code == this.player.directionDown 
					&& this.player.directionCurrent == this.player.directionUp)) {
				this.player.directionCurrent = code;
			}
	  	}

	},
	spawnRandomFood: function(logLastSpawn, level) {

		if (logLastSpawn) {
			this.lastFoodSpawn = Date.now();
		}

		var spot = this.getEmptySpot(level);
		var food = new Food(spot.x, spot.y, Date.now());

		this.entities.push(food);
	},
	spawnRandomBug: function(level) {
		
		this.lastBugSpawn = Date.now();

		var spot = this.getEmptySpot(level);
		var bug = new Bug(spot.x, spot.y, Date.now());

		this.entities.push(bug);
	},
	lastFoodSpawn: null,
	lastBugSpawn: null,
	scoreAmount: 0,
	entities: [],
	getEmptySpot: function() {
		while(true) {
			var proposedX = Math.floor(Math.random() * this.width / this.tileSize) * this.tileSize;
			var proposedY = Math.floor(Math.random() * this.height / this.tileSize) * this.tileSize;

			if (this.isEmptySpot(proposedX, proposedY)) {
				return {
					x: proposedX,
					y: proposedY
				}
			}
		}
	},
	isEmptySpot: function(proposedX, proposedY) {
		for (var i = 0; i < this.entities.length; i++) {
			if (this.entities[i].x == proposedX && this.entities.y == proposedY) {
				return false;
			}
		}
		
		if (this.player.x == proposedX && this.player.y == proposedY)
			return false;

		for (var i = 0; i < this.player.tailArray.length; i++) {
			if (this.player.tailArray[i].x == proposedX && this.player.tailArray[i].y == proposedY) {
				return false;
			}
		}

		return true;
	},
	score: function(amount, override) {
		if (override) {
			this.scoreAmount = amount;
		} else {
			this.scoreAmount += amount;
		}

		scoreTextElement.text(this.scoreAmount + ' Points');
		gameOverScore.text('Score: ' + this.scoreAmount + ' Points');
	},
	end: function() {
		//TODO implement callback here
	}
};

extend(Level, {
	createDefaultLevel: function(_width, _height, tileSize) {
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
});