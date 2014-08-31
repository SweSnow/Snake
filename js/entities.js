function spawnRandomFood() {

	lastFoodSpawn = Date.now();

	var proposedX = Math.floor(Math.random() * gameOptions.canvasWidth / 10) * 10;
	var proposedY = Math.floor(Math.random() * gameOptions.canvasHeight / 10) * 10;

	var canSpawn = true;

	for (var i = 0; i < tailLenght; i++) {
		if (tailArray[tailArray.length - i - 1].x == proposedX && tailArray[tailArray.length - i - 1].y == proposedY) {
			canSpawn = false;
		}
	}

	for (var i = 0; i < bugArray.length; i++) {
		if (bugArray[i].x == proposedX && bugArray[i].y == proposedY) {
			canSpawn = false;
		}
	}


	if (gameOptions.gameMode == gameModes['obstacle']) {
		for (var yi = 0; yi < 50; yi++) {
			for (var xi = 0; xi < 50; xi++) {
				if (proposedX == xi && proposedY == yi) {
					canSpawn = false;
				}
			}
		}
	}

	if (canSpawn) {

		var food = {
			x: proposedX,
			y: proposedY,
		}

		foodArray.push(food);

		setTimeout(function() {
			for (var i = 0; i < foodArray.length; i++) {
				if (foodArray[i] == food) {
					foodArray.splice(i, 1);
				}
			}
		}, 10000);

		writeLogMessage('Spawned food at (' + proposedX + ', ' + proposedY + ')');

	} else {
		spawnRandomFood();
	}
}

function determineSpawnRandomBug() {
	if (Math.random() > 0.5) {
		//50% chance

		var proposedX = Math.floor(Math.random() * gameOptions.canvasWidth / 10) * 10;
		var proposedY = Math.floor(Math.random() * gameOptions.canvasWidth / 10) * 10;

		var canSpawn = true;

		for (var i = 0; i < tailLenght; i++) {
			if (tailArray[tailArray.length - i - 1].x == proposedX && tailArray[tailArray.length - i - 1].y == proposedY) {
				canSpawn = false;
			}
		}

		for (var i = 0; i < foodArray.length; i++) {
			if (foodArray[i].x == proposedX && foodArray[i].y == proposedY) {
				canSpawn = false;
			}
		}

		if (gameOptions.gameMode == gameModes['obstacle']) {
			for (var yi = 0; yi < 50; yi++) {
				for (var xi = 0; xi < 50; xi++) {
					if (proposedX == xi && proposedY == yi) {
						canSpawn = false;
					}
				}
			}
		}
	
		if (canSpawn) {

			lastBugSpawn = Date.now();

			var bug = {
				x: proposedX,
				y: proposedY,
				time: Date.now()
			};

			bugArray.push(bug);

			writeLogMessage('Spawned bug at (' + proposedX + ', ' + proposedY + ')');

			setTimeout(function() {
			for (var i = 0; i < bugArray.length; i++) {
				if (bugArray[i] == bug) {
					bugArray.splice(i, 1);
				}
			}
		}, 7000);

		} else {
			determineSpawnRandomBug();
		}

	} else {
		writeLogMessage('Bug spawn denied');
	}
}

function spawnObstacles() {

}