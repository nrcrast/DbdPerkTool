export default function getLanguage(rootDir: String) {
  switch (rootDir) {
    case 'actions':
      return 'Actions';
    case 'charportraits':
      return 'Character Portraits';
    case 'dailyrituals':
      return 'Daily Rituals';
    case 'archive':
      return 'Archive';
    case 'favors':
      return 'Offerings';
    case 'help':
      return 'Help';
    case 'itemaddons':
      return 'Item Add-Ons';
    case 'packs':
      return 'Auric Cell Packs';
    case 'items':
      return 'Items';
    case 'emblems':
      return 'Emblems';
    case 'perks':
      return 'Perks';
    case 'powers':
      return 'Powers';
    case 'helploading':
      return 'Help/Loading';
    case 'storetabs':
      return 'Store Tabs';
    case 'statuseffects':
      return 'Status Effects';
    case 'events':
      return 'Events';
    case 'storebackgrounds':
      return 'Store Backgrounds';
  }

  return null;
}
