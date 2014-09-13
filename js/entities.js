function Food(x, y, width, height, spawnDate){
	this.x = x;
	this.y = y;
	this.spawnDate = spawnDate || Date.now();

	this.element = this.template.copy();
	this.css('top', y + 'px');
	this.css('left', x + 'px');
	this.css('width', width + 'px');
	this.css('height', height + 'px');

	htmlCanvas.appendChild(this.element);
}

Food.prototype = {
	update: function(time, level) {
	 	if (time - this.spawnDate > this.duration) {
	 		this.die();
	 	}

	 	if (level.player.x == this.x && level.player.y == this.y) 
	 		this.eat(level);
		}

	},
	duration: 5000,
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
	template: $('<div class="g_food"></div>'),
	value: 10
}



function Obstacle(x, y, width, height) {
	this.x = x;
	this.y = y;

	this.element = this.template.copy();
	this.css('top', y + 'px');
	this.css('left', x + 'px');
	this.css('width', width + 'px');
	this.css('height', height + 'px');

	htmlCanvas.appendChild(this.element);
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
	this.css('top', y + 'px');
	this.css('left', x + 'px');
	this.css('width', width + 'px');
	this.css('height', height + 'px');

	htmlCanvas.appendChild(this.element);
}

Bug.prototype = {
	update: function(time, level) {
	 	if(time - this.spawnDate > this.duration) {
	 		this.die();
	 	}

			score += scorePlus;
			updateScoreDisplay(now, scorePlus);
			tailLength++;

			bugArray.splice(i, 1);
		}

	},
	duration: 7000,
	die: function() {
		this.$element.remove();
	},
	eat: function() {
		score += maxValue - (Math.floor((Date.now() - spawnTime)
		 * 100));

		this.die();
	},
	template: $('<div class="g_bug"></div>'),
	maxValue: 70
}



function Player(x, y, width, height) {
	this.x = x;
	this.y = y;

	this.element = this.template.copy();
	this.css('top', y + 'px');
	this.css('left', x + 'px');
	this.css('width', width + 'px');
	this.css('height', height + 'px');

	htmlCanvas.appendChild(this.element);

	this.tailLength = 0;
}

Player.prototype = {
	update: function(time, level) {
		//Logic for not turning 180 deg
		if (directionCurrent == directionLeft) {
			this.x -= this.moveDistance;
			if (this.x < 0) {
				this.x = gameOptions.canvasWidth - Level.tileSize;
			}
		} else if (directionCurrent == directionUp) {
			this.y -= this.moveDistance;
			if (this.y < 0) {
				this.y = gameOptions.canvasHeight - this.tileSize;
			}
		} else if (directionCurrent == directionRight) {
			this.x += this.moveDistance;
			if (this.x >= gameOptions.canvasWidth) {
				this.x = 0;
			}
		} else if (directionCurrent == directionDown) {
			this.y += this.moveDistance;
			if (this.y >= gameOptions.canvasHeight) {
				this.y = 0 ;
			}
		}

		directionLastUsed = directionCurrent;

		var tailCoordinates = {
			x: this.x,
			y: this.y
		}

		this.tailArray.push(tailCoordinates);

		//Let's splice the tailArray so it doesn't always get longer
		this.tailArray.splice(0, this.tailArray.length - this.tailLength - 1);

		//Checking tail collision
		for (var i = 0; i < tailLength; i++) {
			if (
				this.x == this.tailArray[this.tailArray.length - i - 1].x &&
				this.y == this.tailArray[this.tailArray.length - i - 1].y) {
				end('Collided with tail');
			}
		}

	},
	die: function() {
		end();
	},
	tailArray: [],
	template: $('<div class="g_player"></div>')
}