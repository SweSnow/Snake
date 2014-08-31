$(document).ready(function() {
	
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');

	gameOptions.canvasHeight = canvas.height;
	gameOptions.canvasWidth = canvas.width;

	writeLogMessage('Hello World!');

	$(".game-button").click(function() {
		$('#start-overlay').css('display', 'none');

		var $this = $(this);
		initialize($this.data('game-mode'));
	});

	$('#game-over-restart').click(function() {
		$('#start-overlay').css('display', 'block');
		$('#game-over-overlay').css('display', 'none');
	});

	timeAttackTimeElement = $('#time-attack-time');

});

function updateScoreDisplay(timeMs, points) {
	$('#score').text('SCORE: ' + score.toString());
	if (points != null) {
		writeLogMessage('+' + points + ' Score!')
	}
}

function writeLogMessage(text) {

	var log = $('#log');
	log.append($('<div>' + ' - ' + text + '</div>'));

	var logNormal = document.querySelector('#log')
	logNormal.scrollTop = logNormal.scrollHeight;

}