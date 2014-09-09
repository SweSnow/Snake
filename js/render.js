function update() {

	isRunning = true;
	//Date.now() is kinda expensive so we cache it
	var now = Date.now();

	//If we're not creating a map do all the player, food and bug work
	if (gameOptions.gameMode != gameModes['createmap']) {

		//Logic for not turning 180 deg
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
		tailArray.splice(0, tailArray.length - tailLength - 1);

		//Calculating food
		for (var i = 0; i < foodArray.length; i++) {
			if (player.x == foodArray[i].x && player.y == foodArray[i].y) {
				foodArray.splice(i, 1);

				score += foodPoints;
				tailLength++;
				updateScoreDisplay(now, foodPoints);

				if (foodArray.length == 0) {
					spawnRandomFood(false);
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
				tailLength++;

				bugArray.splice(i, 1);
			}
		}

		//Checking tail collision
		for (var i = 0; i < tailLength; i++) {
			if (
				player.x == tailArray[tailArray.length - i - 1].x &&
				player.y == tailArray[tailArray.length - i - 1].y &&
				i != 0) {
				end();
			}
		}

		//Checking tile collision
		if (gameOptions.gameMode == gameModes['obstacle']) {
			if (gameOptions.gameMode.level[player.x / player.size][player.y / player.size] == 1) {
				end();
			}
		}


		if (now - lastFoodSpawn > gameOptions.foodSpawnRate || lastFoodSpawn == null) {
			spawnRandomFood(true);
		}

		if (lastBugSpawn == null) {
			lastBugSpawn = now;
		} else {
			if (now - lastBugSpawn > gameOptions.bugSpawnRate) {
				determineSpawnRandomBug();
			}	
		}

		if (gameOptions.gameMode == gameModes['normal']) {
			//User is playing time attack, let's display the time
			var timeRemaining = timeAttackTimeLimit - (now - timeAttackStartTime);
			if (timeRemaining > 0) {
				timeAttackTimeElement.text(Math.floor(timeRemaining / 1000) + 's');
			} else {
				end();
			}
		}
	}
}

function draw() {

	var now = Date.now();

	ctx.clearRect(0, 0, gameOptions.canvasWidth, gameOptions.canvasHeight);

	if(!isRunning) return;

	if (gameOptions.gameMode != gameModes['createmap']) {

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

		var step = (snakeMaxColor - snakeMinColor) / tailLength;

		//Snake
		for (var i = 0; i < tailLength; i++) {

			ctx.fillStyle = rgbColorFormatter(Math.floor(snakeMaxColor - (i * step)));
			ctx.fillRect(tailArray[tailArray.length - i - 1].x, tailArray[tailArray.length - i - 1].y, player.size, player.size);
		}
	} else {
		//Map stuff
		if (now - gameOptions.gameMode.lastBlink > 1000 || true) {
		//	lastBlink = now - 250;
			ctx.beginPath();

			ctx.rect(
				gameOptions.gameMode.pointer.x,
				gameOptions.gameMode.pointer.y,
				player.size,
				player.size);

		    ctx.lineWidth = 1;
		    ctx.strokeStyle = '#ffffff';
		    ctx.stroke();

		}
	}

	if (gameOptions.gameMode == gameModes['obstacle'] || gameOptions.gameMode == gameModes['createmap']) {
		ctx.fillStyle = tileColor;

		for (var yi = 0; yi < gameOptions.canvasWidth / player.size; yi++) {
			for (var xi = 0; xi < gameOptions.canvasHeight / player.size; xi++) {
				if (gameOptions.gameMode.level[yi][xi] == 1) {
					ctx.fillRect(yi * player.size, xi * player.size, player.size, player.size);
				}
			}
		}
	}

	requestAnimationFrame(draw);
}