/*
	entities.js contains all entities in the
	game (food, bug, obstacle, playerand tail).
*/

function Food(x, y, width, height, spawnDate){
	this.x = x;
	this.y = y;
	this.spawnDate = spawnDate || Date.now();

	this.element = this.template.copy();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', width + 'px');
	this.element.css('height', height + 'px');

	htmlCanvas.append(this.element);
}

Food.prototype = {
	update: function(time, level) {
	 	if (time - this.spawnDate > this.duration) 
	 		this.die();
	 	
	 	if (level.player.x == this.x && level.player.y == this.y) 
	 		this.eat(level);

	},
	die: function(level) {
		level.entities.remove(this);
		this.$element.remove();
	},
	eat: function() {
		score += value;
		this.die();

		score += this.value;
		level.player.tailLength++;
		updateScoreDisplay(now, foodPoints);

		var hasFoundFood = false;
		var i = 0;

		while (!hasFoundFood && i < level.entites.length) {
			if (level.entities[i].template == this.template) {
				hasFoundFood = true;
			}
			i++;
		}

		if (hasFoundFood) {
			spawnRandomFood(false);
			writeLogMessage('No food on canvas, spawn new');
		}

	},
	duration: 5000,
	template: $('<div class="g_food"></div>'),
	value: 10
}



function Obstacle(x, y, width, height) {
	this.x = x;
	this.y = y;

	this.element = this.template.copy();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', width + 'px');
	this.element.css('height', height + 'px');

	htmlCanvas.append(this.element);
}

Obstacle.prototype = {
	update: function(player, level) {
	 	//Checking tile collision
		if (level.player.x == this.x &&
			level.player.y == this.y) {
			end('Collided with obstacle');
		}
	},
	die: function() {
		this.$element.remove();
	},
	template: $('<div class="g_obstacle"></div>'),
	value: 10
}



function Bug(x, y, width, height, spawnTime) {
	this.x = x;
	this.y = y;
	this.spawnTime = spawnTime || Date.now();

	this.element = this.template.copy();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', width + 'px');
	this.element.css('height', height + 'px');

	htmlCanvas.append(this.element);
}

Bug.prototype = {
	update: function(time, level) {
	 	if (time - this.spawnDate > this.duration) {
	 		this.die();
	 	} else if (this.x == level.player.x && this.y == level.player.y) {
	 		this.eat(time, level);

			

		}

	},
	duration: 7000,
	die: function(level) {
		level.entities.remove(this);
		this.$element.remove();
	},
	eat: function(time, level) {
		var scorePlus = this.maxValue -
			(Math.floor((time - this.spawnTime) * 100));
		score += scorePlus;

		updateScoreDisplay(now, scorePlus);
		level.player.tailLength++;

		this.die();
	},
	template: $('<div class="g_bug"></div>'),
	maxValue: 70
}



function Player(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.element = Player.prototype.template;
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', width + 'px');
	this.element.css('height', height + 'px');

	htmlCanvas.append(this.element);

	this.tailLength = 0;
}

Player.prototype = {
	update: function(time, level) {
		//Logic for not turning 180 deg
		if (this.directionCurrent == this.directionLeft) {
			this.x -= level.tileSize;
			if (this.x < 0) {
				this.x = level.width - level.tileSize;
			}
		} else if (this.directionCurrent == this.directionUp) {
			this.y -= level.tileSize;
			if (this.y < 0) {
				this.y = level.height - level.tileSize;
			}
		} else if (this.directionCurrent == this.directionRight) {
			this.x += level.tileSize;
			if (this.x >= level.width) {
				this.x = 0;
			}
		} else if (this.directionCurrent == this.directionDown) {
			this.y += level.tileSize;
			if (this.y >= level.height) {
				this.y = 0 ;
			}
		}
		this.directionLastUsed = this.directionCurrent;

		var tail = Tail(this.x, this.y, this.width, this.height);

		this.tailArray.push(tail);

		//if tailLength isn't the same as the actual length
		//we ate som food on the last food update
		//meaning we shouldn't splice te array
		if (this.tailLength <= this.tailArray.length)
			this.tailArray.splice(0, 1);

		//Checking tail collision
		this.tailArray.forEach(function(index) {
			this.tailArray[index].update();
		});

	},
	die: function() {
		end();
	},
	tailArray: [],
	template: $('<div class="g_player"></div>'),
	directionCurrent: 39,
	directionLastUsed: 39,
	directionLeft: 37,
	directionUp: 38,
	directionRight: 39,
	directionDown: 40

}



function Tail(x, y, width, height) {
	this.x = x;
	this.y = y;

	this.element = Tail.prototype.template;
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', width + 'px');
	this.element.css('height', height + 'px');

	htmlCanvas.append(this.element);
}

Tail.prototype = {
	update: function(player, level) {
	 	//Checking tile collision
		if (level.player.x == this.x &&
			level.player.y == this.y) {
			end('Collided with obstacle');
		}
	},
	die: function() {
		this.$element.remove();
	},
	template: $('<div class="g_tail"></div>'),
	value: 10
}