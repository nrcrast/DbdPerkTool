const meta = {
  name: `Galactic Pack (Alt Perks - ${process.argv[2]})`,
  author: 'ambieobambie',
  description: `Galactic Alt Perks - ${process.argv[2]}`,
  isNsfw: false,
  latestChapter: 'Chapter XVII: Descend Beyond',
  hasPortraits: false,
  hasPowers: false,
  hasItems: false,
  hasStatusEffects: false,
  hasPerks: true
};

console.log(JSON.stringify(meta, null, 2));
