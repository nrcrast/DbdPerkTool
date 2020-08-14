import fs from 'fs-extra';
import path from 'path';
import copy from 'recursive-copy';
import readdir from 'recursive-readdir';
import log from 'electron-log';
import { PackMeta } from './PackMeta';
import IconPack from './IconPack';
import settingsUtil from '../settings/Settings';
import slash from 'slash';
import { promisify } from 'util';

export default class PerkPack extends IconPack {
  opts: any;
  constructor(meta: PackMeta) {
    super(meta);
  }

  async copyFilesTo(sourcePath: string, destPath: string, opts: any) {
    if (opts === undefined) {
      return copy(sourcePath, destPath, { overwrite: true });
    }
    // Create an object for faster lookup
    const desiredFilesObj = {};
    opts.forEach(file => {
      desiredFilesObj[file] = true;
    });
    const filterFn = (src: String) => {
      if (!src || !src.endsWith('.png')) {
        return false;
      }
      const copying = desiredFilesObj[src.toLowerCase()] === true;
      // if(copying) {
      //   log.debug(`Copying File ${src}: ${copying}`);
      // }

      return copying;
    };

    await copy(sourcePath, destPath, { filter: filterFn, overwrite: true });
  }

  async saveInstalledPackId() {
    log.debug(`Saving installed pack: ${this.meta.id}`);
    settingsUtil.settings.installedPack = this.meta.id;
    await settingsUtil.save();
  }
}
