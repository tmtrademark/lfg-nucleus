(function () {
	'use strict';

	Polymer({
		is: 'list-note',

		properties: {
			type: {
				type: String,
				reflectToAttribute: true
			},
			note: {
				type: Object,
				observer: '_noteChanged'
			}
		},

		_noteChanged(note) {
			this.type = note.type;
			this.name = note.name;
			this.id = note.id;
			this.profileUrl = note.profileUrl || false;
			this.flagged = typeof note.flagged === 'undefined' ? false : note.flagged;
			this.timestamp = note.timestamp;

			if (note.type === 'tip') {
				this.amount = note.amount;
				this.formattedAmount = note.formattedAmount;
				this.comment = note.comment;
			} else if (note.type === 'subscription') {
				this.resub = note.resub;
				this.months = note.months;
			}

			if (note.flagged) {
				this.comment = note.flagReason;
			}

			// Set this last so the computed bindings have everything they need.
			this.type = note.type;
		},

		_computeLabel(type) {
			if (type === 'tip') {
				return this.formattedAmount;
			}

			if (type === 'subscription') {
				return this.resub ? `x${this.months}` : 'NEW';
			}

			return type;
		},

		accept() {
			nodecg.sendMessage('acceptFlaggedNote', this.id);
		},

		reject() {
			nodecg.sendMessage('rejectFlaggedNote', this.id);
		},

		dismiss() {
			nodecg.sendMessage('markRead', this.id);
		}
	});
})();
