(function () {
	'use strict';

	const history = nodecg.Replicant('history');
	const flaggedNotes = nodecg.Replicant('flaggedNotes');

	Polymer({
		is: 'panel-body',

		properties: {
			selected: {
				type: Number,
				value: 0
			}
		},

		ready() {
			flaggedNotes.on('change', newVal => {
				this._pruneList(this.$.flaggedList, flaggedNotes);

				newVal.forEach(note => {
					const noteEl = document.createElement('list-note');
					noteEl.note = note;
					this._addToListIfNotPresent(this.$.flaggedList, noteEl);
				});
			});

			history.on('change', newVal => {
				console.log(newVal);
				this._pruneList(this.$.recentList, history, true);

				newVal.slice(0).reverse().forEach(note => {
					if (!note.read) {
						const noteEl = document.createElement('list-note');
						noteEl.note = note;
						this._addToListIfNotPresent(this.$.recentList, noteEl);
					}
				});
			});
		},

		_addToListIfNotPresent(list, node) {
			const listChildren = list.getContentChildren('#content');
			const found = listChildren.some(child => child.id === node.id);
			if (!found) {
				Polymer.dom(list).appendChild(node);
			}
		},

		_pruneList(list, replicant, removeRead) {
			const listChildren = list.getContentChildren('#content');
			listChildren.forEach(child => {
				let read = false;
				const found = replicant.value.some(note => {
					if (child.id === note.id) {
						read = note.read;
						return true;
					}

					return false;
				});

				if ((read && removeRead) || !found) {
					Polymer.dom(list).removeChild(child);
				}
			});
		},

		send() {
			const name = document.getElementById('name').value;
			const type = document.getElementById('tabs').selected === 0 ? 'subscription' : 'tip';
			const months = document.getElementById('months').value;
			const amount = document.getElementById('amount').value;

			const noteOpts = {
				name,
				type,
				timestamp: Date.now()
			};

			if (type === 'subscription') {
				if (months > 1) {
					noteOpts.resub = true;
					noteOpts.months = parseInt(months, 10);
				} else {
					noteOpts.resub = false;
				}
			} else if (type === 'tip') {
				noteOpts.amount = parseFloat(amount);
			} else {
				console.error('[lfg-nucleus] Invalid manual note type:', type);
				return;
			}

			nodecg.sendMessage('manualNote', noteOpts);
		},

		isUnread(note) {
			return !note.read;
		},

		newestFirst(a, b) {
			return b.timestamp - a.timestamp;
		}
	});
})();
