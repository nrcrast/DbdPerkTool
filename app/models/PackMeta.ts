export type PackCapabilities = {
	hasPortraits: boolean;
	hasPowers: boolean;
	hasItems: boolean;
	hasStatusEffects: boolean;
	hasPerks: boolean;
	hasAddons: boolean;
	hasFavors: boolean;
}

export type PackMeta = {
	latestChapter: string;
	description: string;
	downloads: number;
	lastUpdate: Date;
	id: string;
	author: string;
	name: string;
} & PackCapabilities;