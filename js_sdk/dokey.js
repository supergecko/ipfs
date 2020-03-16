import random from 'random.js';
const key = 'lVHtuCOfgXffjNQt';
export default {	
	secretdate: function() {
		var timestamp = new Date().getTime();
		var nonce = random.random_char(32);
		var data_for_sign = 'timestamp=' + timestamp + '&nonce=' + nonce;
		console.log('timestamp: ' + timestamp);
		console.log('nonce: ' + nonce);
		console.log('secretdate:' + data_for_sign);
		return data_for_sign;
	},
	getkey : function () {
	    return key;
	}	
}
