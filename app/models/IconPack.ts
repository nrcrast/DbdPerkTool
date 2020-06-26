import axios from 'axios';
import tmp from 'tmp';
import unzipper from 'unzipper';
import fs from 'fs-extra';
import path from 'path';
import log from 'electron-log';
import settingsUtil from '../settings/Settings';
import { PackMeta } from './PackMeta';

axios.defaults.adapter = require('axios/lib/adapters/http');

export default abstract class IconPack {
  meta: PackMeta;
  constructor(meta: PackMeta) {
    this.meta = meta;
  }

  abstract async copyFilesTo(sourcePath: string, destPath: string, opts: any): Promise<any>;
  abstract async saveInstalledPackId(): Promise<any>;

  async getZipUrl() {
    const url = await axios.get(
      'https://dead-by-daylight-icon-toolbox.herokuapp.com/pack',
      {
        params: {
          packId: this.meta.id
        }
      }
    );
    return url.data;
  }

  async extractZip(rawData: Buffer) {
    return new Promise((resolve, reject) => {
      const tmpFile = tmp.fileSync();
      fs.writeFile(tmpFile.name, rawData, err => {
        if (err) {
          reject(err);
        } else {
          const tmpDir = tmp.dirSync({ keep: true });
          fs.createReadStream(tmpFile.name)
            .pipe(unzipper.Extract({ path: tmpDir.name }))
            .on('close', () => {
              resolve(tmpDir);
            })
            .on('error', e => {
              reject(e);
            });
        }
      });
    });
  }

  async downloadZip(onProgress: Function) {
    const url = await this.getZipUrl();

    const response = await axios({
      url,
      method: 'GET',
      onDownloadProgress: progressEvent => {
        if(onProgress) {
          onProgress(
            Math.floor((progressEvent.loaded / progressEvent.total) * 100)
          );
        }
      },
      responseType: 'arraybuffer'
    });
    return Buffer.from(response.data);
  }

  async downloadAndExtract(onProgress: Function) {
    log.debug('Downloading Zip');
    const rawZipData = await this.downloadZip(onProgress);
    log.debug('Extracting Zip');
    const extractDir = await this.extractZip(rawZipData);
    log.debug(`Extracted to ${extractDir.name}`);
    return extractDir;
  }

  async install(onProgress: Function, opts: any) {
    const dbdPath = settingsUtil.settings.dbdInstallPath;

    if (dbdPath === '') {
      throw new Error('Dead By Daylight installation not found. Please set your installation location via the Settings tab.');
    }

    const dbdIconsPath = path.resolve(
			dbdPath,
			'DeadByDaylight',
			'Content',
			'UI',
			'Icons'
		  );

    const packDir = await this.downloadAndExtract(onProgress);
    await this.copyFilesTo(packDir.name, dbdIconsPath, opts);
    log.debug('Files copied!');
    await this.saveInstalledPackId();
    packDir.removeCallback();
  }

  
}
