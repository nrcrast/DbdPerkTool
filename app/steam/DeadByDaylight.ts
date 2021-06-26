import SteamApp from './SteamApp';
import fs from 'fs-extra';

const DEFAULT_DBD_DIRS = ['C:\\Program Files (x86)\\Steam\\steamapps\\common\\Dead by Daylight', 'C:\\Program Files\\Steam\\steamapps\\common\\Dead by Daylight']

export default class DeadByDaylight {
  private steamApp = new SteamApp(381210);
  constructor() {
    
  }

  private async checkFileExists(filepath: string): Promise<string | boolean>{
    return new Promise((resolve, reject) => {
      fs.access(filepath, fs.constants.F_OK, error => {
        if(error) {
          resolve(false);
        } else {
          resolve(filepath);
        }
      });
    });
  }

  public async tryTheUsualSuspects(): Promise<string> {
    for(let i = 0; i < DEFAULT_DBD_DIRS.length; i += 1) {
      const res = await this.checkFileExists(DEFAULT_DBD_DIRS[i]);

      if(res) {
        return res;
      }
    }

    return '';
  }

  public async getInstallPath() {
    let dbdPath = await this.steamApp.getInstallPath();

    if(!dbdPath || dbdPath.trim().length === 0) {
      dbdPath = await this.tryTheUsualSuspects();
    }

    return dbdPath.toLowerCase();
  }
}
