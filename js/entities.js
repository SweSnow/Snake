function spawnRandomFood(logLastSpawn) {

	if (!isRunning) return;

	//We don't want the delta timer to reset
	//when a forced (ie. picked up last food)
	//happends. 
	if (logLastSpawn) {
		lastFoodSpawn = Date.now();
	}

	var food = getEmptySpot();

	foodArray.push(food);

	setTimeout(function() {
		for (var i = 0; i < foodArray.length; i++) {
			if (foodArray[i] == food) {
				foodArray.splice(i, 1);
			}
		}
	}, 10000);

	writeLogMessage('Spawned food at (' + food.x + ', ' + food.y + ')');
}

function spawnRandomBug() {

	var now = Date.now();
	lastBugSpawn = now;

	// #perfmatters http://jsperf.com/sdsdgsdfg
	var bug = getEmptySpot();
	bug.time = now;

	bugArray.push(bug);

	setTimeout(function() {
		for (var i = 0; i < bugArray.length; i++) {
			if (bugArray[i] == bug) {
				bugArray.splice(i, 1);
			}
		}
	}, 7000);

	writeLogMessage('Spawned bug at (' + bug.x + ', ' + bug.y + ')');
}