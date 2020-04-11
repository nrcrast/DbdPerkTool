import { promisify } from 'util';
import Registry from 'winreg';
import fs from 'fs';
import vdf from 'node-vdf';
import path from 'path';

const readFileAsync = promisify(fs.readFile);

function isNumeric(num: any) {
  return !isNaN(num);
}

class Steam {
  static async getLibraryFolders() {
    const steamInstallPath = await Steam.getInstallPath();
    const libraryManifestFilePath = `${steamInstallPath}/steamapps/libraryfolders.vdf`;
    const manifestText = await readFileAsync(libraryManifestFilePath, 'utf8');
    const manifest = vdf.parse(manifestText);
    const folders = [path.resolve(`${steamInstallPath}`)];

    Object.keys(manifest.LibraryFolders).forEach(folder => {
      if (isNumeric(folder)) {
        folders.push(path.resolve(manifest.LibraryFolders[folder]));
      }
    });

    return folders;
  }

  static async getInstallPath() {
    let regKey = new Registry({
      hive: Registry.HKCU,
      key: '\\Software\\Valve\\Steam\\'
    });

    let getKeyValue = promisify(regKey.get.bind(regKey));

    try {
      const keyValue = await getKeyValue('SteamPath');
      return keyValue.value;
    } catch (e) {
      regKey = new Registry({
        hive: Registry.HKLM,
        key: '\\Software\\Valve\\Steam\\'
      });

      getKeyValue = promisify(regKey.get.bind(regKey));
      const keyValue = await getKeyValue('SteamPath');
      return keyValue.value;
    }
  }
}

export default Steam;
