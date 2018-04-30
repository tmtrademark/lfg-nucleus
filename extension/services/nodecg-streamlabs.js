'use strict';

const Tip = require('../classes/tip');

module.exports = function (nodecg, nucleus) {
	const streamlabs = nodecg.extensions['nodecg-streamlabs'];
	streamlabs.on('donation', tip => {
		nucleus.emitNote(new Tip({
			name: tip.name,
			timestamp: new Date.now(),
			amount: parseFloat(tip.amount.amount),
			comment: tip.message,
		}));
	});
};
