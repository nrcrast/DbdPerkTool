import axios from 'axios';
import electron from 'electron';
import tmp from 'tmp';
import unzipper from 'unzipper';
import fs from 'fs-extra';
import path from 'path';
import log from 'electron-log';
import settingsUtil from '../settings/Settings';
import logger from 'electron-log';
import { PackMeta } from './PackMeta';

const {ipcRenderer} = electron;

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
      `${settingsUtil.get('targetServer')}/pack`,
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
   * @returns temporary directory. Must be removed manually!
   */
  private async extractZip(zipPath: string) {
    return new Promise((resolve, reject) => {
      const tmpDir =  {name: path.resolve((electron.app || electron.remote.app).getPath('userData'),`${this.meta.id}`)};
      fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: tmpDir.name }))
        .on('close', () => {
          resolve(tmpDir);
        })
        .on('error', e => {
          reject(e);
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
    const zip =  {name: path.resolve((electron.app || electron.remote.app).getPath('userData'),`${this.meta.id}.zip`)};
    return new Promise((resolve, reject) => {
      ipcRenderer.send('downloadFile', {
        outputLocation: zip.name,
        url
      });

      ipcRenderer.on('downloadComplete', (event, err) => {
        if (err) {
          reject(err);
        } else {
          resolve(zip);
        }
      });
    });
  }

  /**
   * Download zip and extract it to a temporary directory
   * @param onProgress - optional. Called with an integer percentage as the download progresses
   * @returns temporary directory
   */
  private async downloadAndExtract(onProgress?: Function) {
    log.debug('Downloading Zip');
    const zipPath = await this.downloadZip(onProgress);
    log.debug('Extracting Zip');
    const extractDir = await this.extractZip(zipPath.name);
    log.debug(`Extracted to ${extractDir.name}`);
    return {zipPath, extractPath: extractDir};
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

    const paths = await this.downloadAndExtract(onProgress);
    await this.copyFilesTo(`${paths.extractPath.name}/Pack`, dbdIconsPath, opts);
    log.debug('Files copied!');
    await this.saveInstalledPackId();
    await fs.remove(paths.extractPath.name);
    await fs.remove(paths.zipPath.name);
  }
}
