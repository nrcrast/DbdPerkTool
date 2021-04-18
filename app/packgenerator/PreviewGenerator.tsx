import { PackCapabilities } from '../models/PackMeta';
import PerkPackArchive from '../models/PerkPackArchive'
import PackGallery from '../utils/PackGallery';
import logger from 'electron-log';
import imagemin from 'imagemin';
import imageminPngquant from 'imagemin-pngquant';

export class PreviewGenerator {
    private pack: any;
    constructor(private archive: any, files: string[], basePath: string, private meta: PackCapabilities ) {
        this.pack = new PerkPackArchive(files, basePath);
    }

    static async compressImage(image: any) {
		return new Promise((resolve, reject) => {
			imagemin
				.buffer(image, {
					plugins: [
						imageminPngquant({
							quality: [0.6, 0.8],
						}),
					],
				})
				.then((buf) => {
					resolve(buf);
				})
				.catch((err) => {
					reject(err);
				});
		});
	}

    async addImageToArchive(imageData: any, imageName: string) {
        logger.info(`Compressing image ${imageName}`);
        const compressedData = await PreviewGenerator.compressImage(imageData);
        logger.info(`Compressed image ${imageName}`);
        this.archive.append(compressedData, {name: imageName});
    }

    async doPreviewCategory(desiredIcons: string[], getter: Function, category: string, pathPrefix?: string) {
        let icons = [];
        logger.info(`Processing preview for ${category}`);
        try {
            icons = await Promise.all(desiredIcons.map(icon => getter(icon)));
        } catch(e) {
            logger.info(`Error getting icons: ${e}`);
            icons = await this.pack.getRandomIcons(category, desiredIcons.length);
        }

        await Promise.all(icons.map((icon: any, i: number) => {
            return this.addImageToArchive(icon,  `previews/${pathPrefix || category}_${i}.png`);
        }));
    }

    async doPerks() {
        return this.doPreviewCategory(['smallgame', 'soulguard', 'trailoftorment', 'coupdegrace'], this.pack.getPerk.bind(this.pack), 'perks');
    }

    async doPortraits() {
        return this.doPreviewCategory(['s23', 'mk', 'gs', 'be'], this.pack.getPortrait.bind(this.pack), 'charportraits', 'portraits');
    }

    async doItems() {
        return this.doPreviewCategory(['toolboxWornOut', 'toolbox', 'flashlightSport', 'flashlightUtility','rainbowmap'], this.pack.getItem.bind(this.pack), 'items');
    }

    async doPowers() {
        return this.doPreviewCategory(['breath', 'UK', 'vilePurge', 'stalker3'], this.pack.getPower.bind(this.pack), 'powers');
    }

    async doAddons() {
        return this.doPreviewCategory(['coilsKit4', 'battery', 'bloodKraFabai', 'oddBulb'], this.pack.getItemAddon.bind(this.pack), 'itemaddons', 'addons');
    }

    async doStatusEffects() {
        return this.doPreviewCategory(['speed', 'cleansing', 'skillCheckDifficulty', 'healing'], this.pack.getStatusEffect.bind(this.pack), 'statuseffects', 'statusEffects');
    }

    async doFavors() {
        return this.doPreviewCategory(['primroseBlossomSachet', 'survivorPudding', 'bloodypartystreamers', 'wardBlack', 'momentoMoriEbony'], this.pack.getFavor.bind(this.pack), 'favors', 'favors');
    }

    async generate() {
        if(this.meta.hasPerks === true) {
            await this.doPerks();
        }
        if(this.meta.hasPortraits === true) {
            await this.doPortraits();
        }
        if(this.meta.hasItems === true) {
            await this.doItems();
        }
        if(this.meta.hasPowers === true) {
            await this.doPowers();
        }
        if(this.meta.hasAddons === true) {
            await this.doAddons();
        }
        if(this.meta.hasStatusEffects === true) {
            await this.doStatusEffects();
        }
        if(this.meta.hasFavors === true) {
            await this.doFavors();
        }
        const gallery = new PackGallery(this.pack);
        const images = await gallery.create();
        await Promise.all(images.map(image => {
            return this.addImageToArchive(image.data, `previews/gallery_${image.type}.png`);
        }));
    }
}