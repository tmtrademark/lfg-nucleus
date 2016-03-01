'use strict';

const semver = require('semver');
const integrations = {
	'lfg-siphon': '~0.3.0',
	'lfg-streamtip': '~0.0.1',
	'lfg-sublistener': '^2.0.0'
};

module.exports = function (nodecg, nucleus) {
	const bundles = require('../../../../lib/bundles');

	Object.keys(integrations).forEach(bundleName => {
		const bundle = bundles.find(bundleName);
		if (!bundle) {
			return;
		}

		const targetRange = integrations[bundleName];
		if (semver.satisfies(bundle.version, targetRange)) {
			require(`./${bundleName}`)(nodecg, nucleus);
			nodecg.log.info(`Listening to ${bundleName}`);
		} else {
			nodecg.log.error(`The installed version of ${bundleName} is ${bundle.version}, ` +
			`but lfg-nucleus supports ${bundleName}@${targetRange}`);
			nodecg.log.error(`${bundleName} integration will not be enabled`);
		}
	});
};
