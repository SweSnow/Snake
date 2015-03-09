'use strict';
/*
	level.js contains the master level objects
	which houses all entities and children. It
	also manages maps.
*/

/* Constructor for level
	@param grid 		Grid preferably created by Game.createDefaultLevel
	@param tilesSize 	Pixel size of each tile in the grid
	@param width 		Pixel width of game container
	@param height 		Pixel height of game container
	@param startTime 	Date in unix standard time
	@param timeLimit 	Time limit for the game, set as -1 for infinite
	@param players		Player objects, create this before initializing Level
	@param gameOptions	Objects containing used values for the session, validate with server
	@param game			Game object containing the level, useful for callbacks
*/

function Level(grid, tileSize, width, height, startTime, timeLimit, players, gameOptions, game) {
	this.grid = grid;
	this.tileSize = tileSize;
	this.width = width;
	this.height = height;
	this.startTime = startTime;
	this.timeLimit = timeLimit;
	this.players = players;
	this.gameOptions = gameOptions;
	this.game = game;

	this.time = startTime;
	this.timeRemaining = timeLimit;
	this.score(0, true);
	for (var i = 0; i < this.players.length; i++) {
		this.players[i].propsedDirection = this.players[i].directionRight;
	}

	for(var y = 0, i = 0; y < height / tileSize; y++) {
		for(var x = 0; x < width / tileSize; x++, i++) {
			if (grid[i] == 1) {
				this.entities.push(new Obstacle(x * tileSize, y * tileSize));
			}
		}
	}

}

Level.prototype = {
	update: function() {
		this.time += this.gameOptions.updateInterval;

		//Time based
		if (this.timeLimit != -1) {
			this.timeRemaining -= this.gameOptions.updateInterval;
			if (this.timeRemaining > 0) {
				this.game.master.$.timeAttackText.innerText = (Math.floor(this.timeRemaining / 1000) + 's');
			} else {
				this.game.end('Ran out of time', this.scoreAmount);
			}
		}
		

		//We update player first separately, it renders itself
		for (var i = 0; i < this.players.length; i++) {
			this.players[i].update(this.time, this);
			this.players[i].render();
		}

		//Update all entites (food, bug, obstacles)
		for (var i = 0; i < this.entities.length; i++) {
			this.entities[i].update(this.time, this);
		}
		
		//Manage bug and food spawn
		if (this.time - this.lastFoodSpawn > this.gameOptions.food.duration || this.lastFoodSpawn == null) {
			this.spawnRandomFood(true);
		}

		if (this.lastBugSpawn == null) {
			this.lastBugSpawn = this.time;
		} else {
			if (this.time - this.lastBugSpawn > Bug.prototype.interval) {
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

   		for (var i = 0; i < this.players.length; i++) {
   			if (this.players[i].acceptedKeys.indexOf(code) != -1) {
   				if (this.game.gameMode ==='normal') {
	   				e.preventDefault();
   					this.players[i].propsedDirection = code;
   				}
   			}
   		}
	},
	spawnRandomFood: function(logLastSpawn) {

		if (logLastSpawn) {
			this.lastFoodSpawn = this.time;
		}

		var spot = this.getEmptySpot(this);
		var food = new Food(spot.x, spot.y, this.time, this.gameOptions);

		this.entities.push(food);
	},
	spawnRandomBug: function(level) {
		
		this.lastBugSpawn = level.time;

		var spot = this.getEmptySpot(level);
		var bug = new Bug(spot.x, spot.y, level.time, level.gameOptions);

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
			if (this.entities[i].x == proposedX && this.entities[i].y == proposedY) {
				return false;
			}
		}
		
		for (var i = 0; i < this.players.length; i++) {
			if (this.players[i].x == proposedX && this.players[i].y == proposedY) {
				return false;
			}

			for (var j = 0; j < this.players[i].tailArray.length; j++) {
				if (this.players[i].tailArray[j].x == proposedX && this.players[i].tailArray[j].y == proposedY) {
					return false;
				}
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
	die: function() {
		function killAll(a) {
			a.remove();
		}

		this.players.forEach(function(p) {
			p.tailArray.forEach(killAll);
			p.tailArray.splice(0, p.tailArray.length);
		});
		this.players.forEach(killAll);
		this.entities.forEach(killAll);

		this.players.splice(0, this.players.length);
		this.entities.splice(0, this.entities.length);
	}
};

extend(Level, {
	createDefaultLevel: function(_width, _height, tileSize) {
		return (function() {
			var array = [];

			var width = _width / tileSize;
			var height = _height / tileSize;

			var max = width * height;

			return array;

		})();
	}
});