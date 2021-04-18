import unzipper from 'unzipper';
import slugify from 'slugify';
import path from 'path';
import fs from 'fs-extra';
import shuffle from 'shuffle-array';
import logger from 'electron-log';
import expectedFiles from '../constants/expectedfiles.json';

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

export default class PerkPackArchive {

	constructor(files, basePath) {
		this.files = files;
		this.basePath = basePath;

		// There are a few old perk remnants lying around that aren't actually in the game
		this.excludedFiles = [
			'pack/perks/iconperks_artefacthunter.png',
			'pack/perks/iconperks_laststanding.png',
			'pack/perks/iconperks_toughrunner.png',
			'pack/perks/iconperks_underperform.png',
			'pack/perks/missing.png',
			'pack/perks/toth_temp.png',
			'pack/perks/iconperks_temp1.png',
			'pack/perks/iconperks_temp2.png',
			'pack/perks/xhair.png',
			'pack/favors/iconfavors_temp1.png',
			'pack/favors/iconfavors_temp2.png',
			'pack/items/iconitems_trapple.png',
			'pack/items/iconitems_temp1.png',
			'pack/itemaddons/missing.png',
			'pack/itemaddons/iconitemaddon_temp1.png',
			'pack/itemaddons/iconaddon_gum.png',
			'pack/itemaddons/iconaddon_inhaler.png',
			'pack/powers/iconpowers_temp1.png',
			'pack/powers/iconpowers_axe.png',
			'pack/powers/dlc2/iconpowers_stalker3a.png',
			'pack/powers/iconpowers_detention.png',
		];
	}

	async getFile(fileName) {
		const rawFile = this.files.find((file) => {
			return file.toLowerCase().endsWith(fileName.toLowerCase());
		});

		if (!rawFile) {
			throw Error(`Could not find file ${fileName}`);
		}

		return fs.promises.readFile(rawFile);
	}

	async getTopLevelDirs() {
		const dirs = new Set();
		this.files.forEach((file) => {
			const fileName = file.split(this.basePath + '\\')[1];
			const dir = fileName.split('\\')[0];
			dirs.add(dir.toLowerCase());
		});
		return dirs;
	}
	async getRandomIcons(type, count) {
		const currentArchive = this;
		const files = this.files.filter((file) => {
			return file
				.toLowerCase()
				.includes(`${type.toLowerCase()}` + '\\');
		});
		logger.debug(`Files: `, files);
		shuffle(files);

		if (files.length < count) {
			throw Error('Not enough files!');
		}

		const randomFiles = files.slice(0, count);
		logger.debug(
			'Getting random icons: ',
			randomFiles
		);
		return Promise.all(
			randomFiles.map((file) => currentArchive.getFile(file)),
		);
	}

	async getFavor(name) {
		return this.getFile(`iconFavors_${name}.png`);
	}

	async getItemAddon(name) {
		return this.getFile(`iconAddon_${name}.png`);
	}

	async getItem(itemName) {
		return this.getFile(`iconItems_${itemName}.png`);
	}

	async getStatusEffect(effectName) {
		return this.getFile(
			`iconStatusEffects_${effectName}.png`,
		);
	}

	async getPerk(perkName) {
		return this.getFile(`iconPerks_${perkName}.png`);
	}

	async getPower(power) {
		return this.getFile(`iconPowers_${power}.png`);
	}

	async getPortrait(character) {
		return this.getFile(
			`${character}_charSelect_portrait.png`,
		);
	}

	getAllIconFileNames(
		filterFn = () => {
			return true;
		},
	) {
		const currentArchive = this;
		return this.files
			.filter((file) => {
				const pathOnly = file.split(this.basePath + '\\')[1];
				const lowerPath = pathOnly.toLowerCase();

				// logger.info(`Path: ${lowerPath}`);
				return (
					lowerPath.endsWith('.png') &&
					!currentArchive.excludedFiles.includes(lowerPath) &&
					filterFn(lowerPath)
				);
			})
	}

	getIconList(type) {
		return this.getAllIconFileNames((file) =>
			file.startsWith(`${type}` + '\\'),
		);
	}

	async getAvailableTypes() {
		const dirs = await this.getTopLevelDirs();
		return [...dirs].filter((dir) =>
			Object.values(ICON_TYPES).includes(dir),
		);
	}

	async getHas() {
		const dirs = await this.getTopLevelDirs();

		const has = {
			hasActions: dirs.has('actions'),
			hasPortraits: dirs.has('charportraits'),
			hasFavors: dirs.has('favors'),
			hasItemAddOns: dirs.has('itemaddons'),
			hasItems: dirs.has('items'),
			hasStatusEffects: dirs.has('statuseffects'),
			hasPerks: dirs.has('perks'),
			hasPowers: dirs.has('powers'),
			hasArchive: dirs.has('archive'),
			hasBanners: dirs.has('banners'),
			hasRituals: dirs.has('dailyrituals'),
			hasEmblems: dirs.has('emblems'),
			hasEvents: dirs.has('events'),
			hasHelp: dirs.has('help'),
			hasHelpLoading: dirs.has('helploading'),
			hasStoreBackgrounds: dirs.has('storebackgrounds'),
			hasStoreTabs: dirs.has('storetabs')
		};

		return has;
	}
}
