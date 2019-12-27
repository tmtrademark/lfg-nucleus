'use strict';

const Tip = require('../classes/tip');

module.exports = function (nodecg, nucleus) {
	const se = nodecg.extensions['nodecg-streamelements'];
	se.on('donation', tip => {
		nucleus.emitNote(new Tip({
			name: tip.name,
			timestamp: Date.now(),
			amount: parseFloat(tip.amount.amount),
			comment: tip.message,
		}));
	});
};
