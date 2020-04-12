import DeadByDaylight from '../steam/DeadByDaylight';
import electron from 'electron';
import path from 'path';
import { default as fsWithCallbacks } from 'fs';
const fs = fsWithCallbacks.promises;

class Settings {
  settingsPath: string;
  settings: Object;
  constructor() {
    this.settingsPath = path.resolve(
      (electron.app || electron.remote.app).getPath('userData'),
      'dbdPerkToolSettings.json'
    );
    this.settings = {};
  }

  async setDefaultSettings() {
    const dbd = new DeadByDaylight();
    this.settings = {
      dbdInstallPath: await dbd.getInstallPath()
    };
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
