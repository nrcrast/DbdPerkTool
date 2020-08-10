import DeadByDaylight from '../steam/DeadByDaylight';
import electron from 'electron';
import path from 'path';
import { default as fsWithCallbacks } from 'fs';
const fs = fsWithCallbacks.promises;

type SettingSchema = {
  dbdInstallPath: string;
  installedPack: string;
  installedPortraitPack: string;
  lastUpdate: string;
  autoUpdate: boolean;
  showCreate: boolean;
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
    this.defaultSettings = {
      lastUpdate: '',
      dbdInstallPath: '',
      installedPack: '',
      installedPortraitPack: '',
      autoUpdate: false,
      showCreate: false
    };
    this.settings = { ...this.defaultSettings };
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
