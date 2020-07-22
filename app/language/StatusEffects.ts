const languageMap: { [key: string]: string } = {
  'statuseffects/iconstatuseffects_bleeding.png': 'Bleeding',
  'statuseffects/iconstatuseffects_bloodlust.png': 'Bloodlust',
  'statuseffects/iconstatuseffects_broken.png': 'Broken',
  'statuseffects/iconstatuseffects_cleansing.png': 'Cleansing',
  'statuseffects/iconstatuseffects_deepwound.png': 'Deep Wound',
  'statuseffects/iconstatuseffects_endurance.png': 'Endurance',
  'statuseffects/iconstatuseffects_exhausted.png': 'Exhausted',
  'statuseffects/iconstatuseffects_expertise.png': 'Expertise',
  'statuseffects/iconstatuseffects_exposed.png': 'Exposed',
  'statuseffects/iconstatuseffects_healing.png': 'Healing',
  'statuseffects/iconstatuseffects_hearing.png': 'Hearing',
  'statuseffects/iconstatuseffects_hindered.png': 'Hindered',
  'statuseffects/iconstatuseffects_luck.png': 'Luck',
  'statuseffects/iconstatuseffects_madness.png': 'Madness',
  'statuseffects/iconstatuseffects_mangled.png': 'Mangled',
  'statuseffects/iconstatuseffects_oblivious.png': 'Oblivious',
  'statuseffects/iconstatuseffects_progressionspeed.png': 'Progression Speed',
  'statuseffects/iconstatuseffects_repairing.png': 'Repairing',
  'statuseffects/iconstatuseffects_sabotaging.png': 'Sabotaging',
  'statuseffects/iconstatuseffects_skillcheckdifficulty.png':
    'Skill Check Difficulty',
  'statuseffects/iconstatuseffects_skillcheckprobability.png':
    'Skill Check Probability',
  'statuseffects/iconstatuseffects_skills.png': 'Skills',
  'statuseffects/iconstatuseffects_sleeppenalty.png': 'Sleep Penalty',
  'statuseffects/iconstatuseffects_speed.png': 'Speed',
  'statuseffects/iconstatuseffects_undetectable.png': 'Undetectable',
  'statuseffects/iconstatuseffects_vision.png': 'Vision'
};

export default function getLanguage(tag) {
  return languageMap[tag] || null;
}
