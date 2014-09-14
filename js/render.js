/*
	renderer.js handles all rendering and
	contains only the function draw() for
	now. Rendering utility functions
	are welcome.
*/

function draw() {
	/*
	var now = Date.now();

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

	if (gameOptions.gameMode == gameModes['obstacle'] || gameOptions.gameMode == gameModes['createmap']) {
		ctx.fillStyle = tileColor;

		for (var yi = 0; yi < gameOptions.canvasWidth / player.size; yi++) {
			for (var xi = 0; xi < gameOptions.canvasHeight / player.size; xi++) {
				if (gameOptions.gameMode.level.get(xi, yi) == 1) {
					ctx.fillRect(xi * player.size, yi * player.size, player.size, player.size);
				}
			}
		}
	}

	requestAnimationFrame(draw);
	*/
}