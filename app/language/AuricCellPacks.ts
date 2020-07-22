const languageMap: { [key: string]: string } = {
  'packs/auriccellpack_01.png': 'Auric Cell Packs 1',
  'packs/auriccellpack_02.png': 'Auric Cell Packs 2',
  'packs/auriccellpack_03.png': 'Auric Cell Packs 3',
  'packs/auriccellpack_04.png': 'Auric Cell Packs 4',
  'packs/auriccellpack_05.png': 'Auric Cell Packs 5',
  'packs/auriccellpack_06.png': 'Auric Cell Packs 6'
};

export default function getLanguage(tag) {
  return languageMap[tag] || null;
}
