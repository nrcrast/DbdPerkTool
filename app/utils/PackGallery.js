import ImageGrid from './ImageGrid.js';
import logger from 'electron-log';

const ICON_TYPES = {
    ACTIONS: 'actions',
    PORTRAITS: 'charportraits',
    FAVORS: 'favors',
    ADD_ONS: 'itemaddons',
    ITEMS: 'items',
    STATUS: 'statuseffects',
    PERKS: 'perks',
    POWERS: 'powers',
    BANNERS: 'banners',
    RITUALS: 'dailyrituals',
    EMBLEMS: 'emblems',
    EVENTS: 'events',
    HELP: 'help',
    HELP_LOADING: 'helploading',
    STORE_BG: 'storebackgrounds',
    STORE_TABS: 'storetabs',
    ARCHIVE: 'archive'
};

const TYPE_WIDTH = {
	[ICON_TYPES.PORTRAITS]: 200,
	[ICON_TYPES.ADD_ONS]: 70,
	[ICON_TYPES.POWERS]: 70,
	[ICON_TYPES.ACTIONS]: 70,
	[ICON_TYPES.STATUS]: 50,
};
const TYPE_GRID_WIDTH = {
	[ICON_TYPES.PORTRAITS]: 6,
};
const TYPE_PADDING = {
	[ICON_TYPES.ADD_ONS]: 5,
	[ICON_TYPES.ITEMS]: 5,
	[ICON_TYPES.POWERS]: 5,
};
const DEFAULT_GRID_WIDTH = 10;
const DEFAULT_WIDTH = 100;
const DEFAULT_PADDING = 2;

export default class PackGallery {

	constructor(archive) {
		this.archive = archive;
	}

	async generateImageFor(type, files) {
		const currentGallery = this;
		const img = await ImageGrid.generate(
			files,
			{
				imgHeight:
					TYPE_WIDTH[type] ||
					DEFAULT_WIDTH,
				imgWidth:
					TYPE_WIDTH[type] ||
					DEFAULT_WIDTH,
				padding:
					TYPE_PADDING[type] ||
					DEFAULT_PADDING,
				gridWidth:
					TYPE_GRID_WIDTH[type] ||
					DEFAULT_GRID_WIDTH,
			},
		);
		return {type, data: img};
	}

	async buildUncompressedImages(types) {
		const currentGallery = this;
		const images = [];
		for(let i = 0; i < types.length; i += 1) {
			logger.info(`Processing images for type ${types[i]}`);
			const type = types[i];
			const files = currentGallery.archive.getIconList(type);
			if(files.length > 0) {
				console.log(`Type: ${type}: `, files);
				images.push(await currentGallery.generateImageFor(type, files));
			}
		}
		return images;
	}

	// Returns array of {type: String, buf: Buffer(png)}
	async create() {
		const types = await this.archive.getAvailableTypes();
		const images = await this.buildUncompressedImages(types);
		return images;
	}
}
