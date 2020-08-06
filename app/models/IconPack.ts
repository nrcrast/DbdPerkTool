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

  /**
   * Copy necessary files from extracted icon zip to their final destination
   * in the DBD game files
   *
   * @param sourcePath temporary path where icons are stored
   * @param destPath the DBD UI/Icons directory
   * @param opts options. currently only used in PerkPack implementation
   */
  abstract async copyFilesTo(
    sourcePath: string,
    destPath: string,
    opts: any
  ): Promise<any>;

  /**
   * Persist the saved pack ID for the UI
   */
  abstract async saveInstalledPackId(): Promise<any>;

  private async getZipUrl(): Promise<string> {
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

  /**
   * Given a buffer of raw zip data, extract to a temporary directory
   * @param rawData
   * @returns temporary directory. Must be removed manually!
   */
  private async extractZip(rawData: Buffer) {
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

  /**
   * Retrieve the raw zip data for the current pack
   * @param onProgress - optional. Called with an integer percentage as the download progresses
   * @returns Buffer of raw zip data
   */
  private async downloadZip(onProgress?: Function): Promise<Buffer> {
    const url = await this.getZipUrl();

    const response = await axios({
      url,
      method: 'GET',
      onDownloadProgress: progressEvent => {
        if (onProgress) {
          onProgress(
            Math.floor((progressEvent.loaded / progressEvent.total) * 100)
          );
        }
      },
      responseType: 'arraybuffer'
    });
    return Buffer.from(response.data);
  }

  /**
   * Download zip and extract it to a temporary directory
   * @param onProgress - optional. Called with an integer percentage as the download progresses
   * @returns temporary directory
   */
  private async downloadAndExtract(onProgress?: Function) {
    log.debug('Downloading Zip');
    const rawZipData = await this.downloadZip(onProgress);
    log.debug('Extracting Zip');
    const extractDir = await this.extractZip(rawZipData);
    log.debug(`Extracted to ${extractDir.name}`);
    return extractDir;
  }

  /**
   * Perform main installation operation. Retrieve a zip, extract it, and copy files to DBD directory
   * @param onProgress - callback to be called for download progress
   * @param opts - options. currently only used in PerkPack implementation
   */
  async install(onProgress: Function, opts = {}) {
    const dbdPath = settingsUtil.settings.dbdInstallPath;

    if (dbdPath === '') {
      throw new Error(
        'Dead By Daylight installation not found. Please set your installation location via the Settings tab.'
      );
    }

    const dbdIconsPath = path.resolve(
      dbdPath,
      'DeadByDaylight',
      'Content',
      'UI',
      'Icons'
    );

    const packDir = await this.downloadAndExtract(onProgress);
    await this.copyFilesTo(`${packDir.name}/Pack`, dbdIconsPath, opts);
    log.debug('Files copied!');
    await this.saveInstalledPackId();
    packDir.removeCallback();
  }
}
