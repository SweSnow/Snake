function update() {
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
			updateScoreDisplay(Date.now(), foodPoints);

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
				(Math.floor((Date.now() - 
				bugArray[i].time) * 
				(maxBugScore / bugMaxScore)));

			score += scorePlus;
			updateScoreDisplay(Date.now(), scorePlus);
			tailLenght++;

			bugArray.splice(i, 1);
		}
	}

	//Checking tail collision
	for (var i = 0; i < tailLenght; i++) {
		if (
			player.x == tailArray[tailArray.length - i - 1].x &&
			player.y == tailArray[tailArray.length - i - 1].y && i != 0) {
			die();
		}
	}

	if (Date.now() - lastFoodSpawn > gameOptions.foodSpawnRate) {
		spawnRandomFood();
	}

	if (Date.now() - lastBugSpawn > gameOptions.bugSpawnRate) {
		determineSpawnRandomBug();
	}

}

function draw() {
	ctx.clearRect(0, 0, gameOptions.canvasWidth, gameOptions.canvasHeight);

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

	requestAnimationFrame(draw);

}