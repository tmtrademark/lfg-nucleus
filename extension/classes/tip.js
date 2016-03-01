'use strict';

const Note = require('./note.js');
const numeral = require('numeral');

module.exports = class Tip extends Note {
	constructor(options) {
		super(options);
		this.type = 'tip';
		this.amount = options.amount || 0;
		this.currency = options.currency || '$';
		this.formattedAmount = numeral(parseFloat(this.amount)).format(`${this.currency}0,0[.]00`);
		this.comment = options.comment || '';
		this.email = options.email || '';
		this.top = options.top || null;
	}
};
