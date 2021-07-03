import path from 'path';
import PackDir from '../packdir/PackDir';
import archiver from 'archiver';
import slugify from '@sindresorhus/slugify';
import { promisify } from 'util';
import slash from 'slash';
import fs from 'fs';
import log from 'electron-log';
import { PreviewGenerator } from './PreviewGenerator';


const readdirAsync = promisify(fs.readdir);

export default class PackGenerator {
  packDir: PackDir;
  outputPath: string;
  packName: string;
  packAuthor: string;
  packDescription: string;
  packZipFile: string;
  outputZip: string;
  skipFiles: Array<string>;
  constructor(
    packDir: PackDir,
    outputPath: string = '',
    packName: string,
    packAuthor: string,
    packDescription: string,
    skipFiles: Array<string>
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
    this.skipFiles = skipFiles;
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

  async generate() {
    const currentGen = this;
    return new Promise(async (resolve, reject) => {
      // Start building archive
      log.info(
        'Building archive ' + path.resolve(this.outputPath, this.packZipFile)
      );
      const output = fs.createWriteStream(
        path.resolve(this.outputPath, this.packZipFile)
      );

      const archive = archiver('zip', {
        zlib: { level: 9 } // Sets the compression level.
      });

      output.on('close', function() {
        log.info(archive.pointer() + ' total bytes');
        log.info(
          'archiver has been finalized and the output file descriptor has closed.'
        );
        resolve(currentGen.outputZip);
      });

      // good practice to catch this error explicitly
      archive.on('error', function(err) {
        reject(err);
      });

      archive.pipe(output);

      log.info('Making dir...');

      const packMeta = Object.assign(
        {
          name: this.packName,
          author: this.packAuthor,
          description: this.packDescription,
          isNsfw: false
        },
        await this.packDir.getMeta()
      );

      log.info('Pack Meta: ' + JSON.stringify(packMeta));

      const files = await currentGen.getFiles(undefined, this.packDir.dir);

      files.forEach(file => {
        const pathInZip = slash(path.relative(currentGen.packDir.dir, file));
        if(currentGen.skipFiles.includes(pathInZip.toLowerCase())) {
          // log.warn(`Skipping ${pathInZip}`);
        } else {
          archive.append(fs.createReadStream(file), { name: 'Pack/' + pathInZip });
        }
      });

      // TODO build previews
      try {
        const previewGenerator = new PreviewGenerator(archive, files, this.packDir.dir, packMeta);
        await previewGenerator.generate();
      } catch(e) {
        reject(e);
      }


      archive.append(JSON.stringify(packMeta, null, 2), {
        name: 'meta.json'
      });

      log.info('Finalizing');
      archive.finalize();
    });
  }
}
