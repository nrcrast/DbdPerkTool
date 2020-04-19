import path from 'path';
import PackDir from '../packdir/PackDir';
import archiver from 'archiver';
import slugify from '@sindresorhus/slugify';
import { promisify } from 'util';
import fs from 'fs';
const mergeImages = require('merge-images');
const sharp = require('sharp');
const { Canvas, Image } = require('canvas');

const readdirAsync = promisify(fs.readdir);

export default class PackGenerator {
  packDir: PackDir;
  outputPath: string;
  packName: string;
  packAuthor: string;
  packDescription: string;
  packZipFile: string;
  outputZip : string;
  constructor(
    packDir: PackDir,
    outputPath: string = '',
    packName: string,
    packAuthor: string,
    packDescription: string
  ) {
    this.packDir = packDir;
    if (outputPath.length === 0) {
      this.outputPath = path.resolve(packDir.dir, '..');
    } else {
      this.outputPath = outputPath;
    }

	this.packZipFile = slugify(packName) + '.zip';
	this.outputZip = path.resolve(this.outputPath, this.packZipFile);
    this.packName = packName;
    this.packAuthor = packAuthor;
    this.packDescription = packDescription;
  }

  async getFiles(files: Array<string> = [], dir: string) {
    const currentGen = this;
    const contents = await readdirAsync(dir, { withFileTypes: true });

    const fileNames = contents
      .filter(item => item.isFile())
      .map(item => path.resolve(dir, item.name));
    files.push(...fileNames);
    const dirs = contents.filter(item => item.isDirectory());

    const dirPromises = dirs.map(targetDir =>
      currentGen.getFiles(files, path.resolve(dir, targetDir.name))
    );

    await Promise.all(dirPromises);

    return files;
  }

  async generateHeader() {

  }

  async generate() {
    const currentGen = this;
    return new Promise(async (resolve, reject) => {
      // Start building archive
      console.log(
        'Building archive ' + path.resolve(this.outputPath, this.packZipFile)
      );
      const output = fs.createWriteStream(
        path.resolve(this.outputPath, this.packZipFile)
      );

      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });

      output.on('close', function() {
        console.log(archive.pointer() + ' total bytes');
        console.log(
          'archiver has been finalized and the output file descriptor has closed.'
        );
        resolve(currentGen.outputZip);
      });

      // good practice to catch this error explicitly
      archive.on('error', function(err) {
        reject(err);
      });

      archive.pipe(output);

      console.log('Making dir...');

      const packMeta = Object.assign(
        {
          name: this.packName,
          author: this.packAuthor,
          description: this.packDescription
        },
        await this.packDir.getMeta()
      );

      console.log('Pack Meta: ' + JSON.stringify(packMeta));

      const files = await currentGen.getFiles(undefined, this.packDir.dir);

      files.forEach(file => {
        const pathInZip = ('Pack' + file.split(currentGen.packDir.dir)[1]).replace(/\\/g, '/');
        console.log(file);
        console.log(`Adding ${pathInZip}`);
		archive.append(fs.createReadStream(file), { name: pathInZip });
      });

      archive.append(JSON.stringify(packMeta, null, 2), {
        name: 'meta.json'
      });

      console.log('Finalizing');
      archive.finalize();
    });
  }
}
