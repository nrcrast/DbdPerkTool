import { promisify } from 'util';
import fs from 'fs';
import vdf from 'node-vdf';
import path from 'path';
import Steam from './Steam';
import logger from 'electron-log';

const readFileAsync = promisify(fs.readFile);

export default class SteamApp {
  APP_ID: number;

  constructor(appId: number) {
    this.APP_ID = appId;
  }

  async getInstallPath() {
    const gameFolders = await Steam.getLibraryFolders();
    logger.info(gameFolders);
    for (let i = 0; i < gameFolders.length; i += 1) {
      const gameFilePath = path.resolve(
        `${gameFolders[i]}`,
        `steamapps/appmanifest_${this.APP_ID}.acf`
      );

      if (fs.existsSync(gameFilePath)) {
        const acfText = await readFileAsync(gameFilePath, 'utf8');
        const acfData = vdf.parse(acfText);
        const installDir = acfData.AppState.installdir;
        return path.resolve(gameFolders[i], 'steamapps/common/', installDir);
      }
    }
    throw Error('Game not found');
  }
}
