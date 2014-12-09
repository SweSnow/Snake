'use strict';
(function() {
	function hash(string) {
		var hash = 0, i, chr, len;
		if (string.length == 0) return hash;
		for (i = 0, len = string.length; i < len; i++) {
			chr   = string.charCodeAt(i);
			hash  = ((hash << 5) - hash) + chr;
			hash |= 0; // Convert to 32bit integer
		}
		return hash;
	}

	var user = {
		name: 'John Rapp',
		username: 'johnrapp',
		loggedIn: true,
		generatePassword: function(username, password) {
			return hash(username + password);
		}
	};
	Object.defineProperty(user, 'loggedOut', {
		get: function() {
			return !this.loggedIn;
		}
	});

	define('user', function() {
		return user;
	});

})();