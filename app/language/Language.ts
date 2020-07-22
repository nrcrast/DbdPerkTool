import getLanguageItemAddon from './ItemAddons';
import getLanguagePortrait from './Portraits';
import getLanguageActions from './Actions';
import getLanguageRoot from './Root';
import getLanguageArchive from './Archive';
import getLanguageAuric from './AuricCellPacks';
import getLanguageDaily from './DailyRituals';
import getLanguageEmblems from './Emblems';
import getLanguageHelp from './Help';
import getLanguageItems from './Items';
import getLanguageOfferings from './Offerings';
import getLanguagePerks from './Perks';
import getLanguagePowers from './Powers';
import getLanguageStatus from './StatusEffects';
import getLanguageStoreTabs from './StoreTabs';

export default function getLanguage(filePath: string) {
  return (
    getLanguageActions(filePath) ||
    getLanguageItemAddon(filePath) ||
    getLanguagePortrait(filePath) ||
    getLanguageRoot(filePath) ||
    getLanguageArchive(filePath) ||
    getLanguageAuric(filePath) ||
    getLanguageDaily(filePath) ||
	getLanguageEmblems(filePath) ||
	getLanguageHelp(filePath) ||
	getLanguageItems(filePath) ||
	getLanguageOfferings(filePath) ||
	getLanguagePerks(filePath) ||
	getLanguagePowers(filePath) || 
	getLanguageStatus(filePath) ||
	getLanguageStoreTabs(filePath) ||
    filePath
  );
}
