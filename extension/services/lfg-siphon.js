'use strict';

const Subscription = require('../classes/subscription');

module.exports = function (nodecg, nucleus) {
	const siphon = nodecg.extensions['lfg-siphon'];
	siphon.on('subscription', data => {
		nucleus.emitNote(new Subscription({
			name: data.username,
			channel: data.channel,
			resub: data.resub,
			months: data.months,
			timestamp: data.ts
		}));
	});
};
