'use strict';

const uuid = require('uuid');

module.exports = class Note {
	constructor(options) {
		this.name = options.name || 'Anonymous';
		this.timestamp = options.timestamp || Date.now();
		this.id = uuid.v4();
		this.read = false;
	}
};
