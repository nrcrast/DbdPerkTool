const languageMap: { [key: string]: string } = {
  'archive/questicons_killer.png': 'Quest Icons - Killer',
  'archive/questicons_killertrapper.png': 'Quest Icons - Trapper',
  'archive/questicons_shared.png': 'Quest Icons - Shared',
  'archive/questicons_survivor.png': 'Quest Icons - Survivor',
  'archive/questicons_survivorclaudette.png': 'Quest Icons - Claudette',
  'archive/togo/questicons_killer_do.png': 'Quest Icons - Doctor',
  'archive/togo/questicons_killer_hk.png': 'Quest Icons - Spirit',
  'archive/togo/questicons_survivor_dk.png': 'Quest Icons - David King',
  'archive/togo/questicons_survivor_ms.png': 'Quest Icons - Jane Romero',
  'archive/vietnam/questicons_killer_be.png': 'Quest Icons - Huntress',
  'archive/vietnam/questicons_killer_kk.png': 'Quest Icons - Legion',
  'archive/vietnam/questicons_survivor_df.png': 'Quest Icons - Dwight Fairfield',
  'archive/vietnam/questicons_survivor_gs.png': 'Quest Icons - Kate Denson'
};

export default function getLanguage(tag) {
  return languageMap[tag] || null;
}
