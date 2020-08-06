/* eslint-disable class-methods-use-this */
import axios from 'axios';
import { ipcRenderer } from 'electron';
import tmp from 'tmp';
import unzipper from 'unzipper';
import fs from 'fs-extra';
import path from 'path';
import log from 'electron-log';
import settingsUtil from '../settings/Settings';
import { PackMeta } from './PackMeta';
import request from 'request';
import progress from 'request-progress';

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

  static async downloadFile(fileUrl: string, outputLocationPath: string) {
    log.debug(`Downloading ${fileUrl} to ${outputLocationPath}`);
    const writer = fs.createWriteStream(outputLocationPath);

    return axios({
      method: 'get',
      url: fileUrl,
      responseType: 'stream'
    }).then(response => {
      return new Promise((resolve, reject) => {
        response.data.pipe(writer);
        let error = null;
        writer.on('error', err => {
          error = err;
          writer.close();
          reject(err);
        });
        writer.on('close', () => {
          if (!error) {
            resolve(true);
          }
        });
      });
    });
  }

  /**
   * Given a buffer of raw zip data, extract to a temporary directory
   * @param zipFile
   * @returns temporary directory. Must be removed manually!
   */
  private async extractZip(zipFile: any) {
    const tmpDir = tmp.dirSync();
    log.debug(`Opening zip: `, zipFile);
    const dir = await unzipper.Open.file(zipFile.name);
    await dir.extract({ path: tmpDir.name });
    log.debug(`Extracted to: `, tmpDir);
    return tmpDir;
  }

  /**
   * Retrieve the raw zip data for the current pack
   * @param onProgress - optional. Called with an integer percentage as the download progresses
   * @returns Buffer of raw zip data
   */
  private async downloadZip(onProgress?: Function): Promise<Buffer> {
    const url = await this.getZipUrl();
    log.debug(`Installing Pack: ${this.meta.name}`);
    log.debug(`Downloading zip: ${url}`);
    const zipFile = tmp.fileSync();
    return new Promise((resolve, reject) => {
      // Alright, so I'm not completely sure what's going on here
      // For some machines, downloading the file from the renderer results
      // in incomplete downloads. To resolve this, send a message to the main process
      // The main process will send a 'downloadComplete' message when the DL is finished
      ipcRenderer.send('downloadFile', {
        url,
        outputLocation: zipFile.name
      });
      ipcRenderer.on('downloadComplete', (event, args) => {
        if (args.err) {
          reject(args.err);
        } else {
          resolve(zipFile);
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
    const zipFile = await this.downloadZip(onProgress);
    log.debug('Extracting Zip');
    const extractDir = await this.extractZip(zipFile);
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
