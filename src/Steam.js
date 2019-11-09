const { promisify } = require('util');
const Registry = require('winreg');
const fs = require('fs');
const vdf = require('node-vdf');
const path = require('path');

const readFileAsync = promisify(fs.readFile);

function isNumeric(num) {
	return !isNaN(num)
}

class Steam {

	async getLibraryFolders() {
		const steamInstallPath = await this.getInstallPath();
		const libraryManifestFilePath = `${steamInstallPath}/steamapps/libraryfolders.vdf`;
		const manifestText = await readFileAsync(libraryManifestFilePath, 'utf8');
		const manifest = vdf.parse(manifestText);
		const folders = [path.resolve(`${steamInstallPath}`)];

		Object.keys(manifest.LibraryFolders).forEach((folder) => {
			if (isNumeric(folder)) {
				folders.push(path.resolve(manifest.LibraryFolders[folder]));
			}
		});

		return folders;
	}

	async getInstallPath() {
		let regKey = new Registry({
			hive: Registry.HKCU,
			key: '\\Software\\Valve\\Steam\\'
		});

		let getKeyValue = promisify(regKey.get.bind(regKey));

		try {
			let keyValue = await getKeyValue('SteamPath');
			return keyValue.value;
		} catch (e) {
			regKey = new Registry({
				hive: Registry.HKLM,
				key: '\\Software\\Valve\\Steam\\'
			});

			getKeyValue = promisify(regKey.get.bind(regKey));
			let keyValue = await getKeyValue('SteamPath');
			return keyValue.value;
		}
	}
};

module.exports = new Steam();