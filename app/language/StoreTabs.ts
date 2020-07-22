const languageMap: { [key: string]: string } = {
'storetabs/categoryicon_body.png': 'Body',
'storetabs/categoryicon_charms.png': 'Charms',
'storetabs/categoryicon_hand.png': 'Hand',
'storetabs/categoryicon_head.png': 'Head',
'storetabs/categoryicon_legs.png': 'Legs',
'storetabs/categoryicon_masks.png': 'Masks',
'storetabs/categoryicon_outfits.png': 'Outfits',
'storetabs/categoryicon_torso.png': 'Torso',
'storetabs/categoryicon_upperbody.png': 'Upper Body',
'storetabs/categoryicon_weapons.png': 'Weapons',
};

export default function getLanguage(tag) {
  return languageMap[tag] || null;
}
