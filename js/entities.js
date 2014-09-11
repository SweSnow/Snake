function Food(x, y, spawnDate){
	this.x = x;
	this.y = y;
	this.spawnDate = spawnDate || Date.now();

	this.element = this.template.copy();
	this.css('top', y + 'px');
	this.css('left', x + 'px');

	htmlCanvas.appendChild(this.element);
}

Food.prototype = {
	update: function(time) {
	 	if(time - this.spawnDate > this.duration) {
	 		this.die();
	 	}
	},
	duration: 5000,
	die: function() {
		this.$element.remove();
	},
	eat: function() {
		score += value;
		this.die();
	},
	template: $('<div class="g_food"></div>'),
	value: 10
}

function Bug(x, y, spawnDate) {
	this.x = x;
	this.y = y;
	this.spawnDate = spawnDate || Date.now();

	this.element = this.template.copy();
	this.css('top', y + 'px');
	this.css('left', x + 'px');

	htmlCanvas.appendChild(this.element);
}

Bug.prototype = {
	update: function(time) {
	 	if(time - this.spawnDate > this.duration) {
	 		this.die();
	 	}
	},
	duration: 7000,
	die: function() {
		this.$element.remove();
	},
	eat: function() {
		score += maxValue - (Math.floor((Date.now() - spawnDate)
		 * 100));

		this.die();
	},
	template: $('<div class="g_bug"></div>'),
	maxValue: 70
}

function Player(x, y) {
	this.x = x;
	this.y = y;

	this.element = this.template.copy();
	this.css('top', y + 'px');
	this.css('left', x + 'px');

	htmlCanvas.appendChild(this.element);
}

Bug.prototype = {
	update: function(time) {
	 	if(time - this.spawnDate > this.duration) {
	 		this.die();
	 	}
	},
	duration: 7000,
	die: function() {
		this.$element.remove();
	},
	eat: function() {
		score += maxValue - (Math.floor((Date.now() - spawnDate)
		 * 100));

		this.die();
	},
	template: $('<div class="g_bug"></div>'),
	maxValue: 70
}