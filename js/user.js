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


	window.user = {
		generatePassword: function(username, password) {
			return hash(username + password);
		}
	}
})();



