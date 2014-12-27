(function() {'use strict';

	var keys = {}, keyMap = {
		37: 'left',
		39: 'right',
		38: 'up',
		40: 'down',

		87: 'w',
		65: 'a',
		83: 's',
		68: 'd'
	};

	window.keys = keys;

	function listen() {
		window.addEventListener('keydown', onkeydown);
		window.addEventListener('keyup', onkeyup);
	}

	function cancel() {
		window.removeEventListener('keydown', onkeydown);
		window.removeEventListener('keyup', onkeyup);
	}

	function onkeydown(e) {
		if(keyMap.hasOwnProperty(e.which)) {
			keys[keyMap[e.which]] = 1;
			e.preventDefault();
		}
	}

	function onkeyup(e) {
		if(keyMap.hasOwnProperty(e.which)) {
			keys[keyMap[e.which]] = 0;
			e.preventDefault();
		}
	}

	function keydown(key) {
		return keys[key];
	}

	window.keyboard = {
		isDown: keydown,
		listen: listen,
		cancel: cancel
	};

})();