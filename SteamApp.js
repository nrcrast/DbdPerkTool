const {promisify} = require('util');
const Registry = require('winreg');
const fs = require('fs');
const vdf = require('node-vdf');
const path = require('path');
const Steam = require('./Steam.js');

const readFileAsync = promisify(fs.readFile);

class SteamApp {

	constructor(appId) {
		this.APP_ID = appId;
	}

	async getInstallPath() {
		const gameFolders = await Steam.getLibraryFolders();
		console.log(gameFolders);
		for(var i = 0; i < gameFolders.length; i++) {
			const gameFilePath = path.resolve(`${gameFolders[i]}`,`steamapps/appmanifest_${this.APP_ID}.acf`);

			if(fs.existsSync(gameFilePath)) {
				const acfText = await readFileAsync(gameFilePath, 'utf8');
				const acfData = vdf.parse(acfText);
				const installDir = acfData.AppState.installdir;
				return path.resolve(gameFolders[i], 'steamapps/common/', installDir);
			}
		}
		throw Error('Game not found');
	}
};

module.exports = SteamApp;