/* global Polymer */
(function () {
	'use strict';

	var sendBtn = document.getElementById('send');

	var template = document.querySelector('template[is=dom-bind]');
	template.async(function init() {
		template.removeEventListener('dom-change', init);

		/* Due to the data binding we do between the tabs and the visibility of the input fields,
		 * the "selected" property of #tabs is actually undefined when the page first loads, which
		 * causes both sets of inputs to display simultaneously. To fix this, we default to "0" on page load.
		 */
		document.getElementById('tabs').selected = 0;

		var flaggedList = document.getElementById('flaggedList');
		var flagged = nodecg.Replicant('flaggedNotes');
		flagged.on('change', function (oldVal, newVal) {
			pruneList(flaggedList, flagged);

			newVal.forEach(function (note) {
				var noteEl = new window.ListNote(note);
				noteEl.flagged = true;
				addToListIfNotPresent(flaggedList, noteEl);
			});
		});

		var recentList = document.getElementById('recentList');
		var history = nodecg.Replicant('history');
		history.on('change', function (oldVal, newVal) {
			pruneList(recentList, history, true);

			newVal.slice(0).reverse().forEach(function (note) {
				if (!note.read) {
					var noteEl = new window.ListNote(note);
					addToListIfNotPresent(recentList, noteEl);
				}
			});
		});

		sendBtn.addEventListener('click', function () {
			var name = document.getElementById('name').value;
			var type = document.getElementById('tabs').selected === 0 ? 'subscription' : 'tip';
			var months = document.getElementById('months').value;
			var amount = document.getElementById('amount').value;

			var noteOpts = {
				name: name,
				type: type,
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
		});
	});

	function addToListIfNotPresent(list, node) {
		var listChildren = list.getContentChildren('#content');
		var found = listChildren.some(function (child) {
			return child.id === node.id;
		});

		if (!found) {
			Polymer.dom(list).appendChild(node);
		}
	}

	function pruneList(list, replicant, removeRead) {
		var listChildren = list.getContentChildren('#content');
		listChildren.forEach(function (child) {
			var read = false;
			var found = replicant.value.some(function (note) {
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
	}
})();
