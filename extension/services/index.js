'use strict';

module.exports = function (nodecg, nucleus) {
	if (Object(nodecg.extensions).hasOwnProperty('lfg-siphon')) {
		require('./siphon')(nodecg, nucleus);
		nodecg.log.info('Listening to lfg-siphon');
	}

	if (Object(nodecg.extensions).hasOwnProperty('lfg-streamtip')) {
		require('./streamtip')(nodecg, nucleus);
		nodecg.log.info('Listening to lfg-streamtip');
	}
};
