import fs from 'fs-extra';
import path from 'path';
import log from 'electron-log';
import IconPack from './IconPack';
import settingsUtil from '../settings/Settings';

export default class PortraitPack extends IconPack {
  async copyFilesTo(sourcePath: string, destPath: string) {
    return fs.copy(path.resolve(sourcePath, 'CharPortraits'), path.resolve(destPath, 'CharPortraits'));
  }

  async saveInstalledPackId() {
    log.debug(`Saving installed portrait pack: ${this.meta.id}`);
    settingsUtil.settings.installedPortraitPack = this.meta.id;
    await settingsUtil.save();
  }
}
