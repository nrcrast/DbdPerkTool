const addons: { [key: string]: string } = {
  'customization/missing.png': 'undefined / ',
  'itemaddons/cannibal/iconaddon_awardwinningchili.png':
    'Killer / Leatherface / Award-Winning Chili',
  'itemaddons/cannibal/iconaddon_chili.png': 'Killer / Leatherface / Chili',
  'itemaddons/cannibal/iconaddon_knifescratches.png':
    'Killer / Leatherface / Knife Scratches',
  'itemaddons/cannibal/iconaddon_thebeastsmark.png':
    "Killer / Leatherface / The Beast's Marks",
  'itemaddons/cannibal/iconaddon_thegrease.png':
    'Killer / Leatherface / The Grease',
  'itemaddons/dlc2/iconaddon_blondehair.png': 'Killer / Shape / Blond Hair',
  'itemaddons/dlc2/iconaddon_boyfriendsmemo.png':
    "Killer / Shape / Boyfriend's Memo",
  'itemaddons/dlc2/iconaddon_deadrabbit.png': 'Killer / Shape / Dead Rabbit',
  'itemaddons/dlc2/iconaddon_glassfragment.png':
    'Killer / Shape / Glass Fragment',
  'itemaddons/dlc2/iconaddon_hairbow.png': 'Killer / Shape / Hair Bow',
  'itemaddons/dlc2/iconaddon_hairbrush.png': 'Killer / Shape / Hair Brush',
  'itemaddons/dlc2/iconaddon_jewelry.png': 'Killer / Shape / Jewelry',
  'itemaddons/dlc2/iconaddon_jewelrybox.png': 'Killer / Shape / Jewelry Box',
  'itemaddons/dlc2/iconaddon_jmyersmemorial.png':
    'Killer / Shape / J.Myers Memorial',
  'itemaddons/dlc2/iconaddon_judithsjournal.png':
    "Killer / Shape / Judith's Journal",
  'itemaddons/dlc2/iconaddon_judithstombstone.png':
    "Killer / Shape / Judith's Tombstone",
  'itemaddons/dlc2/iconaddon_lockofhair.png': 'Killer / Shape / Lock of Hair',
  'itemaddons/dlc2/iconaddon_memorialflower.png':
    'Killer / Shape / Memorial Flower',
  'itemaddons/dlc2/iconaddon_mirrorshard.png': 'Killer / Shape / Mirror Shard',
  'itemaddons/dlc2/iconaddon_reflectivefragment.png':
    'Killer / Shape / Reflective Fragment',
  'itemaddons/dlc2/iconaddon_scratchedmirror.png':
    'Killer / Shape / Scratched Mirror',
  'itemaddons/dlc2/iconaddon_tackyearrings.png':
    'Killer / Shape / Tacky Earrings',
  'itemaddons/dlc2/iconaddon_tombstonepiece.png':
    'Killer / Shape / Tombstone Piece',
  'itemaddons/dlc2/iconaddon_tuftofhair.png':
    'Killer / Shape / Fragrant Tuft of Hair',
  'itemaddons/dlc2/iconaddon_vanitymirror.png':
    'Killer / Shape / Vanity Mirror',
  'itemaddons/dlc3/iconaddon_bloodiedmud.png': 'Killer / Hag / Bloodied Mud',
  'itemaddons/dlc3/iconaddon_bloodiedwater.png':
    'Killer / Hag / Bloodied Water',
  'itemaddons/dlc3/iconaddon_bogwater.png': 'Killer / Hag / Bog Water',
  'itemaddons/dlc3/iconaddon_crackedturtleegg.png':
    'Killer / Hag / Cracked Turtle Egg',
  'itemaddons/dlc3/iconaddon_cypressnecklet.png':
    'Killer / Hag / Cypress Necklet',
  'itemaddons/dlc3/iconaddon_deadflymud.png': 'Killer / Hag / Dead Fly Mud',
  'itemaddons/dlc3/iconaddon_disfiguredear.png':
    'Killer / Hag / Disfigured Ear',
  'itemaddons/dlc3/iconaddon_dragonflywings.png':
    'Killer / Hag / Dragonfly Wings',
  'itemaddons/dlc3/iconaddon_driedcicada.png': 'Killer / Hag / Dried Cicada',
  'itemaddons/dlc3/iconaddon_granmasheart.png': "Killer / Hag / Granma's Heart",
  'itemaddons/dlc3/iconaddon_halfeggshell.png': 'Killer / Hag / Half Eggshell',
  'itemaddons/dlc3/iconaddon_mintrag.png': 'Killer / Hag / Mint Rag',
  'itemaddons/dlc3/iconaddon_powderedeggshell.png':
    'Killer / Hag / Powdered Eggshell',
  'itemaddons/dlc3/iconaddon_pussywillowcatkins.png':
    'Killer / Hag / Pussy Willow Catkins',
  'itemaddons/dlc3/iconaddon_ropenecklet.png': 'Killer / Hag / Rope Necklet',
  'itemaddons/dlc3/iconaddon_rustyshackles.png':
    'Killer / Hag / Rusty Shackles',
  'itemaddons/dlc3/iconaddon_scarredhand.png': 'Killer / Hag / Scarred Hand',
  'itemaddons/dlc3/iconaddon_swamporchidnecklet.png':
    'Killer / Hag / Swamp Orchid Necklet',
  'itemaddons/dlc3/iconaddon_waterloggedshoe.png':
    'Killer / Hag / Waterlogged Shoe',
  'itemaddons/dlc3/iconaddon_willowwreath.png': 'Killer / Hag / Willow Wreath',
  'itemaddons/dlc4/iconaddon_calmcartersnotes.png': `Killer / Doctor / "Calm" - Carter's Notes`,
  'itemaddons/dlc4/iconaddon_calmclassi.png':
    'Killer / Doctor / "Calm" - Class I',
  'itemaddons/dlc4/iconaddon_calmclassii.png':
    'Killer / Doctor / "Calm" - Class II',
  'itemaddons/dlc4/iconaddon_diciplinecartersnotes.png': `Killer / Doctor / "Discipline" - Carter's Notes`,
  'itemaddons/dlc4/iconaddon_diciplineclassii.png':
    'Killer / Doctor / "Discipline" - Class II',
  'itemaddons/dlc4/iconaddon_diciplineclassiii.png':
    'Killer / Doctor / "Discipline" - Class III',
  'itemaddons/dlc4/iconaddon_highstimuluselectrode.png':
    'Killer / Doctor / High Stimulus Electrode',
  'itemaddons/dlc4/iconaddon_interviewtape.png':
    'Killer / Doctor / Interview Tape',
  'itemaddons/dlc4/iconaddon_iridescentking.png':
    'Killer / Doctor / Iridescent King',
  'itemaddons/dlc4/iconaddon_iridescentqueen.png':
    'Killer / Doctor / Iridescent Queen',
  'itemaddons/dlc4/iconaddon_mapleknight.png': 'Killer / Doctor / Maple Knight',
  'itemaddons/dlc4/iconaddon_moldyelectrode.png':
    'Killer / Doctor / Moldy Electrode',
  'itemaddons/dlc4/iconaddon_ordercartersnotes.png': `Killer / Doctor / "Order" - Carter's Notes`,
  'itemaddons/dlc4/iconaddon_orderclassi.png':
    'Killer / Doctor / "Order" - Class I',
  'itemaddons/dlc4/iconaddon_orderclassii.png':
    'Killer / Doctor / "Order" - Class II',
  'itemaddons/dlc4/iconaddon_polishedelectrode.png':
    'Killer / Doctor / Polished Electrode',
  'itemaddons/dlc4/iconaddon_restraintcartersnotes.png': `Killer / Doctor / "Restraint" - Carter's Notes`,
  'itemaddons/dlc4/iconaddon_restraintclassii.png':
    'Killer / Doctor / "Restraint" - Class II',
  'itemaddons/dlc4/iconaddon_restraintclassiii.png':
    'Killer / Doctor / "Restraint" - Class III',
  'itemaddons/dlc4/iconaddon_scrappedtape.png':
    'Killer / Doctor / Scrapped Tape',
  'itemaddons/dlc5/iconaddon_amanitatoxin.png':
    'Killer / Huntress / Amanita Toxin',
  'itemaddons/dlc5/iconaddon_bandagedhaft.png':
    'Killer / Huntress / Bandaged Haft',
  'itemaddons/dlc5/iconaddon_begrimedhead.png':
    'Killer / Huntress / Begrimed Head',
  'itemaddons/dlc5/iconaddon_berustoxin.png': 'Killer / Huntress / Berus Toxin',
  'itemaddons/dlc5/iconaddon_coarsestone.png':
    'Killer / Huntress / Coarse Stone',
  'itemaddons/dlc5/iconaddon_deerskingloves.png':
    'Killer / Huntress / Deerskin Gloves',
  'itemaddons/dlc5/iconaddon_finestone.png': 'Killer / Huntress / Fine Stone',
  'itemaddons/dlc5/iconaddon_flowerbabushka.png':
    'Killer / Huntress / Flower Babushka',
  'itemaddons/dlc5/iconaddon_glowingconcoction.png':
    'Killer / Huntress / Glowing Concoction',
  'itemaddons/dlc5/iconaddon_infantrybelt.png':
    'Killer / Huntress / Infantry Belt',
  'itemaddons/dlc5/iconaddon_iridescenthead.png':
    'Killer / Huntress / Iridescent Head',
  'itemaddons/dlc5/iconaddon_leatherloop.png':
    'Killer / Huntress / Leather Loop',
  'itemaddons/dlc5/iconaddon_mannagrassbraid.png':
    'Killer / Huntress / Manna Grass Braid',
  'itemaddons/dlc5/iconaddon_oakhaft.png': 'Killer / Huntress / Oak Haft',
  'itemaddons/dlc5/iconaddon_pungentfiale.png':
    'Killer / Huntress / Pungent Fiale',
  'itemaddons/dlc5/iconaddon_rustyhead.png': 'Killer / Huntress / Rusty Head',
  'itemaddons/dlc5/iconaddon_shinypin.png': 'Killer / Huntress / Shiny Pin',
  'itemaddons/dlc5/iconaddon_venomousconcoction.png':
    'Killer / Huntress / Venomous Concoction',
  'itemaddons/dlc5/iconaddon_yewseedbrew.png':
    'Killer / Huntress / Yew Seed Brew',
  'itemaddons/dlc5/iconaddon_yewseedconcoction.png':
    'Killer / Huntress / Yew Seed Concoction',
  'itemaddons/england/iconaddon_blackbox.png':
    'Killer / Freddy Krueger / Black Box',
  'itemaddons/england/iconaddon_bluedress.png':
    'Killer / Freddy Krueger / Blue Dress',
  'itemaddons/england/iconaddon_catblock.png':
    'Killer / Freddy Krueger / Cat Block',
  'itemaddons/england/iconaddon_classphoto.png':
    'Killer / Freddy Krueger / Class Photo',
  'itemaddons/england/iconaddon_gardenrake.png':
    'Killer / Freddy Krueger / Garden Rake',
  'itemaddons/england/iconaddon_greendress.png':
    'Killer / Freddy Krueger / Green Dress',
  'itemaddons/england/iconaddon_jumprope.png':
    'Killer / Freddy Krueger / Jump Rope',
  'itemaddons/england/iconaddon_kidsdrawing.png':
    "Killer / Freddy Krueger / Kid's Drawing",
  'itemaddons/england/iconaddon_nancysmasterpiece.png':
    "Killer / Freddy Krueger / Nancy's Masterpiece",
  'itemaddons/england/iconaddon_nancyssketch.png':
    "Killer / Freddy Krueger / Nancy's Sketch",
  'itemaddons/england/iconaddon_outdoorrope.png':
    'Killer / Freddy Krueger / Outdoor Rope',
  'itemaddons/england/iconaddon_paintthinner.png':
    'Killer / Freddy Krueger / Paint Thinner',
  'itemaddons/england/iconaddon_pillbottle.png':
    'Killer / Freddy Krueger / Pill Bottle',
  'itemaddons/england/iconaddon_prototypeclaw.png':
    'Killer / Freddy Krueger / Prototype Claws',
  'itemaddons/england/iconaddon_redpaintbrush.png':
    'Killer / Freddy Krueger / Red Paint Brush',
  'itemaddons/england/iconaddon_sheepblock.png':
    'Killer / Freddy Krueger / Sheep Block',
  'itemaddons/england/iconaddon_swingchains.png':
    'Killer / Freddy Krueger / Swing Chains',
  'itemaddons/england/iconaddon_unicornblock.png':
    'Killer / Freddy Krueger / Unicorn Block',
  'itemaddons/england/iconaddon_woolshirt.png':
    'Killer / Freddy Krueger / Wool Shirt',
  'itemaddons/england/iconaddon_zblock.png':
    'Killer / Freddy Krueger / "Z" Block',
  'itemaddons/finland/iconaddon_amandasletter.png':
    "Killer / Pig / Amanda's Letter",
  'itemaddons/finland/iconaddon_amandassecret.png':
    "Killer / Pig / Amanda's Secret",
  'itemaddons/finland/iconaddon_bagofgears.png': 'Killer / Pig / Bag of Gears',
  'itemaddons/finland/iconaddon_combatstraps.png':
    'Killer / Pig / Combat Straps',
  'itemaddons/finland/iconaddon_crateofgears.png':
    'Killer / Pig / Crate of Gears',
  'itemaddons/finland/iconaddon_facemask.png': 'Killer / Pig / Face Mask',
  'itemaddons/finland/iconaddon_interlockingrazor.png':
    'Killer / Pig / Interlocking Razor',
  'itemaddons/finland/iconaddon_jigsawsannotatedplan.png':
    "Killer / Pig / Jigsaw's Annotated Plan",
  'itemaddons/finland/iconaddon_jigsawssketch.png':
    "Killer / Pig / Jigsaw's Sketch",
  'itemaddons/finland/iconaddon_johnsmedicalfile.png':
    "Killer / Pig / John's Medical File",
  'itemaddons/finland/iconaddon_lastwill.png': 'Killer / Pig / Last Will',
  'itemaddons/finland/iconaddon_razerwire.png': 'Killer / Pig / Razor Wires',
  'itemaddons/finland/iconaddon_rulessetn2.png':
    'Killer / Pig / Rules Set No.2',
  'itemaddons/finland/iconaddon_rustyattachments.png':
    'Killer / Pig / Rusty Attachments',
  'itemaddons/finland/iconaddon_shatteredsyringe.png':
    'Killer / Pig / Shattered Syringe',
  'itemaddons/finland/iconaddon_slowreleasetoxin.png':
    'Killer / Pig / Slow-Release Toxin',
  'itemaddons/finland/iconaddon_tamperedtimer.png':
    'Killer / Pig / Tampered Timer',
  'itemaddons/finland/iconaddon_utilityblades.png':
    'Killer / Pig / Utility Blades',
  'itemaddons/finland/iconaddon_videotape.png': 'Killer / Pig / Video Tape',
  'itemaddons/finland/iconaddon_workshopgrease.png':
    'Killer / Pig / Workshop Grease',
  'itemaddons/guam/iconaddon_ether5.png': 'Killer / Clown / Ether 5 vol%',
  'itemaddons/guam/iconaddon_fingerlessparadegloves.png':
    'Killer / Clown / Fingerless Parade Gloves',
  'itemaddons/guam/iconaddon_kerosenecan.png': 'Killer / Clown / Kerosene Can',
  'itemaddons/guam/iconaddon_redheadspinkyfinger.png':
    "Killer / Clown / Redhead's Pinky Finger",
  'itemaddons/guam/iconaddon_robinfeather.png':
    'Killer / Clown / Robin Feather',
  'itemaddons/guam/iconaddon_smellyinnersoles.png':
    'Killer / Clown / Smelly Inner Soles',
  'itemaddons/guam/iconaddon_solventjug.png': 'Killer / Clown / Solvent Jug',
  'itemaddons/guam/iconaddon_starlingfeather.png':
    'Killer / Clown / Starling Feather',
  'itemaddons/guam/iconaddon_stickysodabottle.png':
    'Killer / Clown / Sticky Soda Bottle',
  'itemaddons/guam/iconaddon_thickcorkstopper.png':
    'Killer / Clown / Thick Cork Stopper',
  'itemaddons/haiti/iconaddon_bloodyhairbroochi.png':
    'Killer / Spirit / Bloody Hair Brooch',
  'itemaddons/haiti/iconaddon_dirtyuwabaki.png':
    'Killer / Spirit / Dirty Uwabaki',
  'itemaddons/haiti/iconaddon_driedcherryblossom.png':
    'Killer / Spirit / Dried Cherry Blossom',
  'itemaddons/haiti/iconaddon_fathersglasses.png':
    "Killer / Spirit / Father's Glasses",
  'itemaddons/haiti/iconaddon_giftedbamboocomb.png':
    'Killer / Spirit / Gifted Bamboo Comb',
  'itemaddons/haiti/iconaddon_juniperbonzai.png':
    'Killer / Spirit / Juniper Bonsai',
  'itemaddons/haiti/iconaddon_kaiuntalisman.png':
    'Killer / Spirit / Kaiun Talisman',
  'itemaddons/haiti/iconaddon_katanatsuba.png':
    'Killer / Spirit / Katana Tsuba',
  'itemaddons/haiti/iconaddon_katsumoritalisman.png':
    'Killer / Spirit / Katsumori Talisman',
  'itemaddons/haiti/iconaddon_motherdaughterring.png':
    'Killer / Spirit / Mother-Daughter Ring',
  'itemaddons/haiti/iconaddon_muddysportcap.png':
    'Killer / Spirit / Muddy Sports Day Cap',
  'itemaddons/haiti/iconaddon_origamicrane.png':
    'Killer / Spirit / Origami Crane',
  'itemaddons/haiti/iconaddon_prayersbeads.png':
    'Killer / Spirit / Prayer Beads Bracelet',
  'itemaddons/haiti/iconaddon_rinsbrokenwatch.png':
    "Killer / Spirit / Rin's Broken Watch",
  'itemaddons/haiti/iconaddon_rustyflute.png': 'Killer / Spirit / Rusty Flute',
  'itemaddons/haiti/iconaddon_shiawaseamulet.png':
    'Killer / Spirit / Shiawase Amulet',
  'itemaddons/haiti/iconaddon_wakizashisaya.png':
    'Killer / Spirit / Wakizashi Saya',
  'itemaddons/haiti/iconaddon_whitehairribbon.png':
    'Killer / Spirit / White Hair Ribbon',
  'itemaddons/haiti/iconaddon_yakuyokeamulet.png':
    'Killer / Spirit / Yakuyoke Amulet',
  'itemaddons/haiti/iconaddon_zori.png': 'Killer / Spirit / Zōri',
  'itemaddons/iconaddon_abdominaldressing.png': 'MedKit / Abdominal Dressing',
  'itemaddons/iconaddon_anxiousgasp.png': 'Killer / Nurse / Anxious Gasp',
  'itemaddons/iconaddon_ataxicrespiration.png':
    'Killer / Nurse / Ataxic Respiration',
  'itemaddons/iconaddon_badmankeepsake.png':
    'Killer / Nurse / Bad Man Keepsake',
  'itemaddons/iconaddon_badmanslastbreath.png': `Killer / Nurse / "Bad Man's" Last Breath`,
  'itemaddons/iconaddon_bandages.png': 'MedKit / Bandages',
  'itemaddons/iconaddon_battery.png': 'Flashlight / Battery',
  'itemaddons/iconaddon_beadcrystal.png': 'Map / Crystal Bead',
  'itemaddons/iconaddon_beadglass.png': 'Map / Glass Bead',
  'itemaddons/iconaddon_bloodamber.png': 'Key / Blood Amber',
  'itemaddons/iconaddon_bloodkrafabai.png':
    'Killer / Wraith / "All Seeing" - Blood',
  'itemaddons/iconaddon_bloodshadowdance.png':
    'Killer / Wraith / "Shadow Dance" - Blood',
  'itemaddons/iconaddon_bloodswifthunt.png':
    'Killer / Wraith / "Swift Hunt" - Blood',
  'itemaddons/iconaddon_bloodwindstorm.png':
    'Killer / Wraith / "Windstorm" - Blood',
  'itemaddons/iconaddon_bloodycoil.png': 'Killer / Trapper / Bloody Coil',
  'itemaddons/iconaddon_boneclapper.png': 'Killer / Wraith / Bone Clapper',
  'itemaddons/iconaddon_brandnewpart.png': 'Toolbox / Brand New Part',
  'itemaddons/iconaddon_butterflytape.png': 'MedKit / Butterfly Tape',
  'itemaddons/iconaddon_campbellslastbreath.png':
    "Killer / Nurse / Campbell's Last Breath",
  'itemaddons/iconaddon_carburetortuningguide.png':
    'Killer / Hillbilly / Carburetor Tuning Guide',
  'itemaddons/iconaddon_catatonictreasure.png':
    "Killer / Nurse / Catatonic Boy's Treasure",
  'itemaddons/iconaddon_chainsawfile.png':
    'Killer / Leatherface / Chainsaw File',
  'itemaddons/iconaddon_chainsbloody.png':
    'Killer / Leatherface / Begrimed Chain',
  'itemaddons/iconaddon_chainsgrisly.png':
    'Killer / Leatherface / Grisly Chain',
  'itemaddons/iconaddon_chainsrusted.png': 'Killer / Hillbilly / Rusted Chain',
  'itemaddons/iconaddon_cleanrag.png': 'Toolbox / Clean Rag',
  'itemaddons/iconaddon_coilskit4.png': 'Killer / Trapper / 4-Coil Spring Kit',
  'itemaddons/iconaddon_coilspring.png':
    'Killer / Trapper / Strong Coil Spring',
  'itemaddons/iconaddon_coxcombedclapper.png':
    'Killer / Wraith / Coxcombed Clapper',
  'itemaddons/iconaddon_cuttingwire.png': 'Toolbox / Cutting Wire',
  'itemaddons/iconaddon_darkcincture.png': 'Killer / Nurse / Dark Cincture',
  'itemaddons/iconaddon_deathengravings.png':
    'Killer / Hillbilly / Death Engravings',
  'itemaddons/iconaddon_depthgaugerake.png':
    'Killer / Leatherface / Depth Gauge Rake',
  'itemaddons/iconaddon_diamondstone.png':
    'Killer / Trapper / Iridescent Stone',
  'itemaddons/iconaddon_doomengravings.png':
    'Killer / Hillbilly / Doom Engravings',
  'itemaddons/iconaddon_dullbracelet.png': 'Killer / Nurse / Dull Bracelet',
  'itemaddons/iconaddon_fasteningtools.png':
    'Killer / Trapper / Fastening Tools',
  'itemaddons/iconaddon_focuslens.png': 'Flashlight / Focus Lens',
  'itemaddons/iconaddon_fragilewheeze.png': 'Killer / Nurse / Fragile Wheeze',
  'itemaddons/iconaddon_gauseroll.png': 'MedKit / Gauze Roll',
  'itemaddons/iconaddon_geldressings.png': 'MedKit / Gel Dressings',
  'itemaddons/iconaddon_gloves.png': 'MedKit / Rubber Gloves',
  'itemaddons/iconaddon_gripwrench.png': 'Toolbox / Grip Wrench',
  'itemaddons/iconaddon_heavydutybattery.png':
    'Flashlight / Heavy Duty Battery',
  'itemaddons/iconaddon_heavypanting.png': 'Killer / Nurse / Heavy Panting',
  'itemaddons/iconaddon_highendsapphirelens.png':
    'Flashlight / High-end Sapphire lens',
  'itemaddons/iconaddon_homemademuffler.png':
    'Killer / Leatherface / Homemade Muffler',
  'itemaddons/iconaddon_honingstone.png': 'Killer / Trapper / Honing Stone',
  'itemaddons/iconaddon_instructions.png': 'Toolbox / Instructions',
  'itemaddons/iconaddon_intensehalogen.png': 'Flashlight / Intense Halogen',
  'itemaddons/iconaddon_jennerslastbreath.png':
    "Killer / Nurse / Jenner's Last Breath",
  'itemaddons/iconaddon_kavanaghslastbreath.png':
    "Killer / Nurse / Kavanagh's Last Breath",
  'itemaddons/iconaddon_leathergrip.png': 'Flashlight / Leather Grip',
  'itemaddons/iconaddon_lightchassis.png': 'Killer / Hillbilly / Light Chassis',
  'itemaddons/iconaddon_logwooddye.png': 'Killer / Trapper / Logwood Dye',
  'itemaddons/iconaddon_longguidebar.png':
    'Killer / Leatherface / Long Guide Bar',
  'itemaddons/iconaddon_longlifebattery.png': 'Flashlight / Long Life Battery',
  'itemaddons/iconaddon_mapaddendum.png': 'Map / Map Addendum',
  'itemaddons/iconaddon_matchbox.png': 'Killer / Nurse / Matchbox',
  'itemaddons/iconaddon_metalsaw.png': 'Toolbox / Hacksaw',
  'itemaddons/iconaddon_metalspoon.png': 'Killer / Nurse / Metal Spoon',
  'itemaddons/iconaddon_milkyglass.png': 'Key / Milky Glass',
  'itemaddons/iconaddon_mudbaikrakaeug.png':
    'Killer / Wraith / "Blind Warrior" - Mud',
  'itemaddons/iconaddon_mudblink.png': 'Killer / Wraith / "Blink" - Mud',
  'itemaddons/iconaddon_mudswifthunt.png':
    'Killer / Wraith / "Swift Hunt" - Mud',
  'itemaddons/iconaddon_mudwindstorm.png': 'Killer / Wraith / "Windstorm"- Mud',
  'itemaddons/iconaddon_needandthread.png': 'MedKit / Needle & Thread',
  'itemaddons/iconaddon_oddbulb.png': 'Flashlight / Odd Bulb',
  'itemaddons/iconaddon_oilycoil.png': 'Killer / Trapper / Oily Coil',
  'itemaddons/iconaddon_paddedjaws.png': 'Killer / Trapper / Padded Jaws',
  'itemaddons/iconaddon_plaidflannel.png': 'Killer / Nurse / Plaid Flannel',
  'itemaddons/iconaddon_pocketwatch.png': 'Killer / Nurse / Pocket Watch',
  'itemaddons/iconaddon_powerbulb.png': 'Flashlight / Power Bulb',
  'itemaddons/iconaddon_prayerbeads.png': 'Key / Prayer Beads',
  'itemaddons/iconaddon_prayerrope.png': 'Key / Prayer Rope',
  'itemaddons/iconaddon_primerbulb.png': 'Killer / Leatherface / Primer Bulb',
  'itemaddons/iconaddon_protectivegloves.png': 'Toolbox / Protective Gloves',
  'itemaddons/iconaddon_retardantjelly.png': 'Map / Retardant Jelly',
  'itemaddons/iconaddon_ropeblack.png': 'Map / Black Silk Cord',
  'itemaddons/iconaddon_ropered.png': 'Map / Red Twine',
  'itemaddons/iconaddon_ropeyellow.png': 'Map / Yellow Wire',
  'itemaddons/iconaddon_rubbergrip.png': 'Flashlight / Rubber Grip',
  'itemaddons/iconaddon_rustedjaws.png': 'Killer / Trapper / Rusted Jaws',
  'itemaddons/iconaddon_scissors.png': 'MedKit / Medical Scissors',
  'itemaddons/iconaddon_scraps.png': 'Toolbox / Scraps',
  'itemaddons/iconaddon_scratchedpearl.png': 'Key / Scratched Pearl',
  'itemaddons/iconaddon_secondarycoil.png': 'Killer / Trapper / Secondary Coil',
  'itemaddons/iconaddon_selfadherentwrap.png': 'MedKit / Self Adherent Wrap',
  'itemaddons/iconaddon_serratedjaws.png': 'Killer / Trapper / Serrated Jaws',
  'itemaddons/iconaddon_settingtools.png': 'Killer / Trapper / Setting Tools',
  'itemaddons/iconaddon_shoplubricant.png':
    'Killer / Hillbilly / Shop Lubricant',
  'itemaddons/iconaddon_socketswivels.png': 'Toolbox / Socket Swivels',
  'itemaddons/iconaddon_sootthebeast.png':
    'Killer / Wraith / "The Beast" - Soot',
  'itemaddons/iconaddon_soottheghost.png':
    'Killer / Wraith / "The Ghost" - Soot',
  'itemaddons/iconaddon_sootthehound.png':
    'Killer / Wraith / "The Hound" - Soot',
  'itemaddons/iconaddon_soottheserpent.png':
    'Killer / Wraith / "The Serpent" - Soot',
  'itemaddons/iconaddon_sparkplug.png': 'Killer / Hillbilly / Spark Plug',
  'itemaddons/iconaddon_spasmodicbreath.png':
    'Killer / Nurse / Spasmodic Breath',
  'itemaddons/iconaddon_speedlimiter.png':
    'Killer / Leatherface / Speed Limiter',
  'itemaddons/iconaddon_spikedboots.png': 'Killer / Hillbilly / Spiked Boots',
  'itemaddons/iconaddon_spiritallseeing.png':
    'Killer / Wraith / "All Seeing" - Spirit',
  'itemaddons/iconaddon_sponge.png': 'MedKit / Sponge',
  'itemaddons/iconaddon_spoolofwire.png': 'Toolbox / Wire Spool',
  'itemaddons/iconaddon_springclamp.png': 'Toolbox / Spring Clamp',
  'itemaddons/iconaddon_stampodd.png': 'Map / Odd Stamp',
  'itemaddons/iconaddon_stampunusual.png': 'Map / Unusual Stamp',
  'itemaddons/iconaddon_stichedbag.png': 'Killer / Trapper / Stitched Bag',
  'itemaddons/iconaddon_stypticagent.png': 'MedKit / Styptic Agent',
  'itemaddons/iconaddon_surgicalsuture.png': 'MedKit / Surgical Suture',
  'itemaddons/iconaddon_syringe.png': 'MedKit / Anti-Hemorrhagic Syringe',
  'itemaddons/iconaddon_tapsetters.png': 'Killer / Trapper / Trap Setters',
  'itemaddons/iconaddon_tarbottle.png': 'Killer / Trapper / Tar Bottle',
  'itemaddons/iconaddon_thethompsonsmix.png':
    "Killer / Hillbilly / The Thompson's Mix",
  'itemaddons/iconaddon_thompsonsmoonshine.png':
    "Killer / Hillbilly / Thompson's Moonshine",
  'itemaddons/iconaddon_threadedfilament.png': 'Flashlight / Low Amp Filament',
  'itemaddons/iconaddon_tiroptic.png': 'Flashlight / TIR Optic',
  'itemaddons/iconaddon_tokenerroded.png': 'Key / Eroded Token',
  'itemaddons/iconaddon_tokengold.png': 'Key / Gold Token',
  'itemaddons/iconaddon_tornbookmark.png': 'Killer / Nurse / Torn Bookmark',
  'itemaddons/iconaddon_trapperbag.png': 'Killer / Trapper / Trapper Bag',
  'itemaddons/iconaddon_trappergloves.png': 'Killer / Trapper / Trapper Gloves',
  'itemaddons/iconaddon_trappersack.png': 'Killer / Trapper / Trapper Sack',
  'itemaddons/iconaddon_uniquering.png': 'Key / Unique Wedding Ring',
  'itemaddons/iconaddon_vegetableoil.png':
    'Killer / Leatherface / Vegetable Oil',
  'itemaddons/iconaddon_waxbrick.png': 'Killer / Trapper / Wax Brick',
  'itemaddons/iconaddon_weavedring.png': 'Key / Weaved Ring',
  'itemaddons/iconaddon_whiteblindwarrior.png':
    'Killer / Wraith / "Blind Warrior" - White',
  'itemaddons/iconaddon_whiteblink.png': 'Killer / Wraith / "Blink" - White',
  'itemaddons/iconaddon_whitekuntintakkho.png':
    'Killer / Wraith / "Swift Hunt" - White',
  'itemaddons/iconaddon_whitenitcomb.png': 'Killer / Nurse / White Nit Comb',
  'itemaddons/iconaddon_whiteshadowdance.png':
    'Killer / Wraith / "Shadow Dance" - White',
  'itemaddons/iconaddon_whitewindstorm.png':
    'Killer / Wraith / "Windstorm" - White',
  'itemaddons/iconaddon_widelens.png': 'Flashlight / Wide Lens',
  'itemaddons/iconaddon_woodenhorse.png': 'Killer / Nurse / Wooden Horse',
  'itemaddons/kenya/iconaddon_colddirt.png': 'Killer / Legion / Cold Dirt',
  'itemaddons/kenya/iconaddon_defacedsmileybutton.png':
    'Killer / Legion / Defaced Smiley Pin',
  'itemaddons/kenya/iconaddon_etchedruler.png':
    'Killer / Legion / Etched Ruler',
  'itemaddons/kenya/iconaddon_filthyblade.png':
    'Killer / Legion / Filthy Blade',
  'itemaddons/kenya/iconaddon_franksmixtape.png':
    "Killer / Legion / Frank's Mix Tape",
  'itemaddons/kenya/iconaddon_friendshipbracelet.png':
    'Killer / Legion / Friendship Bracelet',
  'itemaddons/kenya/iconaddon_fumingmixtape.png':
    'Killer / Legion / Fuming Mix Tape',
  'itemaddons/kenya/iconaddon_iridescentbutton.png':
    'Killer / Legion / Iridescent Button',
  'itemaddons/kenya/iconaddon_joeysmixtape.png':
    "Killer / Legion / Joey's Mix Tape",
  'itemaddons/kenya/iconaddon_juliesmixtape.png':
    "Killer / Legion / Julie's Mix Tape",
  'itemaddons/kenya/iconaddon_mischieflist.png':
    'Killer / Legion / Mischief List',
  'itemaddons/kenya/iconaddon_muralsketch.png':
    'Killer / Legion / Mural Sketch',
  'itemaddons/kenya/iconaddon_nastyblade.png': 'Killer / Legion / Nasty Blade',
  'itemaddons/kenya/iconaddon_neversleeppills.png':
    'Killer / Legion / Never-Sleep Pills',
  'itemaddons/kenya/iconaddon_scratchedruler.png':
    'Killer / Legion / Scratched Ruler',
  'itemaddons/kenya/iconaddon_smileyfacebutton.png':
    'Killer / Legion / Smiley Face Pin',
  'itemaddons/kenya/iconaddon_stabwoundsstudy.png':
    'Killer / Legion / Stab Wounds Study',
  'itemaddons/kenya/iconaddon_stolensketchbook.png':
    'Killer / Legion / Stolen Sketch Book',
  'itemaddons/kenya/iconaddon_suziesmixtape.png':
    "Killer / Legion / Susie's Mix Tape",
  'itemaddons/kenya/iconaddon_thelegionbutton.png':
    'Killer / Legion / The Legion Pin',
  'itemaddons/mali/iconaddon_ashenapple.png': 'Killer / Plague / Ashen Apple',
  'itemaddons/mali/iconaddon_blackincense.png':
    'Killer / Plague / Black Incense',
  'itemaddons/mali/iconaddon_devoteesamulet.png':
    "Killer / Plague / Devotee's Amulet",
  'itemaddons/mali/iconaddon_emeticpotion.png':
    'Killer / Plague / Emetic potion',
  'itemaddons/mali/iconaddon_exorcismamulet.png':
    'Killer / Plague / Exorcism Amulet',
  'itemaddons/mali/iconaddon_healingsalve.png':
    'Killer / Plague / Healing Salve',
  'itemaddons/mali/iconaddon_hematiteseal.png':
    'Killer / Plague / Hematite Seal',
  'itemaddons/mali/iconaddon_incensedointment.png':
    'Killer / Plague / Incensed Ointment',
  'itemaddons/mali/iconaddon_infectedemetic.png':
    'Killer / Plague / Infected Emetic',
  'itemaddons/mali/iconaddon_iridescentseal.png':
    'Killer / Plague / Iridescent Seal',
  'itemaddons/mali/iconaddon_limestoneseal.png':
    'Killer / Plague / Limestone Seal',
  'itemaddons/mali/iconaddon_olibanumincense.png':
    'Killer / Plague / Olibanum Incense',
  'itemaddons/mali/iconaddon_potenttincture.png':
    'Killer / Plague / Potent Tincture',
  'itemaddons/mali/iconaddon_prayerapple.png':
    'Killer / Plague / Blessed Apple',
  'itemaddons/mali/iconaddon_prayertabletfragment.png':
    'Killer / Plague / Prayer Tablet Fragment',
  'itemaddons/mali/iconaddon_prophylacticamulet.png':
    'Killer / Plague / Prophylactic Amulet',
  'itemaddons/mali/iconaddon_rubbingoil.png': 'Killer / Plague / Rubbing Oil',
  'itemaddons/mali/iconaddon_severedtoe.png': 'Killer / Plague / Severed Toe',
  'itemaddons/mali/iconaddon_vileemetic.png': 'Killer / Plague / Vile Emetic',
  'itemaddons/mali/iconaddon_worshiptablet.png':
    'Killer / Plague / Worship Tablet',
  'itemaddons/oman/iconaddon_caughtontape.png':
    'Killer / Ghostface / “Ghost Face Caught on Tape”',
  'itemaddons/oman/iconaddon_cheapcologne.png':
    'Killer / Ghostface / Cheap Cologne',
  'itemaddons/oman/iconaddon_chewedpen.png': 'Killer / Ghostface / Chewed Pen',
  'itemaddons/oman/iconaddon_driverslicense.png':
    "Killer / Ghostface / Driver's License",
  'itemaddons/oman/iconaddon_droplegknifesheath.png':
    'Killer / Ghostface / Drop-Leg Knife Sheath',
  'itemaddons/oman/iconaddon_headlinescutouts.png':
    'Killer / Ghostface / Headlines Cutouts',
  'itemaddons/oman/iconaddon_knifebeltclip.png':
    'Killer / Ghostface / Knife Belt Clip',
  'itemaddons/oman/iconaddon_lastingperfume.png':
    'Killer / Ghostface / Lasting Perfume',
  'itemaddons/oman/iconaddon_leatherknifesheath.png':
    'Killer / Ghostface / Leather Knife Sheath',
  'itemaddons/oman/iconaddon_markedmap.png': 'Killer / Ghostface / Marked Map',
  'itemaddons/oman/iconaddon_nightvisionmoncular.png':
    'Killer / Ghostface / Night Vision Monocular',
  'itemaddons/oman/iconaddon_olsensaddressbook.png':
    "Killer / Ghostface / Olsen's Address Book",
  'itemaddons/oman/iconaddon_olsensjournal.png':
    'Killer / Ghostface / Olsen’s Journal',
  'itemaddons/oman/iconaddon_olsenswallet.png':
    'Killer / Ghostface / Olsen’s Wallet',
  'itemaddons/oman/iconaddon_outdoorsecuritycamera.png':
    'Killer / Ghostface / Outdoor Security Camera',
  'itemaddons/oman/iconaddon_philly.png': 'Killer / Ghostface / “Philly”',
  'itemaddons/oman/iconaddon_reusuablecinchstraps.png':
    'Killer / Ghostface / Cinch Straps ',
  'itemaddons/oman/iconaddon_telephotolens.png':
    'Killer / Ghostface / Telephoto Lens',
  'itemaddons/oman/iconaddon_victimsdetailedroutine.png':
    'Killer / Ghostface / Victim’s Detailed Routine',
  'itemaddons/oman/iconaddon_walleyesmatchbook.png':
    'Killer / Ghostface / Walleyes Matchbook',
  'itemaddons/qatar/iconaddon_barbsglasses.png':
    "Killer / Demogorgon / Barb's Glasses",
  'itemaddons/qatar/iconaddon_blackheart.png':
    'Killer / Demogorgon / Black Heart',
  'itemaddons/qatar/iconaddon_brasscaselighter.png':
    'Killer / Demogorgon / Brass Case Lighter',
  'itemaddons/qatar/iconaddon_deerlung.png': 'Killer / Demogorgon / Deer Lung',
  'itemaddons/qatar/iconaddon_elevenssoda.png':
    "Killer / Demogorgon / Eleven's Soda",
  'itemaddons/qatar/iconaddon_leproselichen.png':
    'Killer / Demogorgon / Leprose Lichen',
  'itemaddons/qatar/iconaddon_lifeguardwhistle.png':
    'Killer / Demogorgon / Lifeguard Whistle',
  'itemaddons/qatar/iconaddon_mewsguts.png': "Killer / Demogorgon / Mew's Guts",
  'itemaddons/qatar/iconaddon_ratliver.png': 'Killer / Demogorgon / Rat Liver',
  'itemaddons/qatar/iconaddon_rattail.png': 'Killer / Demogorgon / Rat Tail',
  'itemaddons/qatar/iconaddon_redmoss.png': 'Killer / Demogorgon / Red Moss',
  'itemaddons/qatar/iconaddon_rottengreentripe.png':
    'Killer / Demogorgon / Rotten Green Tripe',
  'itemaddons/qatar/iconaddon_rottenpumpkin.png':
    'Killer / Demogorgon / Rotten Pumpkin',
  'itemaddons/qatar/iconaddon_stickylining.png':
    'Killer / Demogorgon / Sticky Lining',
  'itemaddons/qatar/iconaddon_thornyvines.png':
    'Killer / Demogorgon / Thorny Vines',
  'itemaddons/qatar/iconaddon_unknownegg.png':
    'Killer / Demogorgon / Unknown Egg',
  'itemaddons/qatar/iconaddon_upsidedownresin.png':
    'Killer / Demogorgon / Upside Down Resin',
  'itemaddons/qatar/iconaddon_vermillionwebcap.png':
    'Killer / Demogorgon / Vermillion Webcap',
  'itemaddons/qatar/iconaddon_violetwaxcap.png':
    'Killer / Demogorgon / Violet Waxcap',
  'itemaddons/qatar/iconaddon_viscouswebbing.png':
    'Killer / Demogorgon / Viscous Webbing',
  'itemaddons/sweden/iconaddon_akitoscrutch.png':
    "Killer / Oni / Akito's Crutch",
  'itemaddons/sweden/iconaddon_blackenedtoenail.png':
    'Killer / Oni / Blackened Toenail',
  'itemaddons/sweden/iconaddon_bloodysash.png': 'Killer / Oni / Bloody Sash',
  'itemaddons/sweden/iconaddon_childswoodensword.png':
    "Killer / Oni / Child's Wooden Sword",
  'itemaddons/sweden/iconaddon_chippedsaihai.png':
    'Killer / Oni / Chipped Saihai',
  'itemaddons/sweden/iconaddon_crackedsakazuki.png':
    'Killer / Oni / Cracked Sakazuki',
  'itemaddons/sweden/iconaddon_inklion.png': 'Killer / Oni / Ink Lion',
  'itemaddons/sweden/iconaddon_iridescentfamilycrest.png':
    'Killer / Oni / Iridescent Family Crest',
  'itemaddons/sweden/iconaddon_kanaianzentalisman.png':
    'Killer / Oni / Kanai-anzen Talisman',
  'itemaddons/sweden/iconaddon_lionfang.png': 'Killer / Oni / Lion Fang',
  'itemaddons/sweden/iconaddon_paperlantern.png':
    'Killer / Oni / Yaku-Yoke Talisman',
  'itemaddons/sweden/iconaddon_polishedmaedate.png':
    'Killer / Oni / Polished Maedate',
  'itemaddons/sweden/iconaddon_renirosbloodyglove.png':
    'Killer / Oni / Renjiro’s Bloody Glove',
  'itemaddons/sweden/iconaddon_rottingrope.png': 'Killer / Oni / Rotting Rope',
  'itemaddons/sweden/iconaddon_scalpedtopknot.png':
    'Killer / Oni / Scalped Topknot',
  'itemaddons/sweden/iconaddon_shatteredwakizashi.png':
    'Killer / Oni / Shattered Wakizashi',
  'itemaddons/sweden/iconaddon_splinteredhull.png':
    'Killer / Oni / Splintered Hull',
  'itemaddons/sweden/iconaddon_tearsoakedtenugui.png':
    'Killer / Oni / Tear Soaked Tenugui',
  'itemaddons/sweden/iconaddon_woodenonimask.png':
    'Killer / Oni / Wooden Oni Mask',
  'itemaddons/sweden/iconaddon_yamaokasashimono.png':
    'Killer / Oni / Yamaoka Sashimono',
  'itemaddons/ukraine/iconaddon_barbedwire.png':
    'Killer / Deathslinger / Barbed Wire',
  'itemaddons/ukraine/iconaddon_bayshorescigar.png':
    'Killer / Deathslinger / Bayshore’s Cigar',
  'itemaddons/ukraine/iconaddon_bayshoresgoldtooth.png':
    'Killer / Deathslinger / Bayshore’s Gold Tooth',
  'itemaddons/ukraine/iconaddon_chewingtobacco.png':
    'Killer / Deathslinger / Chewing Tobacco',
  'itemaddons/ukraine/iconaddon_clearcreekwhiskey.png':
    'Killer / Deathslinger / Gold Creek Whiskey',
  'itemaddons/ukraine/iconaddon_hellshireiron.png':
    'Killer / Deathslinger / Hellshire Iron',
  'itemaddons/ukraine/iconaddon_honeylocustthorns.png':
    'Killer / Deathslinger / Honey Locust Thorns ',
  'itemaddons/ukraine/iconaddon_iridescentcoin.png':
    'Killer / Deathslinger / Iridescent Coin',
  'itemaddons/ukraine/iconaddon_jawsmasher.png':
    'Killer / Deathslinger / Jaw Smasher ',
  'itemaddons/ukraine/iconaddon_marshalsbadge.png':
    "Killer / Deathslinger / Marshal's Badge ",
  'itemaddons/ukraine/iconaddon_modifiedammobelt.png':
    'Killer / Deathslinger / Modified Ammo Belt ',
  'itemaddons/ukraine/iconaddon_poisonoakleaves.png':
    'Killer / Deathslinger / Poison Oak Leaves',
  'itemaddons/ukraine/iconaddon_prisonchain.png':
    'Killer / Deathslinger / Prison Chain',
  'itemaddons/ukraine/iconaddon_ricketychain.png':
    'Killer / Deathslinger / Rickety Chain',
  'itemaddons/ukraine/iconaddon_rustedspike.png':
    'Killer / Deathslinger / Rusted Spike ',
  'itemaddons/ukraine/iconaddon_snakeoil.png':
    'Killer / Deathslinger / Snake Oil ',
  'itemaddons/ukraine/iconaddon_spitpolishrag.png':
    'Killer / Deathslinger / Spit Polish Rag ',
  'itemaddons/ukraine/iconaddon_tinoilcan.png':
    'Killer / Deathslinger / Tin Oil Can ',
  'itemaddons/ukraine/iconaddon_wantedposter.png':
    'Killer / Deathslinger / Wanted Poster ',
  'itemaddons/ukraine/iconaddon_wardenskeys.png':
    'Killer / Deathslinger / Warden’s Keys ',
  'itemaddons/dlc6/iconaddon_awardwinningchili.png':
    'Killer / Cannibal / Award-Winning Chili',
  'itemaddons/dlc6/iconaddon_chili.png': 'Killer / Cannibal / Chili',
  'itemaddons/dlc6/iconaddon_knifescratches.png':
    'Killer / Cannibal / Knife Scratches',
  'itemaddons/dlc6/iconaddon_thebeastsmark.png':
    "Killer / Cannibal / Beast's Marks",
  'itemaddons/dlc6/iconaddon_thegrease.png': 'Killer / Cannibal / The Grease',
  'itemaddons/guam/iconaddon_bottleofchloroform.png':
    'Killer / Clown / Bottle of Chloroform',
  'itemaddons/guam/iconaddon_cheapginbottle.png':
    'Killer / Clown / Cheap Gin Bottle',
  'itemaddons/guam/iconaddon_cigarbox.png': 'Killer / Clown / Cigar Box',
  'itemaddons/guam/iconaddon_ether10.png': 'Killer / Clown / Ether 10 Vol%',
  'itemaddons/guam/iconaddon_ether15.png': 'Killer / Clown / Ether 15 Vol%',
  'itemaddons/guam/iconaddon_flaskofbleach.png':
    'Killer / Clown / Flask of Bleach',
  'itemaddons/guam/iconaddon_garishmakeupkit.png':
    'Killer / Clown / Garish Makeup Kit',
  'itemaddons/guam/iconaddon_sulfuricacidvial.png':
    'Killer / Clown / Sulphuric Acid Vial',
  'itemaddons/guam/iconaddon_tattoosmiddlefinger.png':
    "Killer / Clown / Tatto's Middle Finger",
  'itemaddons/guam/iconaddon_vhsporn.png': 'Killer / Clown / VHS Porn',
  'itemaddons/iconaddon_gum.png': 'Unused / Gum',
  'itemaddons/iconaddon_inhaler.png': 'Unused / Inhaler',
  'itemaddons/iconaddon_sootshadowdance.png':
    'Killer / Wraith / "Shadow Dance" - Soot',
  'itemaddons/wales/iconaddon_blackstrap.png':
    'Killer / Executioner / Black Strap',
  'itemaddons/wales/iconaddon_burningmanpainting.png':
    'Killer / Executioner / Burning Man Painting',
  'itemaddons/wales/iconaddon_cinderellamusicbox.png':
    'Killer / Executioner / Cinderella Music Box',
  'itemaddons/wales/iconaddon_copperring.png':
    'Killer / Executioner / Copper Ring',
  'itemaddons/wales/iconaddon_crimsonceremonybook.png':
    'Killer / Executioner / Crimson Ceremony Book',
  'itemaddons/wales/iconaddon_deadbutterfly.png':
    'Killer / Executioner / Dead Butterfly',
  'itemaddons/wales/iconaddon_forgottenvideotape.png':
    'Killer / Executioner / Forgotten Videotape',
  'itemaddons/wales/iconaddon_iridescentseal.png':
    'Killer / Executioner / Iridescent Seal of Metatron',
  'itemaddons/wales/iconaddon_leadring.png': 'Killer / Executioner / Lead Ring',
  'itemaddons/wales/iconaddon_leopardprintfabric.png':
    'Killer / Executioner / Leopard Print Fabric',
  'itemaddons/wales/iconaddon_lostmemoriesbook.png':
    'Killer / Executioner / Lost Memories Book',
  'itemaddons/wales/iconaddon_mannequinfoot.png':
    'Killer / Executioner / Mannequin Foot',
  'itemaddons/wales/iconaddon_mistyday.png':
    'Killer / Executioner / Misty Day, Remains of Judgement',
  'itemaddons/wales/iconaddon_obsidiangoblet.png':
    'Killer / Executioner / Obsidian Goblet',
  'itemaddons/wales/iconaddon_rustcoloredegg.png':
    'Killer / Executioner / Rust Colored Egg',
  'itemaddons/wales/iconaddon_scarletegg.png':
    'Killer / Executioner / Scarlet Egg',
  'itemaddons/wales/iconaddon_spearhead.png':
    'Killer / Executioner / Spearhead',
  'itemaddons/wales/iconaddon_tabletoftheoppressor.png':
    'Killer / Executioner / Tablet of the Oppressor',
  'itemaddons/wales/iconaddon_valtielsectphotograph.png':
    'Killer / Executioner / Valtiel Sect Photograph',
  'itemaddons/wales/iconaddon_waxdoll.png': 'Killer / Executioner / Wax Doll',
  'itemaddons/cannibal/iconaddon_iridescentflesh.png':
    'Killer / Cannibal / Iridescent Flesh',
  'itemaddons/xipre/iconaddon_apexmuffler.png':
    'Killer / Hillbilly / Apex Muffler',
  'itemaddons/xipre/iconaddon_bigbuckle.png': 'Killer / Hillbilly / Big Buckle',
  'itemaddons/xipre/iconaddon_blackgrease.png':
    'Killer / Hillbilly / Black Grease',
  'itemaddons/xipre/iconaddon_dadsboots.png':
    "Killer / Hillbilly / Dad's Boots",
  'itemaddons/xipre/iconaddon_deathengravings.png':
    'Killer / Hillbilly / Death Engravings',
  'itemaddons/xipre/iconaddon_doomengravings.png':
    'Killer / Hillbilly / Doom Engravings',
  'itemaddons/xipre/iconaddon_heavyclutch.png':
    'Killer / Hillbilly / Heavy Clutch',
  'itemaddons/xipre/iconaddon_iridescentbrick.png':
    'Killer / Hillbilly / Iridescent Brick',
  'itemaddons/xipre/iconaddon_junkyardairfilter.png':
    'Killer / Hillbilly / Junkyard Air Filter',
  'itemaddons/xipre/iconaddon_leafymash.png': 'Killer / Hillbilly / Leafy Mash',
  'itemaddons/xipre/iconaddon_lowkickbackchains.png':
    'Killer / Hillbilly / Low Kickback Chains',
  'itemaddons/xipre/iconaddon_lowprochains.png':
    'Killer / Hillbilly / LoPro Chains',
  'itemaddons/xipre/iconaddon_mothershelpers.png':
    "Killer / Hillbilly / Mother's Helpers",
  'itemaddons/xipre/iconaddon_offbrandmotoroil.png':
    'Killer / Hillbilly / Off-brand Motor Oil',
  'itemaddons/xipre/iconaddon_pighousegloves.png':
    'Killer / Hillbilly / Pighouse Gloves',
  'itemaddons/xipre/iconaddon_puncturedmuffler.png':
    'Killer / Hillbilly / Punctured Muffler',
  'itemaddons/xipre/iconaddon_speedlimiter.png':
    'Killer / Hillbilly / Speed Limiter',
  'itemaddons/xipre/iconaddon_spikedboots.png':
    'Killer / Hillbilly / Spiked Boots',
  'itemaddons/xipre/iconaddon_steeltoeboots.png':
    'Killer / Hillbilly / Steel toe Boots',
  'itemaddons/xipre/iconaddon_tunedcarburetor.png':
    'Killer / Hillbilly / Tuned Carburetor'
};

export default function getLanguage(filePath: string) {
  return addons[filePath] || null;
}
