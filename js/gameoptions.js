function GameOptions(flag) {
	if (flag == this.Default) {
		this.food = new FoodOptions(10, 5000);
		this.bug = new BugOptions(50, 7000);
	}
}

GameOptions.prototype = {
	Default: 1
}

function FoodOptions(score, duration) {
	this.score = score;
	this.duration = duration;
}

function BugOptions(score, duration) {
	this.score = score;
	this.duration = duration;
}