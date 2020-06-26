import fs from 'fs-extra';
import path from 'path';
import log from 'electron-log';
import { PackMeta } from './PackMeta';
import IconPack from './IconPack';
import settingsUtil from '../settings/Settings';

export default class PerkPack extends IconPack {
  opts: any;
  constructor(meta: PackMeta) {
    super(meta);
  }

  async removeUserUnwantedMiscComponents(sourcePath) {
    const dirs = await fs.readdir(sourcePath, { withFileTypes: true });
    const rmDirs = dirs
      .filter(dir => {
        return (
          dir.isDirectory() &&
          ![
            'CharPortraits',
            'Perks',
            'Items',
            'ItemAddons',
            'Powers',
            'StatusEffects'
          ].includes(dir.name)
        );
      })
      .map(dir => dir.name);
    log.info('Not installing misc dirs: ', rmDirs);
    await Promise.all(
      rmDirs.map(dir => {
        return fs.remove(path.resolve(sourcePath, dir));
      })
    );
  }

  async removeUserUnwantedComponents(sourcePath: string, opts: any) {
    if (!opts.installPortraits) {
      log.info('Not installing Portraits');
      await fs.remove(path.resolve(sourcePath, 'CharPortraits'));
    }
    if (!opts.installPowers) {
      log.info('Not installing Powers');
      await fs.remove(path.resolve(sourcePath, 'Powers'));
    }
    if (!opts.installItems) {
      log.info('Not installing Items');
      await fs.remove(path.resolve(sourcePath, 'Items'));
      await fs.remove(path.resolve(sourcePath, 'ItemAddons'));
    }
    if (!opts.installStatus) {
      log.info('Not installing Status Effects');
      await fs.remove(path.resolve(sourcePath, 'StatusEffects'));
    }

    if (!opts.installPerks) {
      log.info('Not installing Perks');
      await fs.remove(path.resolve(sourcePath, 'Perks'));
    }

    if (!opts.installMisc) {
      await this.removeUserUnwantedMiscComponents(sourcePath);
    }
  }

  async copyFilesTo(sourcePath: string, destPath: string, opts: any) {
    await this.removeUserUnwantedComponents(sourcePath, opts);
    await fs.copy(sourcePath, destPath);
  }

  async saveInstalledPackId() {
	log.debug(`Saving installed pack: ${this.meta.id}`);
	settingsUtil.settings.installedPack = this.meta.id;
	await settingsUtil.save();
  }
}
