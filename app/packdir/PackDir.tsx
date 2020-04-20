import path from 'path';
import { default as fsWithCallbacks } from 'fs';
const fs = fsWithCallbacks.promises;

type metaSchema = {
  latestChapter: string;
  hasPortraits: boolean;
  hasPowers: boolean;
  hasItems: boolean;
  hasStatusEffects: boolean;
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
      hasStatusEffects: false
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

  async validate() {
    const perksDirExists = await this.dirExists(
      path.resolve(this.dir, 'Perks')
    );
    if (perksDirExists) {
      this.meta.latestChapter = await this.getLatestChapter();
      this.meta.hasPortraits = await this.hasPortraits();
      this.meta.hasPowers = await this.hasPowers();
      this.meta.hasItems = await this.hasItems();
      this.meta.hasStatusEffects = await this.hasStatusEffects();
    }
    return perksDirExists;
  }

  async getLatestChapter() {
    const contents = await fs.readdir(path.resolve(this.dir, 'Perks'), {
      withFileTypes: true
    });

    const dirs = contents
      .filter(item => item.isDirectory())
      .map(dirent => dirent.name);

    if(dirs.includes('Ukraine')) {
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
