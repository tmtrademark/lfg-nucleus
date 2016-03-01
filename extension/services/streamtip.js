'use strict';

const Tip = require('../classes/tip');

module.exports = function (nodecg, nucleus) {
	const streamTip = nodecg.extensions['lfg-streamtip'];
	streamTip.on('tip', tip => {
		nucleus.emitNote(new Tip({
			name: tip.username,
			timestamp: new Date(tip.date).getTime(),
			amount: parseFloat(tip.amount),
			comment: tip.note,
			email: tip.email,
			top: tip.top
		}));
	});
};
