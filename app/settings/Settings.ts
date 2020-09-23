import DeadByDaylight from '../steam/DeadByDaylight';
import electron from 'electron';
import log from 'electron-log';
import path from 'path';
import { default as fsWithCallbacks } from 'fs';
const fs = fsWithCallbacks.promises;

type SettingSchema = {
  dbdInstallPath: string;
  installedPack: string;
  installedPortraitPack: string;
  lastUpdate: string;
  updateWithoutAsking: boolean;
  showNsfw: boolean;
  targetServer: string;
  writeToTxt: boolean;
  lastNotificationRead: string;
};

class Settings {
  settingsPath: string;
  settings: SettingSchema;
  defaultSettings: SettingSchema;
  constructor() {
    this.settingsPath = path.resolve(
      (electron.app || electron.remote.app).getPath('userData'),
      'dbdPerkToolSettings.json'
    );
    log.info(`Settings Path: ${this.settingsPath}`);
    this.defaultSettings = {
      lastUpdate: '',
      dbdInstallPath: '',
      installedPack: '',
      installedPortraitPack: '',
      updateWithoutAsking: true,
      showNsfw: false,
      lastNotificationRead: '',
      writeToTxt: false,
      targetServer: 'https://dead-by-daylight-icon-toolbox.herokuapp.com'
    };
    this.settings = { ...this.defaultSettings };
  }

  get(key: string) {
    if (!this.settings[key]) {
      return this.defaultSettings[key];
    } else {
      return this.settings[key];
    }
  }

  async setDefaultSettings() {
    const dbd = new DeadByDaylight();
    let dbdPath = '';

    try {
      dbdPath = await dbd.getInstallPath();
    } catch (e) {
      dbdPath = '';
    }
    this.settings = { ...this.defaultSettings };
    this.settings.dbdInstallPath = dbdPath;
  }

  async read() {
    try {
      const settings = await fs.readFile(this.settingsPath, 'utf8');
      this.settings = JSON.parse(settings);
    } catch (e) {
      console.log(e);
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
