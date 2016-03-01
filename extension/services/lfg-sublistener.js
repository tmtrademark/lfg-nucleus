'use strict';

const Subscription = require('../classes/subscription');

module.exports = function (nodecg, nucleus) {
	const sublistener = nodecg.extensions['lfg-sublistener'];
	sublistener.on('subscription', data => {
		nucleus.emitNote(new Subscription({
			name: data.name,
			channel: data.channel,
			resub: data.resub,
			months: data.months,
			timestamp: data.timestamp
		}));
	});
};
