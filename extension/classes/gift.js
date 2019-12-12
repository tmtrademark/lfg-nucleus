'use strict';

const Note = require('./note.js');

module.exports = class Gift extends Note {
	constructor(options) {
		super(options);
		this.type = 'gift';
		this.channel = options.channel || '';
		this.giftSubCount = options.giftSubCount || 0;
		this.profileUrl = `https://twitch.tv/${options.name}`;
		this.recipient = options.recipient || "";
		this.mystery = Boolean(options.mystery);
	}
};
