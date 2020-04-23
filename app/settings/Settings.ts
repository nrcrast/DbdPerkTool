import DeadByDaylight from '../steam/DeadByDaylight';
import electron from 'electron';
import path from 'path';
import logger from 'electron-log';
import { default as fsWithCallbacks } from 'fs';
const fs = fsWithCallbacks.promises;


class Settings {
  settingsPath: string;
  settings: {
    dbdInstallPath: string;
    installedPack: string;
  };
  constructor() {
    this.settingsPath = path.resolve(
      (electron.app || electron.remote.app).getPath('userData'),
      'dbdPerkToolSettings.json'
    );
    this.settings = {
      dbdInstallPath: '',
      installedPack: ''
    };
  }

  async setDefaultSettings() {
    const dbd = new DeadByDaylight();
    let dbdPath = '';
    
    try {
      dbdPath = await dbd.getInstallPath();
    } catch (e) {
      dbdPath = '';
    }

    this.settings.dbdInstallPath = dbdPath;
  }

  async read() {
    try {
      const settings = await fs.readFile(this.settingsPath, 'utf8');
      this.settings = JSON.parse(settings);
    } catch (e) {
      logger.info(e);
      await this.setDefaultSettings();
      await this.save();
    }
  }

  async save() {
    return fs.writeFile(
      this.settingsPath,
      JSON.stringify(this.settings, null, 2)
    );
  }
}

// Settings singleton
export default new Settings();
