import SteamApp from './SteamApp';
import fs from 'fs-extra';
import logger from 'electron-log';

const DEFAULT_DBD_DIRS = ['C:\\Program Files (x86)\\Steam\\steamapps\\common\\Dead by Daylight', 'C:\\Program Files\\Steam\\steamapps\\common\\Dead by Daylight']

export default class DeadByDaylight {
  private steamApp = new SteamApp(381210);
  constructor() {

  }

  private async checkFileExists(filepath: string): Promise<string | boolean> {
    return new Promise((resolve, reject) => {
      fs.access(filepath, fs.constants.F_OK, error => {
        if (error) {
          resolve(false);
        } else {
          resolve(filepath);
        }
      });
    });
  }

  public async tryTheUsualSuspects(): Promise<string> {
    for (let i = 0; i < DEFAULT_DBD_DIRS.length; i += 1) {
      const res = await this.checkFileExists(DEFAULT_DBD_DIRS[i]);

      if (res) {
        return res;
      }
    }

    return '';
  }

  public async getInstallPath() {
    logger.info('Trying generic locations');
    let dbdPath = await this.tryTheUsualSuspects();

    if (!dbdPath || dbdPath.trim().length === 0) {
      logger.info('DBD not found in generic location. Checking registry');
      dbdPath = await this.steamApp.getInstallPath();

      if(dbdPath) {
        logger.info('Found DBD path in registry: ' + dbdPath);
      }
    } else {
      logger.info('DBD installation found in generic location: ' + dbdPath);
    }

    return dbdPath?.toLowerCase();
  }
}
