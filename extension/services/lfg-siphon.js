'use strict';

const Subscription = require('../classes/subscription');
const Gift = require('../classes/gift');
const Cheer = require('../classes/cheer');

module.exports = function (nodecg, nucleus) {
	const siphon = nodecg.extensions['lfg-siphon'];
	siphon.on('subscription', data => {
		nodecg.log.warn("Sub raw",data);
		months:
		nucleus.emitNote(new Subscription({
			name: data.username,
			channel: data.channel,
			resub: data.resub,
			months: data.months,
			timestamp: data.ts,
			message: data.message,
			method: data.method,
			recipient: data.recipient
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
	siphon.on( 'chat', chat => {
		if ( ! ( "ybot_" === chat.channel ) ) {
			return;
		}
		const parts = chat.message.split(' ', 2);
		const cmd = parts[0];
		const arg = parts.length > 1 ? parts[1] : null;
		switch( cmd ) {
			case '!tgs':
				nucleus.emitNote(new Gift({
					name: "ybot_",
					channel: "teawrex",
					giftSubCount: 2,
					timestamp: Date.now(),
					message: "",
					recipient: "",
					method: "",
					mystery: true
				}));
				nucleus.emitNote(new Subscription({
					name: "ybot_",
					channel: "teawrex",
					giftSubCount: 2,
					timestamp: Date.now(),
					message: "",
					recipient: "r1",
					method: "",
					mystery: false
				}));
				nucleus.emitNote(new Subscription({
					name: "ybot_",
					channel: "teawrex",
					giftSubCount: 2,
					timestamp: Date.now(),
					message: "",
					recipient: "r2",
					method: "",
					mystery: false
				}));
				break;
			default:
			//
		}
	});
};
