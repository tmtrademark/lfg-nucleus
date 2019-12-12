'use strict';

const Subscription = require('../classes/subscription');
const Gift = require('../classes/gift');
const Cheer = require('../classes/cheer');

module.exports = function (nodecg, nucleus) {
	const siphon = nodecg.extensions['lfg-siphon'];
	siphon.on('subscription', data => {
		nodecg.log.warn("Sub raw",data);
		nucleus.emitNote(new Subscription({
			name: data.username,
			channel: data.channel,
			resub: data.resub,
			months: data.months,
			timestamp: data.ts,
			message: data.message,
			method: data.method
		}));
	});

	siphon.on('cheer', data => {
		nucleus.emitNote(new Cheer({
			name: data.userstate['display-name'],
			amount: data.userstate.bits,
			message: data.message,
			channel: data.channel,
			timestamp: data.ts
		}));
	});
	siphon.on('submysterygift', data => {
		nodecg.log.warn("Sub Mystery raw", data);
		nucleus.emitNote(new Gift({
			name: data.username,
			channel: data.channel,
			giftSubCount: data.giftSubCount,
			timestamp: data.ts,
			message: data.message,
			recipient: "",
			method: data.method,
			mystery: true
		}));
	});
	siphon.on('subgift', data => {
		nodecg.log.warn("Sub Gift raw", data);
		nucleus.emitNote(new Gift({
			name: data.username,
			channel: data.channel,
			giftSubCount: 0,
			timestamp: data.ts,
			message: data.message,
			recipient: data.recipient,
			method: data.method,
			mystery: false
		}));
	});
};
