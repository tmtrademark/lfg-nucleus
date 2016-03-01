'use strict';

const Tip = require('../classes/tip');

module.exports = function (nodecg, nucleus) {
	let monthTop = 0;
	let dayTop = 0;

	const donCorleone = nodecg.extensions['lfg-doncorleone'];

	donCorleone.on('initialized', data => {
		monthTop = data.totals.month_top;
		dayTop = data.totals.day_top;
	});

	donCorleone.on('gotDonations', data => {
		data.Completed.forEach(donation => {
			let top = null;

			if (donation.amount > dayTop) {
				dayTop = donation.amount;
				top = 'daily';
			}

			if (donation.amount > monthTop) {
				monthTop = donation.amount;
				top = 'monthly';
			}

			nucleus.emitNote(new Tip({
				name: donation.twitch_username,
				timestamp: donation.utos * 1000, // Convert seconds to milliseconds
				amount: donation.amount,
				comment: donation.note,
				email: donation.pp_payer_email,
				top
			}));
		});

		monthTop = data.totals.month_top;
		dayTop = data.totals.day_top;
	});
};
