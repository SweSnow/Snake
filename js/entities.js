function spawnRandomFood(logLastSpawn) {

	//We don't want the delta timer to reset
	//when a forced (ie. picked up last food)
	//happends. 
	if (logLastSpawn) {
		lastFoodSpawn = Date.now();
	}

	//We come up with a X and Y coordinate and
	//checks if it works. If it doesn't we try
	//again
	var proposedX = Math.floor(Math.random() * gameOptions.canvasWidth / foodSize) * foodSize;
	var proposedY = Math.floor(Math.random() * gameOptions.canvasHeight / foodSize) * foodSize;

	var canSpawn = true;

	//Collides with other food?
	for (var i = 0; i < foodArray.length; i++) {
		if (foodArray[i].x == proposedX && foodArray[i].y == proposedY) {
			canSpawn = false;
		}
	}

	//Collides with bug?
	for (var i = 0; i < bugArray.length; i++) {
		if (bugArray[i].x == proposedX && bugArray[i].y == proposedY) {
			canSpawn = false;
		}
	}

	//Collides with tail?
	for (var i = 0; i < tailLenght; i++) {
		if (tailArray[tailArray.length - i - 1].x == proposedX && tailArray[tailArray.length - i - 1].y == proposedY) {
			canSpawn = false;
		}
	}

	//Collides with obstacles set by the level?
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
			y: proposedY
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
		spawnRandomFood(logLastSpawn);
	}
}

function determineSpawnRandomBug() {
	if (Math.random() > 0.5) {
		//50% chance

		var proposedX = Math.floor(Math.random() * gameOptions.canvasWidth / foodSize) * foodSize;
		var proposedY = Math.floor(Math.random() * gameOptions.canvasWidth / foodSize) * foodSize;

		var canSpawn = true;



		for (var i = 0; i < foodArray.length; i++) {
			if (foodArray[i].x == proposedX && foodArray[i].y == proposedY) {
				canSpawn = false;
			}
		}
		
		for (var i = 0; i < bugArray.length; i++) {
			if (bugArray[i].x == proposedX && bugArray[i].y == proposedY) {
				canSpawn = false;
			}
		}

		for (var i = 0; i < tailLenght; i++) {
			if (tailArray[tailArray.length - i - 1].x == proposedX && tailArray[tailArray.length - i - 1].y == proposedY) {
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