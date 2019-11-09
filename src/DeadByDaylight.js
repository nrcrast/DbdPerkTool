const SteamApp = require('./SteamApp.js');

class DeadByDaylight extends SteamApp {

	constructor() {
		super(381210);
	}
}

module.exports = new DeadByDaylight();