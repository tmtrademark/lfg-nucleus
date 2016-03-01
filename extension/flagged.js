'use strict';

const clone = require('clone');

module.exports = function (nodecg, nucleus) {
	const flaggedNotes = nodecg.Replicant('flaggedNotes', {defaultValue: []});

	nodecg.listenFor('acceptFlaggedNote', id => {
		const note = clone(find(id));
		if (note) {
			remove(id);
			delete note.flagged;
			delete note.flagReason;
			nucleus.emitNote(note, false);
			nodecg.sendMessage('flaggedNoteAccepted', id);
		}
	});

	nodecg.listenFor('rejectFlaggedNote', id => {
		remove(id);
		nodecg.sendMessage('flaggedNoteRejected', id);
	});

	nodecg.listenFor('clearFlaggedNotes', () => {
		flaggedNotes.value = [];
	});

	/**
	 * Adds a note to the flaggedNotes replicant.
	 * @param note {Note} The note to add.
	 */
	function add(note) {
		note = clone(note);
		flaggedNotes.value.push(note);
		nodecg.sendMessage('flaggedNote', note);
	}

	/**
	 * Removes a note from the flaggedNotes replicant.
	 * @param id {String} The UUID of the note to remove.
	 */
	function remove(id) {
		for (let i = flaggedNotes.value.length - 1; i >= 0; i--) {
			if (flaggedNotes.value[i].id === id) {
				flaggedNotes.value.splice(i, 1);
			}
		}
	}

	/**
	 * Finds a note with a given ID in the flaggedNotes replicant.
	 * @param id {String} The UUID to search for.
	 * @returns {Note|undefined}
	 */
	function find(id) {
		let note;
		flaggedNotes.value.some(flaggedNote => {
			if (flaggedNote.id === id) {
				note = flaggedNote;
				return true;
			}

			return false;
		});
		return note;
	}

	return {
		add,
		remove,
		find
	};
};
