function update() {

	isRunning = true;
	//Date.now() is kinda epensive so we cache it
	var now = Date.now();

	if (gameOptions.gameMode != gameModes['create']) {

		if (directionCurrent == directionLeft) {
			player.x -= player.moveDistance;
			if (player.x < 0) {
				player.x = gameOptions.canvasWidth - player.size;
			}
		} else if (directionCurrent == directionUp) {
			player.y -= player.moveDistance;
			if (player.y < 0) {
				player.y = gameOptions.canvasHeight - player.size;
			}
		} else if (directionCurrent == directionRight) {
			player.x += player.moveDistance;
			if (player.x >= gameOptions.canvasWidth) {
				player.x = 0;
			}
		} else if (directionCurrent == directionDown) {
			player.y += player.moveDistance;
			if (player.y >= gameOptions.canvasHeight) {
				player.y = 0 ;
			}
		}

		directionLastUsed = directionCurrent;

		//Setting up the tail
		var tailCoordinates = {
			x: player.x,
			y: player.y
		}

		tailArray.push(tailCoordinates);

		//Let's splice the tailArray so it doesn't always get longer
		tailArray.splice(0, tailArray.length - tailLenght - 1);

		//Calculating food
		for (var i = 0; i < foodArray.length; i++) {
			if (player.x == foodArray[i].x && player.y == foodArray[i].y) {
				foodArray.splice(i, 1);

				score += foodPoints;
				tailLenght++;
				updateScoreDisplay(now, foodPoints);

				if (foodArray.length == 0) {
					spawnRandomFood();
					writeLogMessage('No food on canvas, spawn new');
				}
			}
		}

		//And now for the bugs
		for (var i = 0; i < bugArray.length; i++) {
			if (player.x == bugArray[i].x && player.y == bugArray[i].y) {

				var scorePlus = 
					maxBugScore - 
					(Math.floor((now - 
					bugArray[i].time) * 
					(maxBugScore / bugMaxScore)));

				score += scorePlus;
				updateScoreDisplay(now, scorePlus);
				tailLenght++;

				bugArray.splice(i, 1);
			}
		}

		//Checking tail collision
		for (var i = 0; i < tailLenght; i++) {
			if (
				player.x == tailArray[tailArray.length - i - 1].x &&
				player.y == tailArray[tailArray.length - i - 1].y && i != 0) {
				end();
			}
		}

		if (now - lastFoodSpawn > gameOptions.foodSpawnRate) {
			spawnRandomFood();
		}

		if (now - lastBugSpawn > gameOptions.bugSpawnRate) {
			determineSpawnRandomBug();
		}

		if (gameOptions.gameMode == gameModes['normal']) {
			//User is playing time attack, let's display the time
			timeAttackTimeElement.text(Math.floor((now - timeAttackStartTime) / 1000) + 's');
		}
	}
}

function draw() {
	ctx.clearRect(0, 0, gameOptions.canvasWidth, gameOptions.canvasHeight);

	if(!isRunning) return;

	if (gameOptions.gameMode != gameModes['create']) {

		//Food
		ctx.fillStyle = foodColor;
		for (var i = 0; i < foodArray.length; i++) {
			ctx.fillRect(foodArray[i].x, foodArray[i].y, foodSize, foodSize);
		}

		//Bugs
		ctx.fillStyle = bugColor;
		for (var i = 0; i < bugArray.length; i++) {
			ctx.fillRect(bugArray[i].x, bugArray[i].y, foodSize, foodSize);
		}

		var step = (snakeMaxColor - snakeMinColor) / tailLenght;

		//Snake
		for (var i = 0; i < tailLenght; i++) {

			ctx.fillStyle = rgbColorFormatter(Math.floor(snakeMaxColor - (i * step)));
			ctx.fillRect(tailArray[tailArray.length - i - 1].x, tailArray[tailArray.length - i - 1].y, player.size, player.size);
		}
	} else {
		//Map stuff
	}

	requestAnimationFrame(draw);
}