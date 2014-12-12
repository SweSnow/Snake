'use strict';
/*
	entities.js contains all entities in the
	game (food, bug, obstacle, playerand tail).
*/

function Food(x, y, spawnDate, gameOptions){
	this.x = x;
	this.y = y;
	this.spawnDate = spawnDate || Date.now();
	this.value = gameOptions.food.score;
	this.duration = gameOptions.food.duration;

	this.element = Food.prototype.template.clone();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', this.width + 'px');
	this.element.css('height', this.height + 'px');

	htmlCanvas.append(this.element);
}

Food.prototype = {
	update: function(time, level) {
	 	if (time - this.spawnDate > this.duration) 
	 		this.die(level);
	 	
	 	if (level.player.x == this.x && level.player.y == this.y) 
	 		this.eat(level);

	},
	render: function() {
		this.element.css('top', this.y + 'px');
		this.element.css('left', this.x + 'px');
	},
	die: function(level) {
		level.entities.splice(level.entities.indexOf(this), 1);
		
		var element = this.element;

		element.css('transition', 'all 400ms');
		element.css('opacity', '0.0');

		setTimeout(function() {
			element.remove();
		}, 400);

	},
	eat: function(level) {
		this.die(level);

		level.score(this.value, false)
		level.player.tailLength++;

		var hasFoundFood = false;
		var i = 0;

		while (!hasFoundFood && i < level.entities.length) {
			if (level.entities[i].template == this.template) {
				hasFoundFood = true;
			}
			i++;
		}

		if (!hasFoundFood) {
			level.spawnRandomFood(false, level);
			//writeLogMessage('No food on canvas, spawn new');
		}

		var canvasRect = htmlCanvas[0].getBoundingClientRect();

		foodRipple[0].downAction({
			x: (this.x + canvasRect.left),
			y: (this.y + canvasRect.top)
		});

		setTimeout(function() {
			foodRipple[0].upAction();
		}, 200);


	},
	duration: 5000,
	template: $('<paper-shadow z="1" class="g_food"></div>'),
	value: 10,
	width: 20,
	height: 20
}



function Obstacle(x, y) {
	this.x = x;
	this.y = y;

	this.element = this.template.clone();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', this.width + 'px');
	this.element.css('height', this.height + 'px');

	htmlCanvas.append(this.element);
}

Obstacle.prototype = {
	update: function(player, level) {
	 	//Checking tile collision
		if (player.x == this.x &&
			player.y == this.y) {
			level.end('Collided with obstacle');
		}
	},
	render: function() {
		this.element.css('top', this.y + 'px');
		this.element.css('left', this.x + 'px');
	},
	die: function() {
		this.$element.remove();
	},
	template: $('<paper-shadow z="1" class="g_obstacle"></div>'),
	width: 20,
	height: 20
}



function Bug(x, y, spawnTime, gameOptions) {
	this.x = x;
	this.y = y;
	this.spawnTime = spawnTime || Date.now();
	this.value = gameOptions.bug.score;
	this.duration = gameOptions.bug.duration;

	this.element = this.template.clone();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', this.width + 'px');
	this.element.css('height', this.height + 'px');

	htmlCanvas.append(this.element);
}

Bug.prototype = {
	update: function(time, level) {
	 	if (time - this.spawnTime > this.duration) {
	 		this.die(level);
	 	} else if (this.x == level.player.x && this.y == level.player.y) {
	 		this.eat(time, level);
		}

	},
	render: function() {
		this.element.css('top', this.y + 'px');
		this.element.css('left', this.x + 'px');
	},
	die: function(level) {
		level.entities.splice(level.entities.indexOf(this), 1);

		var element = this.element;

		element.css('transition', 'all 400ms');
		element.css('opacity', '0.0');

		setTimeout(function() {
			element.remove();
		}, 400);

	},
	eat: function(time, level) {
		var scorePlus = this.maxValue -
			(Math.floor((time - this.spawnTime) / 100));
		level.score(scorePlus, false)

		level.player.tailLength++;

		this.die(level);

		var canvasRect = htmlCanvas[0].getBoundingClientRect();

		bugRipple[0].downAction({
			x: (this.x + canvasRect.left),
			y: (this.y + canvasRect.top)
		});

		setTimeout(function() {
			bugRipple[0].upAction();
		}, 200);
	},
	template: $('<paper-shadow z="1" class="g_bug"></div>'),
	duration: 7000,
	interval: 14000,
	maxValue: 70,
	width: 20,
	height: 20
}



function Player(x, y, width, height) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;

	this.element = Player.prototype.template.clone();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', this.width + 'px');
	this.element.css('height', this.height + 'px');

	htmlCanvas.append(this.element);

	this.tailLength = 0;
}

Player.prototype = {
	update: function(time, level) {

		if (this.tailLength != 0) {
			var tail = new Tail(this.x, this.y);
			this.tailArray.push(tail);
		}

		if (this.skipAnim) {
			this.element.css('transition', 'all 50ms');
		}

		this.skipAnim = false;

		//Logic for not turning 180 deg
		if (this.directionCurrent == this.directionLeft) {
			this.x -= level.tileSize;
			if (this.x < 0) {
				this.x = level.width - level.tileSize;
				this.skipAnim = true;
			}
		} else if (this.directionCurrent == this.directionUp) {
			this.y -= level.tileSize;
			if (this.y < 0) {
				this.y = level.height - level.tileSize;
				this.skipAnim = true;
			}
		} else if (this.directionCurrent == this.directionRight) {
			this.x += level.tileSize;
			if (this.x >= level.width) {
				this.x = 0;
				this.skipAnim = true;
			}
		} else if (this.directionCurrent == this.directionDown) {
			this.y += level.tileSize;
			if (this.y >= level.height) {
				this.y = 0 ;
				this.skipAnim = true;
			}
		}

		if (this.skipAnim) {
			this.element.css('transition', 'all 0ms');
		}

		this.render();

		this.directionLastUsed = this.directionCurrent;

		//if tailLength isn't the same as the actual length
		//we ate som food on the last food update
		//meaning we shouldn't splice the array
		if (this.tailLength < this.tailArray.length) {
			this.tailArray[0].die(level);
			this.tailArray.splice(0, 1);
		}

		//Checking tail collision
		this.tailArray.forEach(function(tail) {
			tail.update(this, level);
		}, this);

	},
	render: function() {
		this.element.css('top', this.y + 'px');
		this.element.css('left', this.x + 'px');
	},
	die: function(level) {
		level.end(level);
	},
	tailArray: [],
	template: $('<paper-shadow z="1" class="g_player"></paper-shadow>'),
	directionCurrent: 39,
	directionLastUsed: 39,
	directionLeft: 37,
	directionUp: 38,
	directionRight: 39,
	directionDown: 40,
	width: 20,
	height: 20,
	size: 20

}



function Tail(x, y) {
	this.x = x;
	this.y = y;

	this.element = Tail.prototype.template.clone();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', this.width + 'px');
	this.element.css('height', this.height + 'px');
	htmlCanvas.append(this.element);
}

Tail.prototype = {
	update: function(player, level) {
	 	//Checking tile collision
		if (level.player.x == this.x &&
			level.player.y == this.y) {
			level.end('Collided with obstacle');
		}
	},
	render: function() {
		this.element.css('top', this.y + 'px');
		this.element.css('left', this.x + 'px');
	},
	die: function() {

		var element = this.element;

		element.css('transition', 'all 150ms');
		element.css('opacity', '0.0');

		setTimeout(function() {
			element.remove();
		}, 150);
		
	},
	template: $('<paper-shadow z="1" class="g_tail"></div>'),
	value: 10,
	width: 20,
	height: 20
}



function Pointer(x, y) {
	this.x = x;
	this.y = y;

	this.element = Pointer.prototype.template.clone();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', this.width + 'px');
	this.element.css('height', this.height + 'px');
	htmlCanvas.append(this.element);
}

Pointer.prototype = {
	update: function() {
		this.element.css('top', y + 'px');
		this.element.css('left', x + 'px');
	},
	template: $('<paper-shadow z="1" class="g_pointer"></div>'),
	width: 20,
	height: 20
}