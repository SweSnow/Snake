'use strict';
/*
	entities.js contains all entities in the
	game (food, bug, obstacle, playerand tail).
*/

function Food(x, y, spawnDate, gameOptions){
	this.x = x;
	this.y = y;
	this.spawnDate = spawnDate;
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
	 	
	 	for (var i = 0; i < level.players.length; i++) {
	 		if (level.players[i].x == this.x && level.players[i].y == this.y) 
	 			this.eat(level, level.players[i]);
	 	}

	},
	die: function(level) {

		var element = this.element
		level.entities.splice(level.entities.indexOf(this), 1);
		
		element.css('transition', 'all 400ms');
		element.css('opacity', '0.0');

		var self = this;

		setTimeout(function() {
			self.element.remove();
		}, 400);

	},
	eat: function(level, player) {
		this.die(level);

		level.score(this.value, false)
		player.tailLength += level.gameOptions.food.grow;

		var hasFoundFood = false;
		var i = 0;

		while (!hasFoundFood && i < level.entities.length) {
			if (level.entities[i].template == this.template) {
				hasFoundFood = true;
			}
			i++;
		}

		if (!hasFoundFood) {
			level.spawnRandomFood(false);
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
	remove: function() {
		this.element.remove();
	},
	duration: 5000,
	template: $('<paper-shadow z="1" class="g_food"></paper-shadow>'),
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
	update: function(time, level) {
	 	//Checking tile collision
	 	for (var i = 0; i < level.players.length; i++) {
			if (level.players[i].x == this.x &&
				level.players[i].y == this.y) {
				level.game.end('Collided with obstacle');
			}
	 		
	 	}
	},
	die: function() {
		this.element.remove();
	},
	remove: function() {
		this.element.remove();
	},
	template: $('<div class="g_obstacle"></div>'),
	width: 20,
	height: 20
}



function Bug(x, y, spawnTime, gameOptions) {
	this.x = x;
	this.y = y;
	this.spawnTime = spawnTime;
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
	 	} else {
	 		for (var i = 0; i < level.players.length; i++) {
		 		if (this.x == level.players[i].x && this.y == level.players[i].y) {
		 			this.eat(time, level, level.players[i]);
	 			}
	 		}
		}

	},
	die: function(level) {
		
		var element = this.element;
		level.entities.splice(level.entities.indexOf(this), 1);

		element.css('transition', 'all 400ms');
		element.css('opacity', '0.0');

		var self = this;

		setTimeout(function() {
			element.remove();
		}, 400);
	},
	eat: function(time, level, player) {
		var scorePlus = Math.max(this.maxValue -
			(Math.floor((time - this.spawnTime) / 100)), 10);
		level.score(scorePlus, false)

		player.tailLength += Math.max(Math.round(level.gameOptions.bug.grow * (scorePlus / this.maxValue)), 1);

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
	remove: function() {
		this.element.remove();
	},
	template: $('<paper-shadow z="1" class="g_bug"></paper-shadow>'),
	duration: 7000,
	interval: 14000,
	maxValue: 70,
	width: 20,
	height: 20
}



function Player(x, y, width, height, directions, color, tailColor) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.tailColor = tailColor;

	this.element = Player.prototype.template.clone();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', this.width + 'px');
	this.element.css('height', this.height + 'px');
	this.element.css('background', color);

	htmlCanvas.append(this.element);

	this.directionLeft = directions.left;
	this.directionRight = directions.right;
	this.directionDown = directions.down;
	this.directionUp = directions.up;

	this.acceptedKeys = [this.directionLeft, this.directionDown, this.directionUp, this.directionRight]

	this.tailLength = 0;
	this.tailArray = [];
}

Player.prototype = {
	update: function(time, level) {

		if (!(	this.propsedDirection == this.directionLeft 
				&& this.directionCurrent == this.directionRight
			||	this.propsedDirection == this.directionUp 
				&& this.directionCurrent == this.directionDown
			||	this.propsedDirection == this.directionRight 
				&& this.directionCurrent == this.directionLeft
			||	this.propsedDirection == this.directionDown 
				&& this.directionCurrent == this.directionUp)) {

					this.directionCurrent = this.propsedDirection;
		}

		if (this.tailLength != 0) {
			var tail = new Tail(this.x, this.y, this.tailColor);
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

		for (var i = 0; i < level.players.length; i++) {
			if (level.players[i] != this) {
				if (this.x == level.players[i].x &&
					this.y == level.players[i].y) {
					level.game.end('Collided with other player');
				}
			}
		}

		//Checking tail collision
		this.tailArray.forEach(function(tail) {
			tail.update(level);
		}, this);

	},
	render: function() {
		this.element.css('top', this.y + 'px');
		this.element.css('left', this.x + 'px');
	},
	remove: function() {
		this.element.remove();
	},
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

function AI(x, y, width, height, color, tailColor) {
	this.x = x;
	this.y = y;
	this.width = width;
	this.height = height;
	this.tailColor = tailColor;

	this.element = AI.prototype.template.clone();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', this.width + 'px');
	this.element.css('height', this.height + 'px');
	this.element.css('background', color);

	htmlCanvas.append(this.element);

	this.tailLength = 0;
	this.tailArray = [];
}

AI.prototype = {
	update: function(time, level) {

		var food = level.entities
		.filter(function(entity) {
			return entity instanceof Food || entity instanceof Bug;
		})
		// .sort(function(a, b) {
		// 	return this.distanceTo(b) - this.distanceTo(a);
		// }.bind(this));

		if(food.length > 0) {
			var closest = food[0],
			distX = closest.x - this.x,
			distY = closest.y - this.y;

			if(Math.abs(distX) > Math.abs(distY)) {
				if(distX > 0 && this.directionCurrent != this.directionRight && this.directionCurrent != this.directionLeft) {
					if(this.canMove(this.directionRight)) {
						this.directionCurrent = this.directionRight;
					}
				} else {
					if(this.canMove(this.directionLeft)) {
						this.directionCurrent = this.directionLeft;
					}
				}
			} else if(this.directionCurrent != this.directionUp && this.directionCurrent != this.directionDown) {
				if(distY > 0) {
					if(this.canMove(this.directionDown)) {
						this.directionCurrent = this.directionDown;
					}
				} else {
					if(this.canMove(this.directionUp)) {
						this.directionCurrent = this.directionUp;
					}
				}
			}
		}


		if (this.tailLength != 0) {
			var tail = new Tail(this.x, this.y, this.tailColor);
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

		for (var i = 0; i < level.players.length; i++) {
			if (level.players[i] != this) {
				if (this.x == level.players[i].x &&
					this.y == level.players[i].y) {
					level.game.end('Collided with other player');
				}
			}
		}

		//Checking tail collision
		this.tailArray.forEach(function(tail) {
			tail.update(level);
		}, this);

	},
	render: function() {
		this.element.css('top', this.y + 'px');
		this.element.css('left', this.x + 'px');
	},
	remove: function() {
		this.element.remove();
	},
	distanceTo: function(entity) {
		// return Math.abs(entity.x - this.x) + Math.abs(entity.y - this.y);
		var dx = entity.x - this.x, dy = entity.y - this.y;
		return dx*dx + dy*dy;
	},
	canMove: function(propsedDirection) {
		return !(propsedDirection == this.directionLeft 
				&& this.directionCurrent == this.directionRight
			||	propsedDirection == this.directionUp 
				&& this.directionCurrent == this.directionDown
			||	propsedDirection == this.directionRight 
				&& this.directionCurrent == this.directionLeft
			||	propsedDirection == this.directionDown 
				&& this.directionCurrent == this.directionUp);
	},
	acceptedKeys: [],
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
};

function Tail(x, y, color) {
	this.x = x;
	this.y = y;

	this.element = Tail.prototype.template.clone();
	this.element.css('top', y + 'px');
	this.element.css('left', x + 'px');
	this.element.css('width', this.width + 'px');
	this.element.css('height', this.height + 'px');
	this.element.css('background-color', color);
	htmlCanvas.append(this.element);
}

Tail.prototype = {
	update: function(level) {
	 	//Checking tile collision
	 	for (var i = 0; i < level.players.length; i++) {
			if (level.players[i].x == this.x &&
				level.players[i].y == this.y) {
				level.game.end('Collided with tail', level.scoreAmount);
			}
	 	}
	},
	die: function() {

		var element = this.element;

		element.css('transition', 'all 150ms');
		element.css('opacity', '0.0');

		setTimeout(function() {
			element.remove();
		}, 150);
		
	},
	remove: function() {
		this.element.remove();
	},
	template: $('<paper-shadow z="1" class="g_tail"></paper-shadow>'),
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
	update: function(level) {
		this.element.css('top', this.y + 'px');
		this.element.css('left', this.x + 'px');
	},
	remove: function() {
		this.element.remove();
	},
	template: $('<paper-shadow z="1" class="g_pointer"></paper-shadow>'),
	width: 20,
	height: 20
}