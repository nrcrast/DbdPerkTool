import path from 'path';
import slash from 'slash';
import recursiveRead from 'recursive-readdir';
import log from 'electron-log';
import expectedFiles from '../constants/expectedfiles.json';
import { default as fsWithCallbacks } from 'fs';
const fs = fsWithCallbacks.promises;

type metaSchema = {
  latestChapter: string;
  hasPortraits: boolean;
  hasPowers: boolean;
  hasItems: boolean;
  hasStatusEffects: boolean;
  hasPerks: boolean;
};
export default class PackDir {
  dir: string;
  meta: metaSchema;
  metaFilled: boolean;

  constructor(dir: string) {
    this.dir = dir;
    this.meta = {
      latestChapter: 'Unknown',
      hasPortraits: false,
      hasPowers: false,
      hasItems: false,
      hasStatusEffects: false,
      hasPerks: false
    };
    this.metaFilled = false;
  }

  async dirExists(dir: string) {
    try {
      const stats = await fs.lstat(dir);
      return stats.isDirectory();
    } catch (e) {
      return false;
    }
  }

  async getUnexpectedFiles() {
    const currentPackDir = this;
    const userFilesRaw = await recursiveRead(this.dir);
    const normalizedFiles = userFilesRaw.map((file) => {
      return slash(path.relative(currentPackDir.dir, file)).toLowerCase();
    });
    const expectedLower = expectedFiles.map((file) => file.toLowerCase());
    const unexpectedFiles = normalizedFiles.filter((file: string) => {
      return !expectedLower.includes(file);
    });

    log.info('Unexpected Files', unexpectedFiles);

    return unexpectedFiles;
  }

  async validate() {
    const perksDirExists = await this.dirExists(
      path.resolve(this.dir, 'Perks')
    );
    const portraitsDirExists = await this.dirExists(
      path.resolve(this.dir, 'CharPortraits')
    );
    if (perksDirExists || portraitsDirExists) {
      this.meta.latestChapter = await this.getLatestChapter(perksDirExists ? 'Perks' : 'CharPortraits');
      this.meta.hasPortraits = portraitsDirExists;
      this.meta.hasPerks = perksDirExists;
      this.meta.hasPowers = await this.hasPowers();
      this.meta.hasItems = await this.hasItems();
      this.meta.hasStatusEffects = await this.hasStatusEffects();
    }

    if (!perksDirExists && !portraitsDirExists) {
      return {
        isValid: false,
        failReason:
          'Must have either Perks directory or CharPortraits directory'
      };
    }

    const unexpectedFiles = await this.getUnexpectedFiles();

    return {
      isValid: true,
      skipFiles: unexpectedFiles
    };
  }

  async getLatestChapter(scanDir) {
    const contents = await fs.readdir(path.resolve(this.dir, scanDir), {
      withFileTypes: true
    });

    const dirs = contents
      .filter(item => item.isDirectory())
      .map(dirent => dirent.name);

    if (dirs.includes('Ukraine')) {
      return 'Chapter XV: Chains of Hate';
    } else if (dirs.includes('Sweden')) {
      return 'Chapter XIV: Cursed Legacy';
    } else if (dirs.includes('Qatar')) {
      return 'Chapter XIII: Stranger Things';
    } else {
      return 'Unknown';
    }
  }

  async hasPortraits() {
    return this.dirExists(path.resolve(this.dir, 'CharPortraits'));
  }

  async hasItems() {
    return this.dirExists(path.resolve(this.dir, 'Items'));
  }

  async hasPowers() {
    return this.dirExists(path.resolve(this.dir, 'Powers'));
  }

  async hasStatusEffects() {
    return this.dirExists(path.resolve(this.dir, 'StatusEffects'));
  }

  async getMeta() {
    if (!this.metaFilled) {
      await this.validate();
      this.metaFilled = true;
    }
    return this.meta;
  }
}
