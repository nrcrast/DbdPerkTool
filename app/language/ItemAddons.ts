const addons: { [key: string]: string } = {
  'customization/missing.png': 'undefined /  (None)',
  'itemaddons/cannibal/iconaddon_awardwinningchili.png':
    'Killer / Leatherface / Award-Winning Chili (Very Rare)',
  'itemaddons/cannibal/iconaddon_chili.png':
    'Killer / Leatherface / Chili (Uncommon)',
  'itemaddons/cannibal/iconaddon_knifescratches.png':
    'Killer / Leatherface / Knife Scratches (Uncommon)',
  'itemaddons/cannibal/iconaddon_thebeastsmark.png':
    "Killer / Leatherface / The Beast's Marks (Rare)",
  'itemaddons/cannibal/iconaddon_thegrease.png':
    'Killer / Leatherface / The Grease (Rare)',
  'itemaddons/dlc2/iconaddon_blondehair.png':
    'Killer / Shape / Blond Hair (Common)',
  'itemaddons/dlc2/iconaddon_boyfriendsmemo.png':
    "Killer / Shape / Boyfriend's Memo (Common)",
  'itemaddons/dlc2/iconaddon_deadrabbit.png':
    'Killer / Shape / Dead Rabbit (Uncommon)',
  'itemaddons/dlc2/iconaddon_glassfragment.png':
    'Killer / Shape / Glass Fragment (Uncommon)',
  'itemaddons/dlc2/iconaddon_hairbow.png': 'Killer / Shape / Hair Bow (Rare)',
  'itemaddons/dlc2/iconaddon_hairbrush.png':
    'Killer / Shape / Hair Brush (Uncommon)',
  'itemaddons/dlc2/iconaddon_jewelry.png':
    'Killer / Shape / Jewelry (Uncommon)',
  'itemaddons/dlc2/iconaddon_jewelrybox.png':
    'Killer / Shape / Jewelry Box (Rare)',
  'itemaddons/dlc2/iconaddon_jmyersmemorial.png':
    'Killer / Shape / J.Myers Memorial (Rare)',
  'itemaddons/dlc2/iconaddon_judithsjournal.png':
    "Killer / Shape / Judith's Journal (Rare)",
  'itemaddons/dlc2/iconaddon_judithstombstone.png':
    "Killer / Shape / Judith's Tombstone (Ultra Rare)",
  'itemaddons/dlc2/iconaddon_lockofhair.png':
    'Killer / Shape / Lock of Hair (Very Rare)',
  'itemaddons/dlc2/iconaddon_memorialflower.png':
    'Killer / Shape / Memorial Flower (Uncommon)',
  'itemaddons/dlc2/iconaddon_mirrorshard.png':
    'Killer / Shape / Mirror Shard (Rare)',
  'itemaddons/dlc2/iconaddon_reflectivefragment.png':
    'Killer / Shape / Reflective Fragment (Uncommon)',
  'itemaddons/dlc2/iconaddon_scratchedmirror.png':
    'Killer / Shape / Scratched Mirror (Very Rare)',
  'itemaddons/dlc2/iconaddon_tackyearrings.png':
    'Killer / Shape / Tacky Earrings (Common)',
  'itemaddons/dlc2/iconaddon_tombstonepiece.png':
    'Killer / Shape / Tombstone Piece (Very Rare)',
  'itemaddons/dlc2/iconaddon_tuftofhair.png':
    'Killer / Shape / Fragrant Tuft of Hair (Ultra Rare)',
  'itemaddons/dlc2/iconaddon_vanitymirror.png':
    'Killer / Shape / Vanity Mirror (Very Rare)',
  'itemaddons/dlc3/iconaddon_bloodiedmud.png':
    'Killer / Hag / Bloodied Mud (Rare)',
  'itemaddons/dlc3/iconaddon_bloodiedwater.png':
    'Killer / Hag / Bloodied Water (Uncommon)',
  'itemaddons/dlc3/iconaddon_bogwater.png': 'Killer / Hag / Bog Water (Common)',
  'itemaddons/dlc3/iconaddon_crackedturtleegg.png':
    'Killer / Hag / Cracked Turtle Egg (Rare)',
  'itemaddons/dlc3/iconaddon_cypressnecklet.png':
    'Killer / Hag / Cypress Necklet (Uncommon)',
  'itemaddons/dlc3/iconaddon_deadflymud.png':
    'Killer / Hag / Dead Fly Mud (Common)',
  'itemaddons/dlc3/iconaddon_disfiguredear.png':
    'Killer / Hag / Disfigured Ear (Very Rare)',
  'itemaddons/dlc3/iconaddon_dragonflywings.png':
    'Killer / Hag / Dragonfly Wings (Uncommon)',
  'itemaddons/dlc3/iconaddon_driedcicada.png':
    'Killer / Hag / Dried Cicada (Rare)',
  'itemaddons/dlc3/iconaddon_granmasheart.png':
    "Killer / Hag / Granma's Heart (Very Rare)",
  'itemaddons/dlc3/iconaddon_halfeggshell.png':
    'Killer / Hag / Half Eggshell (Uncommon)',
  'itemaddons/dlc3/iconaddon_mintrag.png':
    'Killer / Hag / Mint Rag (Ultra Rare)',
  'itemaddons/dlc3/iconaddon_powderedeggshell.png':
    'Killer / Hag / Powdered Eggshell (Common)',
  'itemaddons/dlc3/iconaddon_pussywillowcatkins.png':
    'Killer / Hag / Pussy Willow Catkins (Uncommon)',
  'itemaddons/dlc3/iconaddon_ropenecklet.png':
    'Killer / Hag / Rope Necklet (Common)',
  'itemaddons/dlc3/iconaddon_rustyshackles.png':
    'Killer / Hag / Rusty Shackles (Very Rare)',
  'itemaddons/dlc3/iconaddon_scarredhand.png':
    'Killer / Hag / Scarred Hand (Very Rare)',
  'itemaddons/dlc3/iconaddon_swamporchidnecklet.png':
    'Killer / Hag / Swamp Orchid Necklet (Rare)',
  'itemaddons/dlc3/iconaddon_waterloggedshoe.png':
    'Killer / Hag / Waterlogged Shoe (Ultra Rare)',
  'itemaddons/dlc3/iconaddon_willowwreath.png':
    'Killer / Hag / Willow Wreath (Rare)',
  'itemaddons/dlc4/iconaddon_calmcartersnotes.png': `Killer / Doctor / "Calm" - Carter's Notes (Very Rare)`,
  'itemaddons/dlc4/iconaddon_calmclassi.png':
    'Killer / Doctor / "Calm" - Class I (Common)',
  'itemaddons/dlc4/iconaddon_calmclassii.png':
    'Killer / Doctor / "Calm" - Class II (Uncommon)',
  'itemaddons/dlc4/iconaddon_diciplinecartersnotes.png': `Killer / Doctor / "Discipline" - Carter's Notes (Very Rare)`,
  'itemaddons/dlc4/iconaddon_diciplineclassii.png':
    'Killer / Doctor / "Discipline" - Class II (Uncommon)',
  'itemaddons/dlc4/iconaddon_diciplineclassiii.png':
    'Killer / Doctor / "Discipline" - Class III (Rare)',
  'itemaddons/dlc4/iconaddon_highstimuluselectrode.png':
    'Killer / Doctor / High Stimulus Electrode (Rare)',
  'itemaddons/dlc4/iconaddon_interviewtape.png':
    'Killer / Doctor / Interview Tape (Rare)',
  'itemaddons/dlc4/iconaddon_iridescentking.png':
    'Killer / Doctor / Iridescent King (Ultra Rare)',
  'itemaddons/dlc4/iconaddon_iridescentqueen.png':
    'Killer / Doctor / Iridescent Queen (Ultra Rare)',
  'itemaddons/dlc4/iconaddon_mapleknight.png':
    'Killer / Doctor / Maple Knight (Common)',
  'itemaddons/dlc4/iconaddon_moldyelectrode.png':
    'Killer / Doctor / Moldy Electrode (Common)',
  'itemaddons/dlc4/iconaddon_ordercartersnotes.png': `Killer / Doctor / "Order" - Carter's Notes (Very Rare)`,
  'itemaddons/dlc4/iconaddon_orderclassi.png':
    'Killer / Doctor / "Order" - Class I (Common)',
  'itemaddons/dlc4/iconaddon_orderclassii.png':
    'Killer / Doctor / "Order" - Class II (Uncommon)',
  'itemaddons/dlc4/iconaddon_polishedelectrode.png':
    'Killer / Doctor / Polished Electrode (Uncommon)',
  'itemaddons/dlc4/iconaddon_restraintcartersnotes.png': `Killer / Doctor / "Restraint" - Carter's Notes (Very Rare)`,
  'itemaddons/dlc4/iconaddon_restraintclassii.png':
    'Killer / Doctor / "Restraint" - Class II (Uncommon)',
  'itemaddons/dlc4/iconaddon_restraintclassiii.png':
    'Killer / Doctor / "Restraint" - Class III (Rare)',
  'itemaddons/dlc4/iconaddon_scrappedtape.png':
    'Killer / Doctor / Scrapped Tape (Rare)',
  'itemaddons/dlc5/iconaddon_amanitatoxin.png':
    'Killer / Huntress / Amanita Toxin (Common)',
  'itemaddons/dlc5/iconaddon_bandagedhaft.png':
    'Killer / Huntress / Bandaged Haft (Common)',
  'itemaddons/dlc5/iconaddon_begrimedhead.png':
    'Killer / Huntress / Begrimed Head (Very Rare)',
  'itemaddons/dlc5/iconaddon_berustoxin.png':
    'Killer / Huntress / Berus Toxin (Common)',
  'itemaddons/dlc5/iconaddon_coarsestone.png':
    'Killer / Huntress / Coarse Stone (Common)',
  'itemaddons/dlc5/iconaddon_deerskingloves.png':
    'Killer / Huntress / Deerskin Gloves (Uncommon)',
  'itemaddons/dlc5/iconaddon_finestone.png':
    'Killer / Huntress / Fine Stone (Uncommon)',
  'itemaddons/dlc5/iconaddon_flowerbabushka.png':
    'Killer / Huntress / Flower Babushka (Rare)',
  'itemaddons/dlc5/iconaddon_glowingconcoction.png':
    'Killer / Huntress / Glowing Concoction (Very Rare)',
  'itemaddons/dlc5/iconaddon_infantrybelt.png':
    'Killer / Huntress / Infantry Belt (Very Rare)',
  'itemaddons/dlc5/iconaddon_iridescenthead.png':
    'Killer / Huntress / Iridescent Head (Ultra Rare)',
  'itemaddons/dlc5/iconaddon_leatherloop.png':
    'Killer / Huntress / Leather Loop (Uncommon)',
  'itemaddons/dlc5/iconaddon_mannagrassbraid.png':
    'Killer / Huntress / Manna Grass Braid (Uncommon)',
  'itemaddons/dlc5/iconaddon_oakhaft.png':
    'Killer / Huntress / Oak Haft (Uncommon)',
  'itemaddons/dlc5/iconaddon_pungentfiale.png':
    'Killer / Huntress / Pungent Fiale (Rare)',
  'itemaddons/dlc5/iconaddon_rustyhead.png':
    'Killer / Huntress / Rusty Head (Rare)',
  'itemaddons/dlc5/iconaddon_shinypin.png':
    'Killer / Huntress / Shiny Pin (Uncommon)',
  'itemaddons/dlc5/iconaddon_venomousconcoction.png':
    'Killer / Huntress / Venomous Concoction (Rare)',
  'itemaddons/dlc5/iconaddon_yewseedbrew.png':
    'Killer / Huntress / Yew Seed Brew (Uncommon)',
  'itemaddons/dlc5/iconaddon_yewseedconcoction.png':
    'Killer / Huntress / Yew Seed Concoction (Rare)',
  'itemaddons/england/iconaddon_blackbox.png':
    'Killer / Freddy Krueger / Black Box (Ultra Rare)',
  'itemaddons/england/iconaddon_bluedress.png':
    'Killer / Freddy Krueger / Blue Dress (Rare)',
  'itemaddons/england/iconaddon_catblock.png':
    'Killer / Freddy Krueger / Cat Block (Uncommon)',
  'itemaddons/england/iconaddon_classphoto.png':
    'Killer / Freddy Krueger / Class Photo (Very Rare)',
  'itemaddons/england/iconaddon_gardenrake.png':
    'Killer / Freddy Krueger / Garden Rake (Common)',
  'itemaddons/england/iconaddon_greendress.png':
    'Killer / Freddy Krueger / Green Dress (Uncommon)',
  'itemaddons/england/iconaddon_jumprope.png':
    'Killer / Freddy Krueger / Jump Rope (Rare)',
  'itemaddons/england/iconaddon_kidsdrawing.png':
    "Killer / Freddy Krueger / Kid's Drawing (Common)",
  'itemaddons/england/iconaddon_nancysmasterpiece.png':
    "Killer / Freddy Krueger / Nancy's Masterpiece (Rare)",
  'itemaddons/england/iconaddon_nancyssketch.png':
    "Killer / Freddy Krueger / Nancy's Sketch (Uncommon)",
  'itemaddons/england/iconaddon_outdoorrope.png':
    'Killer / Freddy Krueger / Outdoor Rope (Uncommon)',
  'itemaddons/england/iconaddon_paintthinner.png':
    'Killer / Freddy Krueger / Paint Thinner (Rare)',
  'itemaddons/england/iconaddon_pillbottle.png':
    'Killer / Freddy Krueger / Pill Bottle (Very Rare)',
  'itemaddons/england/iconaddon_prototypeclaw.png':
    'Killer / Freddy Krueger / Prototype Claws (Uncommon)',
  'itemaddons/england/iconaddon_redpaintbrush.png':
    'Killer / Freddy Krueger / Red Paint Brush (Ultra Rare)',
  'itemaddons/england/iconaddon_sheepblock.png':
    'Killer / Freddy Krueger / Sheep Block (Common)',
  'itemaddons/england/iconaddon_swingchains.png':
    'Killer / Freddy Krueger / Swing Chains (Very Rare)',
  'itemaddons/england/iconaddon_unicornblock.png':
    'Killer / Freddy Krueger / Unicorn Block (Rare)',
  'itemaddons/england/iconaddon_woolshirt.png':
    'Killer / Freddy Krueger / Wool Shirt (Common)',
  'itemaddons/england/iconaddon_zblock.png':
    'Killer / Freddy Krueger / "Z" Block (Very Rare)',
  'itemaddons/finland/iconaddon_amandasletter.png':
    "Killer / Pig / Amanda's Letter (Ultra Rare)",
  'itemaddons/finland/iconaddon_amandassecret.png':
    "Killer / Pig / Amanda's Secret (Very Rare)",
  'itemaddons/finland/iconaddon_bagofgears.png':
    'Killer / Pig / Bag of Gears (Rare)',
  'itemaddons/finland/iconaddon_combatstraps.png':
    'Killer / Pig / Combat Straps (Common)',
  'itemaddons/finland/iconaddon_crateofgears.png':
    'Killer / Pig / Crate of Gears (Very Rare)',
  'itemaddons/finland/iconaddon_facemask.png':
    'Killer / Pig / Face Mask (Uncommon)',
  'itemaddons/finland/iconaddon_interlockingrazor.png':
    'Killer / Pig / Interlocking Razor (Rare)',
  'itemaddons/finland/iconaddon_jigsawsannotatedplan.png':
    "Killer / Pig / Jigsaw's Annotated Plan (Rare)",
  'itemaddons/finland/iconaddon_jigsawssketch.png':
    "Killer / Pig / Jigsaw's Sketch (Very Rare)",
  'itemaddons/finland/iconaddon_johnsmedicalfile.png':
    "Killer / Pig / John's Medical File (Common)",
  'itemaddons/finland/iconaddon_lastwill.png':
    'Killer / Pig / Last Will (Uncommon)',
  'itemaddons/finland/iconaddon_razerwire.png':
    'Killer / Pig / Razor Wires (Uncommon)',
  'itemaddons/finland/iconaddon_rulessetn2.png':
    'Killer / Pig / Rules Set No.2 (Ultra Rare)',
  'itemaddons/finland/iconaddon_rustyattachments.png':
    'Killer / Pig / Rusty Attachments (Rare)',
  'itemaddons/finland/iconaddon_shatteredsyringe.png':
    'Killer / Pig / Shattered Syringe (Common)',
  'itemaddons/finland/iconaddon_slowreleasetoxin.png':
    'Killer / Pig / Slow-Release Toxin (Rare)',
  'itemaddons/finland/iconaddon_tamperedtimer.png':
    'Killer / Pig / Tampered Timer (Very Rare)',
  'itemaddons/finland/iconaddon_utilityblades.png':
    'Killer / Pig / Utility Blades (Uncommon)',
  'itemaddons/finland/iconaddon_videotape.png':
    'Killer / Pig / Video Tape (Uncommon)',
  'itemaddons/finland/iconaddon_workshopgrease.png':
    'Killer / Pig / Workshop Grease (Common)',
  'itemaddons/guam/iconaddon_ether5.png':
    'Killer / Clown / Ether 5 vol% (Common)',
  'itemaddons/guam/iconaddon_fingerlessparadegloves.png':
    'Killer / Clown / Fingerless Parade Gloves (Common)',
  'itemaddons/guam/iconaddon_kerosenecan.png':
    'Killer / Clown / Kerosene Can (Uncommon)',
  'itemaddons/guam/iconaddon_redheadspinkyfinger.png':
    "Killer / Clown / Redhead's Pinky Finger (Ultra Rare)",
  'itemaddons/guam/iconaddon_robinfeather.png':
    'Killer / Clown / Robin Feather (Common)',
  'itemaddons/guam/iconaddon_smellyinnersoles.png':
    'Killer / Clown / Smelly Inner Soles (Common)',
  'itemaddons/guam/iconaddon_solventjug.png':
    'Killer / Clown / Solvent Jug (Uncommon)',
  'itemaddons/guam/iconaddon_starlingfeather.png':
    'Killer / Clown / Starling Feather (Uncommon)',
  'itemaddons/guam/iconaddon_stickysodabottle.png':
    'Killer / Clown / Sticky Soda Bottle (Uncommon)',
  'itemaddons/guam/iconaddon_thickcorkstopper.png':
    'Killer / Clown / Thick Cork Stopper (Uncommon)',
  'itemaddons/haiti/iconaddon_bloodyhairbroochi.png':
    'Killer / Spirit / Bloody Hair Brooch (Rare)',
  'itemaddons/haiti/iconaddon_dirtyuwabaki.png':
    'Killer / Spirit / Dirty Uwabaki (Rare)',
  'itemaddons/haiti/iconaddon_driedcherryblossom.png':
    'Killer / Spirit / Dried Cherry Blossom (Very Rare)',
  'itemaddons/haiti/iconaddon_fathersglasses.png':
    "Killer / Spirit / Father's Glasses (Ultra Rare)",
  'itemaddons/haiti/iconaddon_giftedbamboocomb.png':
    'Killer / Spirit / Gifted Bamboo Comb (Common)',
  'itemaddons/haiti/iconaddon_juniperbonzai.png':
    'Killer / Spirit / Juniper Bonsai (Uncommon)',
  'itemaddons/haiti/iconaddon_kaiuntalisman.png':
    'Killer / Spirit / Kaiun Talisman (Uncommon)',
  'itemaddons/haiti/iconaddon_katanatsuba.png':
    'Killer / Spirit / Katana Tsuba (Rare)',
  'itemaddons/haiti/iconaddon_katsumoritalisman.png':
    'Killer / Spirit / Katsumori Talisman (Rare)',
  'itemaddons/haiti/iconaddon_motherdaughterring.png':
    'Killer / Spirit / Mother-Daughter Ring (Ultra Rare)',
  'itemaddons/haiti/iconaddon_muddysportcap.png':
    'Killer / Spirit / Muddy Sports Day Cap (Uncommon)',
  'itemaddons/haiti/iconaddon_origamicrane.png':
    'Killer / Spirit / Origami Crane (Common)',
  'itemaddons/haiti/iconaddon_prayersbeads.png':
    'Killer / Spirit / Prayer Beads Bracelet (Very Rare)',
  'itemaddons/haiti/iconaddon_rinsbrokenwatch.png':
    "Killer / Spirit / Rin's Broken Watch (Uncommon)",
  'itemaddons/haiti/iconaddon_rustyflute.png':
    'Killer / Spirit / Rusty Flute (Rare)',
  'itemaddons/haiti/iconaddon_shiawaseamulet.png':
    'Killer / Spirit / Shiawase Amulet (Common)',
  'itemaddons/haiti/iconaddon_wakizashisaya.png':
    'Killer / Spirit / Wakizashi Saya (Very Rare)',
  'itemaddons/haiti/iconaddon_whitehairribbon.png':
    'Killer / Spirit / White Hair Ribbon (Uncommon)',
  'itemaddons/haiti/iconaddon_yakuyokeamulet.png':
    'Killer / Spirit / Yakuyoke Amulet (Very Rare)',
  'itemaddons/haiti/iconaddon_zori.png': 'Killer / Spirit / Zōri (Common)',
  'itemaddons/iconaddon_abdominaldressing.png':
    'MedKit / Abdominal Dressing (Rare)',
  'itemaddons/iconaddon_anxiousgasp.png':
    'Killer / Nurse / Anxious Gasp (Rare)',
  'itemaddons/iconaddon_ataxicrespiration.png':
    'Killer / Nurse / Ataxic Respiration (Rare)',
  'itemaddons/iconaddon_badmankeepsake.png':
    'Killer / Nurse / Bad Man Keepsake (Uncommon)',
  'itemaddons/iconaddon_badmanslastbreath.png': `Killer / Nurse / "Bad Man's" Last Breath (Very Rare)`,
  'itemaddons/iconaddon_bandages.png': 'MedKit / Bandages (Common)',
  'itemaddons/iconaddon_battery.png': 'Flashlight / Battery (Common)',
  'itemaddons/iconaddon_beadcrystal.png': 'Map / Crystal Bead (Very Rare)',
  'itemaddons/iconaddon_beadglass.png': 'Map / Glass Bead (Uncommon)',
  'itemaddons/iconaddon_bloodamber.png': 'Key / Blood Amber (Very Rare)',
  'itemaddons/iconaddon_bloodkrafabai.png':
    'Killer / Wraith / "All Seeing" - Blood (Very Rare)',
  'itemaddons/iconaddon_bloodshadowdance.png':
    'Killer / Wraith / "Shadow Dance" - Blood (Very Rare)',
  'itemaddons/iconaddon_bloodswifthunt.png':
    'Killer / Wraith / "Swift Hunt" - Blood (Very Rare)',
  'itemaddons/iconaddon_bloodwindstorm.png':
    'Killer / Wraith / "Windstorm" - Blood (Very Rare)',
  'itemaddons/iconaddon_bloodycoil.png':
    'Killer / Trapper / Bloody Coil (Ultra Rare)',
  'itemaddons/iconaddon_boneclapper.png':
    'Killer / Wraith / Bone Clapper (Uncommon)',
  'itemaddons/iconaddon_brandnewpart.png':
    'Toolbox / Brand New Part (Ultra Rare)',
  'itemaddons/iconaddon_butterflytape.png': 'MedKit / Butterfly Tape (Common)',
  'itemaddons/iconaddon_campbellslastbreath.png':
    "Killer / Nurse / Campbell's Last Breath (Very Rare)",
  'itemaddons/iconaddon_carburetortuningguide.png':
    'Killer / Hillbilly / Carburetor Tuning Guide (Rare)',
  'itemaddons/iconaddon_catatonictreasure.png':
    "Killer / Nurse / Catatonic Boy's Treasure (Uncommon)",
  'itemaddons/iconaddon_chainsawfile.png':
    'Killer / Leatherface / Chainsaw File (Common)',
  'itemaddons/iconaddon_chainsbloody.png':
    'Killer / Leatherface / Begrimed Chain (Very Rare)',
  'itemaddons/iconaddon_chainsgrisly.png':
    'Killer / Leatherface / Grisly Chain (Uncommon)',
  'itemaddons/iconaddon_chainsrusted.png':
    'Killer / Hillbilly / Rusted Chain (Rare)',
  'itemaddons/iconaddon_cleanrag.png': 'Toolbox / Clean Rag (Common)',
  'itemaddons/iconaddon_coilskit4.png':
    'Killer / Trapper / 4-Coil Spring Kit (Uncommon)',
  'itemaddons/iconaddon_coilspring.png':
    'Killer / Trapper / Strong Coil Spring (Common)',
  'itemaddons/iconaddon_coxcombedclapper.png':
    'Killer / Wraith / Coxcombed Clapper (Ultra Rare)',
  'itemaddons/iconaddon_cuttingwire.png': 'Toolbox / Cutting Wire (Uncommon)',
  'itemaddons/iconaddon_darkcincture.png':
    'Killer / Nurse / Dark Cincture (Uncommon)',
  'itemaddons/iconaddon_deathengravings.png':
    'Killer / Hillbilly / Death Engravings (Uncommon)',
  'itemaddons/iconaddon_depthgaugerake.png':
    'Killer / Leatherface / Depth Gauge Rake (Uncommon)',
  'itemaddons/iconaddon_diamondstone.png':
    'Killer / Trapper / Iridescent Stone (Ultra Rare)',
  'itemaddons/iconaddon_doomengravings.png':
    'Killer / Hillbilly / Doom Engravings (Rare)',
  'itemaddons/iconaddon_dullbracelet.png':
    'Killer / Nurse / Dull Bracelet (Uncommon)',
  'itemaddons/iconaddon_fasteningtools.png':
    'Killer / Trapper / Fastening Tools (Very Rare)',
  'itemaddons/iconaddon_focuslens.png': 'Flashlight / Focus Lens (Uncommon)',
  'itemaddons/iconaddon_fragilewheeze.png':
    'Killer / Nurse / Fragile Wheeze (Rare)',
  'itemaddons/iconaddon_gauseroll.png': 'MedKit / Gauze Roll (Uncommon)',
  'itemaddons/iconaddon_geldressings.png': 'MedKit / Gel Dressings (Rare)',
  'itemaddons/iconaddon_gloves.png': 'MedKit / Rubber Gloves (Common)',
  'itemaddons/iconaddon_gripwrench.png': 'Toolbox / Grip Wrench (Rare)',
  'itemaddons/iconaddon_heavydutybattery.png':
    'Flashlight / Heavy Duty Battery (Uncommon)',
  'itemaddons/iconaddon_heavypanting.png':
    'Killer / Nurse / Heavy Panting (Rare)',
  'itemaddons/iconaddon_highendsapphirelens.png':
    'Flashlight / High-end Sapphire lens (Very Rare)',
  'itemaddons/iconaddon_homemademuffler.png':
    'Killer / Leatherface / Homemade Muffler (Uncommon)',
  'itemaddons/iconaddon_honingstone.png':
    'Killer / Trapper / Honing Stone (Very Rare)',
  'itemaddons/iconaddon_instructions.png': 'Toolbox / Instructions (Common)',
  'itemaddons/iconaddon_intensehalogen.png':
    'Flashlight / Intense Halogen (Rare)',
  'itemaddons/iconaddon_jennerslastbreath.png':
    "Killer / Nurse / Jenner's Last Breath (Very Rare)",
  'itemaddons/iconaddon_kavanaghslastbreath.png':
    "Killer / Nurse / Kavanagh's Last Breath (Very Rare)",
  'itemaddons/iconaddon_leathergrip.png': 'Flashlight / Leather Grip (Common)',
  'itemaddons/iconaddon_lightchassis.png':
    'Killer / Hillbilly / Light Chassis (Rare)',
  'itemaddons/iconaddon_logwooddye.png':
    'Killer / Trapper / Logwood Dye (Uncommon)',
  'itemaddons/iconaddon_longguidebar.png':
    'Killer / Leatherface / Long Guide Bar (Uncommon)',
  'itemaddons/iconaddon_longlifebattery.png':
    'Flashlight / Long Life Battery (Rare)',
  'itemaddons/iconaddon_mapaddendum.png': 'Map / Map Addendum (Common)',
  'itemaddons/iconaddon_matchbox.png': 'Killer / Nurse / Matchbox (Ultra Rare)',
  'itemaddons/iconaddon_metalsaw.png': 'Toolbox / Hacksaw (Rare)',
  'itemaddons/iconaddon_metalspoon.png':
    'Killer / Nurse / Metal Spoon (Common)',
  'itemaddons/iconaddon_milkyglass.png': 'Key / Milky Glass (Very Rare)',
  'itemaddons/iconaddon_mudbaikrakaeug.png':
    'Killer / Wraith / "Blind Warrior" - Mud (Uncommon)',
  'itemaddons/iconaddon_mudblink.png':
    'Killer / Wraith / "Blink" - Mud (Uncommon)',
  'itemaddons/iconaddon_mudswifthunt.png':
    'Killer / Wraith / "Swift Hunt" - Mud (Uncommon)',
  'itemaddons/iconaddon_mudwindstorm.png':
    'Killer / Wraith / "Windstorm"- Mud (Uncommon)',
  'itemaddons/iconaddon_needandthread.png':
    'MedKit / Needle & Thread (Uncommon)',
  'itemaddons/iconaddon_oddbulb.png': 'Flashlight / Odd Bulb (Ultra Rare)',
  'itemaddons/iconaddon_oilycoil.png':
    'Killer / Trapper / Oily Coil (Very Rare)',
  'itemaddons/iconaddon_paddedjaws.png':
    'Killer / Trapper / Padded Jaws (Common)',
  'itemaddons/iconaddon_plaidflannel.png':
    'Killer / Nurse / Plaid Flannel (Common)',
  'itemaddons/iconaddon_pocketwatch.png':
    'Killer / Nurse / Pocket Watch (Uncommon)',
  'itemaddons/iconaddon_powerbulb.png': 'Flashlight / Power Bulb (Common)',
  'itemaddons/iconaddon_prayerbeads.png': 'Key / Prayer Beads (Uncommon)',
  'itemaddons/iconaddon_prayerrope.png': 'Key / Prayer Rope (Common)',
  'itemaddons/iconaddon_primerbulb.png':
    'Killer / Leatherface / Primer Bulb (Uncommon)',
  'itemaddons/iconaddon_protectivegloves.png':
    'Toolbox / Protective Gloves (Uncommon)',
  'itemaddons/iconaddon_retardantjelly.png': 'Map / Retardant Jelly (Uncommon)',
  'itemaddons/iconaddon_ropeblack.png': 'Map / Black Silk Cord (Rare)',
  'itemaddons/iconaddon_ropered.png': 'Map / Red Twine (Uncommon)',
  'itemaddons/iconaddon_ropeyellow.png': 'Map / Yellow Wire (Uncommon)',
  'itemaddons/iconaddon_rubbergrip.png': 'Flashlight / Rubber Grip (Uncommon)',
  'itemaddons/iconaddon_rustedjaws.png':
    'Killer / Trapper / Rusted Jaws (Rare)',
  'itemaddons/iconaddon_scissors.png': 'MedKit / Medical Scissors (Uncommon)',
  'itemaddons/iconaddon_scraps.png': 'Toolbox / Scraps (Common)',
  'itemaddons/iconaddon_scratchedpearl.png': 'Key / Scratched Pearl (Uncommon)',
  'itemaddons/iconaddon_secondarycoil.png':
    'Killer / Trapper / Secondary Coil (Rare)',
  'itemaddons/iconaddon_selfadherentwrap.png':
    'MedKit / Self Adherent Wrap (Uncommon)',
  'itemaddons/iconaddon_serratedjaws.png':
    'Killer / Trapper / Serrated Jaws (Uncommon)',
  'itemaddons/iconaddon_settingtools.png':
    'Killer / Trapper / Setting Tools (Rare)',
  'itemaddons/iconaddon_shoplubricant.png':
    'Killer / Hillbilly / Shop Lubricant (Uncommon)',
  'itemaddons/iconaddon_socketswivels.png':
    'Toolbox / Socket Swivels (Uncommon)',
  'itemaddons/iconaddon_sootthebeast.png':
    'Killer / Wraith / "The Beast" - Soot (Common)',
  'itemaddons/iconaddon_soottheghost.png':
    'Killer / Wraith / "The Ghost" - Soot (Common)',
  'itemaddons/iconaddon_sootthehound.png':
    'Killer / Wraith / "The Hound" - Soot (Common)',
  'itemaddons/iconaddon_soottheserpent.png':
    'Killer / Wraith / "The Serpent" - Soot (Common)',
  'itemaddons/iconaddon_sparkplug.png':
    'Killer / Hillbilly / Spark Plug (Common)',
  'itemaddons/iconaddon_spasmodicbreath.png':
    'Killer / Nurse / Spasmodic Breath (Rare)',
  'itemaddons/iconaddon_speedlimiter.png':
    'Killer / Leatherface / Speed Limiter (Uncommon)',
  'itemaddons/iconaddon_spikedboots.png':
    'Killer / Hillbilly / Spiked Boots (Uncommon)',
  'itemaddons/iconaddon_spiritallseeing.png':
    'Killer / Wraith / "All Seeing" - Spirit (Ultra Rare)',
  'itemaddons/iconaddon_sponge.png': 'MedKit / Sponge (Uncommon)',
  'itemaddons/iconaddon_spoolofwire.png': 'Toolbox / Wire Spool (Uncommon)',
  'itemaddons/iconaddon_springclamp.png': 'Toolbox / Spring Clamp (Uncommon)',
  'itemaddons/iconaddon_stampodd.png': 'Map / Odd Stamp (Rare)',
  'itemaddons/iconaddon_stampunusual.png': 'Map / Unusual Stamp (Uncommon)',
  'itemaddons/iconaddon_stichedbag.png':
    'Killer / Trapper / Stitched Bag (Very Rare)',
  'itemaddons/iconaddon_stypticagent.png': 'MedKit / Styptic Agent (Very Rare)',
  'itemaddons/iconaddon_surgicalsuture.png': 'MedKit / Surgical Suture (Rare)',
  'itemaddons/iconaddon_syringe.png':
    'MedKit / Anti-Hemorrhagic Syringe (Ultra Rare)',
  'itemaddons/iconaddon_tapsetters.png':
    'Killer / Trapper / Trap Setters (Uncommon)',
  'itemaddons/iconaddon_tarbottle.png': 'Killer / Trapper / Tar Bottle (Rare)',
  'itemaddons/iconaddon_thethompsonsmix.png':
    "Killer / Hillbilly / The Thompson's Mix (Rare)",
  'itemaddons/iconaddon_thompsonsmoonshine.png':
    "Killer / Hillbilly / Thompson's Moonshine (Very Rare)",
  'itemaddons/iconaddon_threadedfilament.png':
    'Flashlight / Low Amp Filament (Uncommon)',
  'itemaddons/iconaddon_tiroptic.png': 'Flashlight / TIR Optic (Uncommon)',
  'itemaddons/iconaddon_tokenerroded.png': 'Key / Eroded Token (Uncommon)',
  'itemaddons/iconaddon_tokengold.png': 'Key / Gold Token (Rare)',
  'itemaddons/iconaddon_tornbookmark.png':
    'Killer / Nurse / Torn Bookmark (Ultra Rare)',
  'itemaddons/iconaddon_trapperbag.png':
    'Killer / Trapper / Trapper Bag (Uncommon)',
  'itemaddons/iconaddon_trappergloves.png':
    'Killer / Trapper / Trapper Gloves (Common)',
  'itemaddons/iconaddon_trappersack.png':
    'Killer / Trapper / Trapper Sack (Common)',
  'itemaddons/iconaddon_uniquering.png':
    'Key / Unique Wedding Ring (Very Rare)',
  'itemaddons/iconaddon_vegetableoil.png':
    'Killer / Leatherface / Vegetable Oil (Common)',
  'itemaddons/iconaddon_waxbrick.png': 'Killer / Trapper / Wax Brick (Rare)',
  'itemaddons/iconaddon_weavedring.png': 'Key / Weaved Ring (Very Rare)',
  'itemaddons/iconaddon_whiteblindwarrior.png':
    'Killer / Wraith / "Blind Warrior" - White (Rare)',
  'itemaddons/iconaddon_whiteblink.png':
    'Killer / Wraith / "Blink" - White (Rare)',
  'itemaddons/iconaddon_whitekuntintakkho.png':
    'Killer / Wraith / "Swift Hunt" - White (Rare)',
  'itemaddons/iconaddon_whitenitcomb.png':
    'Killer / Nurse / White Nit Comb (Common)',
  'itemaddons/iconaddon_whiteshadowdance.png':
    'Killer / Wraith / "Shadow Dance" - White (Rare)',
  'itemaddons/iconaddon_whitewindstorm.png':
    'Killer / Wraith / "Windstorm" - White (Rare)',
  'itemaddons/iconaddon_widelens.png': 'Flashlight / Wide Lens (Common)',
  'itemaddons/iconaddon_woodenhorse.png':
    'Killer / Nurse / Wooden Horse (Common)',
  'itemaddons/kenya/iconaddon_colddirt.png':
    'Killer / Legion / Cold Dirt (Very Rare)',
  'itemaddons/kenya/iconaddon_defacedsmileybutton.png':
    'Killer / Legion / Defaced Smiley Pin (Uncommon)',
  'itemaddons/kenya/iconaddon_etchedruler.png':
    'Killer / Legion / Etched Ruler (Uncommon)',
  'itemaddons/kenya/iconaddon_filthyblade.png':
    'Killer / Legion / Filthy Blade (Very Rare)',
  'itemaddons/kenya/iconaddon_franksmixtape.png':
    "Killer / Legion / Frank's Mix Tape (Very Rare)",
  'itemaddons/kenya/iconaddon_friendshipbracelet.png':
    'Killer / Legion / Friendship Bracelet (Common)',
  'itemaddons/kenya/iconaddon_fumingmixtape.png':
    'Killer / Legion / Fuming Mix Tape (Ultra Rare)',
  'itemaddons/kenya/iconaddon_iridescentbutton.png':
    'Killer / Legion / Iridescent Button (Ultra Rare)',
  'itemaddons/kenya/iconaddon_joeysmixtape.png':
    "Killer / Legion / Joey's Mix Tape (Rare)",
  'itemaddons/kenya/iconaddon_juliesmixtape.png':
    "Killer / Legion / Julie's Mix Tape (Uncommon)",
  'itemaddons/kenya/iconaddon_mischieflist.png':
    'Killer / Legion / Mischief List (Common)',
  'itemaddons/kenya/iconaddon_muralsketch.png':
    'Killer / Legion / Mural Sketch (Uncommon)',
  'itemaddons/kenya/iconaddon_nastyblade.png':
    'Killer / Legion / Nasty Blade (Rare)',
  'itemaddons/kenya/iconaddon_neversleeppills.png':
    'Killer / Legion / Never-Sleep Pills (Uncommon)',
  'itemaddons/kenya/iconaddon_scratchedruler.png':
    'Killer / Legion / Scratched Ruler (Common)',
  'itemaddons/kenya/iconaddon_smileyfacebutton.png':
    'Killer / Legion / Smiley Face Pin (Common)',
  'itemaddons/kenya/iconaddon_stabwoundsstudy.png':
    'Killer / Legion / Stab Wounds Study (Very Rare)',
  'itemaddons/kenya/iconaddon_stolensketchbook.png':
    'Killer / Legion / Stolen Sketch Book (Rare)',
  'itemaddons/kenya/iconaddon_suziesmixtape.png':
    "Killer / Legion / Susie's Mix Tape (Rare)",
  'itemaddons/kenya/iconaddon_thelegionbutton.png':
    'Killer / Legion / The Legion Pin (Rare)',
  'itemaddons/mali/iconaddon_ashenapple.png':
    'Killer / Plague / Ashen Apple (Rare)',
  'itemaddons/mali/iconaddon_blackincense.png':
    'Killer / Plague / Black Incense (Ultra Rare)',
  'itemaddons/mali/iconaddon_devoteesamulet.png':
    "Killer / Plague / Devotee's Amulet (Very Rare)",
  'itemaddons/mali/iconaddon_emeticpotion.png':
    'Killer / Plague / Emetic potion (Uncommon)',
  'itemaddons/mali/iconaddon_exorcismamulet.png':
    'Killer / Plague / Exorcism Amulet (Rare)',
  'itemaddons/mali/iconaddon_healingsalve.png':
    'Killer / Plague / Healing Salve (Common)',
  'itemaddons/mali/iconaddon_hematiteseal.png':
    'Killer / Plague / Hematite Seal (Uncommon)',
  'itemaddons/mali/iconaddon_incensedointment.png':
    'Killer / Plague / Incensed Ointment (Rare)',
  'itemaddons/mali/iconaddon_infectedemetic.png':
    'Killer / Plague / Infected Emetic (Rare)',
  'itemaddons/mali/iconaddon_iridescentseal.png':
    'Killer / Plague / Iridescent Seal (Ultra Rare)',
  'itemaddons/mali/iconaddon_limestoneseal.png':
    'Killer / Plague / Limestone Seal (Common)',
  'itemaddons/mali/iconaddon_olibanumincense.png':
    'Killer / Plague / Olibanum Incense (Common)',
  'itemaddons/mali/iconaddon_potenttincture.png':
    'Killer / Plague / Potent Tincture (Uncommon)',
  'itemaddons/mali/iconaddon_prayerapple.png':
    'Killer / Plague / Blessed Apple (Uncommon)',
  'itemaddons/mali/iconaddon_prayertabletfragment.png':
    'Killer / Plague / Prayer Tablet Fragment (Common)',
  'itemaddons/mali/iconaddon_prophylacticamulet.png':
    'Killer / Plague / Prophylactic Amulet (Uncommon)',
  'itemaddons/mali/iconaddon_rubbingoil.png':
    'Killer / Plague / Rubbing Oil (Rare)',
  'itemaddons/mali/iconaddon_severedtoe.png':
    'Killer / Plague / Severed Toe (Very Rare)',
  'itemaddons/mali/iconaddon_vileemetic.png':
    'Killer / Plague / Vile Emetic (Very Rare)',
  'itemaddons/mali/iconaddon_worshiptablet.png':
    'Killer / Plague / Worship Tablet (Very Rare)',
  'itemaddons/oman/iconaddon_caughtontape.png':
    'Killer / Ghostface / “Ghost Face Caught on Tape” (Ultra Rare)',
  'itemaddons/oman/iconaddon_cheapcologne.png':
    'Killer / Ghostface / Cheap Cologne (Common)',
  'itemaddons/oman/iconaddon_chewedpen.png':
    'Killer / Ghostface / Chewed Pen (Rare)',
  'itemaddons/oman/iconaddon_driverslicense.png':
    "Killer / Ghostface / Driver's License (Very Rare)",
  'itemaddons/oman/iconaddon_droplegknifesheath.png':
    'Killer / Ghostface / Drop-Leg Knife Sheath (Very Rare)',
  'itemaddons/oman/iconaddon_headlinescutouts.png':
    'Killer / Ghostface / Headlines Cutouts (Common)',
  'itemaddons/oman/iconaddon_knifebeltclip.png':
    'Killer / Ghostface / Knife Belt Clip (Rare)',
  'itemaddons/oman/iconaddon_lastingperfume.png':
    'Killer / Ghostface / Lasting Perfume (Rare)',
  'itemaddons/oman/iconaddon_leatherknifesheath.png':
    'Killer / Ghostface / Leather Knife Sheath (Rare)',
  'itemaddons/oman/iconaddon_markedmap.png':
    'Killer / Ghostface / Marked Map (Uncommon)',
  'itemaddons/oman/iconaddon_nightvisionmoncular.png':
    'Killer / Ghostface / Night Vision Monocular (Very Rare)',
  'itemaddons/oman/iconaddon_olsensaddressbook.png':
    "Killer / Ghostface / Olsen's Address Book (Uncommon)",
  'itemaddons/oman/iconaddon_olsensjournal.png':
    'Killer / Ghostface / Olsen’s Journal (Uncommon)',
  'itemaddons/oman/iconaddon_olsenswallet.png':
    'Killer / Ghostface / Olsen’s Wallet (Rare)',
  'itemaddons/oman/iconaddon_outdoorsecuritycamera.png':
    'Killer / Ghostface / Outdoor Security Camera (Ultra Rare)',
  'itemaddons/oman/iconaddon_philly.png':
    'Killer / Ghostface / “Philly” (Common)',
  'itemaddons/oman/iconaddon_reusuablecinchstraps.png':
    'Killer / Ghostface / Cinch Straps  (Uncommon)',
  'itemaddons/oman/iconaddon_telephotolens.png':
    'Killer / Ghostface / Telephoto Lens (Uncommon)',
  'itemaddons/oman/iconaddon_victimsdetailedroutine.png':
    'Killer / Ghostface / Victim’s Detailed Routine (Very Rare)',
  'itemaddons/oman/iconaddon_walleyesmatchbook.png':
    'Killer / Ghostface / Walleyes Matchbook (Common)',
  'itemaddons/qatar/iconaddon_barbsglasses.png':
    "Killer / Demogorgon / Barb's Glasses (Uncommon)",
  'itemaddons/qatar/iconaddon_blackheart.png':
    'Killer / Demogorgon / Black Heart (Common)',
  'itemaddons/qatar/iconaddon_brasscaselighter.png':
    'Killer / Demogorgon / Brass Case Lighter (Rare)',
  'itemaddons/qatar/iconaddon_deerlung.png':
    'Killer / Demogorgon / Deer Lung (Rare)',
  'itemaddons/qatar/iconaddon_elevenssoda.png':
    "Killer / Demogorgon / Eleven's Soda (Rare)",
  'itemaddons/qatar/iconaddon_leproselichen.png':
    'Killer / Demogorgon / Leprose Lichen (Ultra Rare)',
  'itemaddons/qatar/iconaddon_lifeguardwhistle.png':
    'Killer / Demogorgon / Lifeguard Whistle (Very Rare)',
  'itemaddons/qatar/iconaddon_mewsguts.png':
    "Killer / Demogorgon / Mew's Guts (Uncommon)",
  'itemaddons/qatar/iconaddon_ratliver.png':
    'Killer / Demogorgon / Rat Liver (Common)',
  'itemaddons/qatar/iconaddon_rattail.png':
    'Killer / Demogorgon / Rat Tail (Common)',
  'itemaddons/qatar/iconaddon_redmoss.png':
    'Killer / Demogorgon / Red Moss (Ultra Rare)',
  'itemaddons/qatar/iconaddon_rottengreentripe.png':
    'Killer / Demogorgon / Rotten Green Tripe (Uncommon)',
  'itemaddons/qatar/iconaddon_rottenpumpkin.png':
    'Killer / Demogorgon / Rotten Pumpkin (Common)',
  'itemaddons/qatar/iconaddon_stickylining.png':
    'Killer / Demogorgon / Sticky Lining (Uncommon)',
  'itemaddons/qatar/iconaddon_thornyvines.png':
    'Killer / Demogorgon / Thorny Vines (Rare)',
  'itemaddons/qatar/iconaddon_unknownegg.png':
    'Killer / Demogorgon / Unknown Egg (Very Rare)',
  'itemaddons/qatar/iconaddon_upsidedownresin.png':
    'Killer / Demogorgon / Upside Down Resin (Very Rare)',
  'itemaddons/qatar/iconaddon_vermillionwebcap.png':
    'Killer / Demogorgon / Vermillion Webcap (Very Rare)',
  'itemaddons/qatar/iconaddon_violetwaxcap.png':
    'Killer / Demogorgon / Violet Waxcap (Rare)',
  'itemaddons/qatar/iconaddon_viscouswebbing.png':
    'Killer / Demogorgon / Viscous Webbing (Uncommon)',
  'itemaddons/sweden/iconaddon_akitoscrutch.png':
    "Killer / Oni / Akito's Crutch (Very Rare)",
  'itemaddons/sweden/iconaddon_blackenedtoenail.png':
    'Killer / Oni / Blackened Toenail (Common)',
  'itemaddons/sweden/iconaddon_bloodysash.png':
    'Killer / Oni / Bloody Sash (Uncommon)',
  'itemaddons/sweden/iconaddon_childswoodensword.png':
    "Killer / Oni / Child's Wooden Sword (Uncommon)",
  'itemaddons/sweden/iconaddon_chippedsaihai.png':
    'Killer / Oni / Chipped Saihai (Uncommon)',
  'itemaddons/sweden/iconaddon_crackedsakazuki.png':
    'Killer / Oni / Cracked Sakazuki (Common)',
  'itemaddons/sweden/iconaddon_inklion.png':
    'Killer / Oni / Ink Lion (Uncommon)',
  'itemaddons/sweden/iconaddon_iridescentfamilycrest.png':
    'Killer / Oni / Iridescent Family Crest (Ultra Rare)',
  'itemaddons/sweden/iconaddon_kanaianzentalisman.png':
    'Killer / Oni / Kanai-anzen Talisman (Rare)',
  'itemaddons/sweden/iconaddon_lionfang.png':
    'Killer / Oni / Lion Fang (Very Rare)',
  'itemaddons/sweden/iconaddon_paperlantern.png':
    'Killer / Oni / Yaku-Yoke Talisman (Common)',
  'itemaddons/sweden/iconaddon_polishedmaedate.png':
    'Killer / Oni / Polished Maedate (Uncommon)',
  'itemaddons/sweden/iconaddon_renirosbloodyglove.png':
    'Killer / Oni / Renjiro’s Bloody Glove (Ultra Rare)',
  'itemaddons/sweden/iconaddon_rottingrope.png':
    'Killer / Oni / Rotting Rope (Common)',
  'itemaddons/sweden/iconaddon_scalpedtopknot.png':
    'Killer / Oni / Scalped Topknot (Rare)',
  'itemaddons/sweden/iconaddon_shatteredwakizashi.png':
    'Killer / Oni / Shattered Wakizashi (Rare)',
  'itemaddons/sweden/iconaddon_splinteredhull.png':
    'Killer / Oni / Splintered Hull (Very Rare)',
  'itemaddons/sweden/iconaddon_tearsoakedtenugui.png':
    'Killer / Oni / Tear Soaked Tenugui (Very Rare)',
  'itemaddons/sweden/iconaddon_woodenonimask.png':
    'Killer / Oni / Wooden Oni Mask (Rare)',
  'itemaddons/sweden/iconaddon_yamaokasashimono.png':
    'Killer / Oni / Yamaoka Sashimono (Rare)',
  'itemaddons/ukraine/iconaddon_barbedwire.png':
    'Killer / Deathslinger / Barbed Wire (Very Rare)',
  'itemaddons/ukraine/iconaddon_bayshorescigar.png':
    'Killer / Deathslinger / Bayshore’s Cigar (Very Rare)',
  'itemaddons/ukraine/iconaddon_bayshoresgoldtooth.png':
    'Killer / Deathslinger / Bayshore’s Gold Tooth (Rare)',
  'itemaddons/ukraine/iconaddon_chewingtobacco.png':
    'Killer / Deathslinger / Chewing Tobacco (Uncommon)',
  'itemaddons/ukraine/iconaddon_clearcreekwhiskey.png':
    'Killer / Deathslinger / Gold Creek Whiskey (Very Rare)',
  'itemaddons/ukraine/iconaddon_hellshireiron.png':
    'Killer / Deathslinger / Hellshire Iron (Ultra Rare)',
  'itemaddons/ukraine/iconaddon_honeylocustthorns.png':
    'Killer / Deathslinger / Honey Locust Thorns  (Rare)',
  'itemaddons/ukraine/iconaddon_iridescentcoin.png':
    'Killer / Deathslinger / Iridescent Coin (Ultra Rare)',
  'itemaddons/ukraine/iconaddon_jawsmasher.png':
    'Killer / Deathslinger / Jaw Smasher  (Uncommon)',
  'itemaddons/ukraine/iconaddon_marshalsbadge.png':
    "Killer / Deathslinger / Marshal's Badge  (Uncommon)",
  'itemaddons/ukraine/iconaddon_modifiedammobelt.png':
    'Killer / Deathslinger / Modified Ammo Belt  (Common)',
  'itemaddons/ukraine/iconaddon_poisonoakleaves.png':
    'Killer / Deathslinger / Poison Oak Leaves (Uncommon)',
  'itemaddons/ukraine/iconaddon_prisonchain.png':
    'Killer / Deathslinger / Prison Chain (Very Rare)',
  'itemaddons/ukraine/iconaddon_ricketychain.png':
    'Killer / Deathslinger / Rickety Chain (Common)',
  'itemaddons/ukraine/iconaddon_rustedspike.png':
    'Killer / Deathslinger / Rusted Spike  (Uncommon)',
  'itemaddons/ukraine/iconaddon_snakeoil.png':
    'Killer / Deathslinger / Snake Oil  (Common)',
  'itemaddons/ukraine/iconaddon_spitpolishrag.png':
    'Killer / Deathslinger / Spit Polish Rag  (Common)',
  'itemaddons/ukraine/iconaddon_tinoilcan.png':
    'Killer / Deathslinger / Tin Oil Can  (Rare)',
  'itemaddons/ukraine/iconaddon_wantedposter.png':
    'Killer / Deathslinger / Wanted Poster  (Rare)',
  'itemaddons/ukraine/iconaddon_wardenskeys.png':
    'Killer / Deathslinger / Warden’s Keys  (Rare)',
  'itemaddons/dlc6/iconaddon_awardwinningchili.png':
    'Killer / Cannibal / Award-Winning Chili (Very Rare)',
  'itemaddons/dlc6/iconaddon_chili.png': 'Killer / Cannibal / Chili (Uncommon)',
  'itemaddons/dlc6/iconaddon_knifescratches.png':
    'Killer / Cannibal / Knife Scratches (Uncommon)',
  'itemaddons/dlc6/iconaddon_thebeastsmark.png':
    "Killer / Cannibal / Beast's Marks (Rare)",
  'itemaddons/dlc6/iconaddon_thegrease.png':
    'Killer / Cannibal / The Grease (Rare)',
  'itemaddons/guam/iconaddon_bottleofchloroform.png':
    'Killer / Clown / Bottle of Chloroform (Rare)',
  'itemaddons/guam/iconaddon_cheapginbottle.png':
    'Killer / Clown / Cheap Gin Bottle (Very Rare)',
  'itemaddons/guam/iconaddon_cigarbox.png':
    'Killer / Clown / Cigar Box (Very Rare)',
  'itemaddons/guam/iconaddon_ether10.png':
    'Killer / Clown / Ether 10 Vol% (Rare)',
  'itemaddons/guam/iconaddon_ether15.png':
    'Killer / Clown / Ether 15 Vol% (Very Rare)',
  'itemaddons/guam/iconaddon_flaskofbleach.png':
    'Killer / Clown / Flask of Bleach (Rare)',
  'itemaddons/guam/iconaddon_garishmakeupkit.png':
    'Killer / Clown / Garish Makeup Kit (Very Rare)',
  'itemaddons/guam/iconaddon_sulfuricacidvial.png':
    'Killer / Clown / Sulphuric Acid Vial (Rare)',
  'itemaddons/guam/iconaddon_tattoosmiddlefinger.png':
    "Killer / Clown / Tatto's Middle Finger (Ultra Rare)",
  'itemaddons/guam/iconaddon_vhsporn.png': 'Killer / Clown / VHS Porn (Rare)',
  'itemaddons/iconaddon_gum.png': 'Unused / Gum',
  'itemaddons/iconaddon_inhaler.png': 'Unused / Inhaler',
  'itemaddons/iconaddon_sootshadowdance.png':
    'Killer / Wraith / "Shadow Dance" - Soot (Common)',
  'itemaddons/wales/iconaddon_blackstrap.png':
    'Killer / Executioner / Black Strap (Common)',
  'itemaddons/wales/iconaddon_burningmanpainting.png':
    'Killer / Executioner / Burning Man Painting (Rare)',
  'itemaddons/wales/iconaddon_cinderellamusicbox.png':
    'Killer / Executioner / Cinderella Music Box (Uncommon)',
  'itemaddons/wales/iconaddon_copperring.png':
    'Killer / Executioner / Copper Ring (Common)',
  'itemaddons/wales/iconaddon_crimsonceremonybook.png':
    'Killer / Executioner / Crimson Ceremony Book (Very Rare)',
  'itemaddons/wales/iconaddon_deadbutterfly.png':
    'Killer / Executioner / Dead Butterfly (Common)',
  'itemaddons/wales/iconaddon_forgottenvideotape.png':
    'Killer / Executioner / Forgotten Videotape (Uncommon)',
  'itemaddons/wales/iconaddon_iridescentseal.png':
    'Killer / Executioner / Iridescent Seal of Metatron (Ultra Rare)',
  'itemaddons/wales/iconaddon_leadring.png':
    'Killer / Executioner / Lead Ring (Common)',
  'itemaddons/wales/iconaddon_leopardprintfabric.png':
    'Killer / Executioner / Leopard Print Fabric (Uncommon)',
  'itemaddons/wales/iconaddon_lostmemoriesbook.png':
    'Killer / Executioner / Lost Memories Book (Very Rare)',
  'itemaddons/wales/iconaddon_mannequinfoot.png':
    'Killer / Executioner / Mannequin Foot (Rare)',
  'itemaddons/wales/iconaddon_mistyday.png':
    'Killer / Executioner / Misty Day, Remains of Judgement (Rare)',
  'itemaddons/wales/iconaddon_obsidiangoblet.png':
    'Killer / Executioner / Obsidian Goblet (Ultra Rare)',
  'itemaddons/wales/iconaddon_rustcoloredegg.png':
    'Killer / Executioner / Rust Colored Egg (Very Rare)',
  'itemaddons/wales/iconaddon_scarletegg.png':
    'Killer / Executioner / Scarlet Egg (Very Rare)',
  'itemaddons/wales/iconaddon_spearhead.png':
    'Killer / Executioner / Spearhead (Uncommon)',
  'itemaddons/wales/iconaddon_tabletoftheoppressor.png':
    'Killer / Executioner / Tablet of the Oppressor (Rare)',
  'itemaddons/wales/iconaddon_valtielsectphotograph.png':
    'Killer / Executioner / Valtiel Sect Photograph (Rare)',
  'itemaddons/wales/iconaddon_waxdoll.png':
    'Killer / Executioner / Wax Doll (Uncommon)',
  'itemaddons/cannibal/iconaddon_iridescentflesh.png':
    'Killer / Cannibal / Iridescent Flesh (Ultra Rare)',
  'itemaddons/xipre/iconaddon_apexmuffler.png':
    'Killer / Hillbilly / Apex Muffler (Very Rare)',
  'itemaddons/xipre/iconaddon_bigbuckle.png':
    'Killer / Hillbilly / Big Buckle (Uncommon)',
  'itemaddons/xipre/iconaddon_blackgrease.png':
    'Killer / Hillbilly / Black Grease (Rare)',
  'itemaddons/xipre/iconaddon_dadsboots.png':
    "Killer / Hillbilly / Dad's Boots (Common)",
  'itemaddons/xipre/iconaddon_deathengravings.png':
    'Killer / Hillbilly / Death Engravings (Uncommon)',
  'itemaddons/xipre/iconaddon_doomengravings.png':
    'Killer / Hillbilly / Doom Engravings (Rare)',
  'itemaddons/xipre/iconaddon_heavyclutch.png':
    'Killer / Hillbilly / Heavy Clutch (Common)',
  'itemaddons/xipre/iconaddon_iridescentbrick.png':
    'Killer / Hillbilly / Iridescent Brick (Ultra Rare)',
  'itemaddons/xipre/iconaddon_junkyardairfilter.png':
    'Killer / Hillbilly / Junkyard Air Filter (Common)',
  'itemaddons/xipre/iconaddon_leafymash.png':
    'Killer / Hillbilly / Leafy Mash (Rare)',
  'itemaddons/xipre/iconaddon_lowkickbackchains.png':
    'Killer / Hillbilly / Low Kickback Chains (Rare)',
  'itemaddons/xipre/iconaddon_lowprochains.png':
    'Killer / Hillbilly / LoPro Chains (Ultra Rare)',
  'itemaddons/xipre/iconaddon_mothershelpers.png':
    "Killer / Hillbilly / Mother's Helpers (Rare)",
  'itemaddons/xipre/iconaddon_offbrandmotoroil.png':
    'Killer / Hillbilly / Off-brand Motor Oil (Uncommon)',
  'itemaddons/xipre/iconaddon_pighousegloves.png':
    'Killer / Hillbilly / Pighouse Gloves (Very Rare)',
  'itemaddons/xipre/iconaddon_puncturedmuffler.png':
    'Killer / Hillbilly / Punctured Muffler (Uncommon)',
  'itemaddons/xipre/iconaddon_speedlimiter.png':
    'Killer / Hillbilly / Speed Limiter (Uncommon)',
  'itemaddons/xipre/iconaddon_spikedboots.png':
    'Killer / Hillbilly / Spiked Boots (Very Rare)',
  'itemaddons/xipre/iconaddon_steeltoeboots.png':
    'Killer / Hillbilly / Steel toe Boots (Common)',
  'itemaddons/xipre/iconaddon_tunedcarburetor.png':
    'Killer / Hillbilly / Tuned Carburetor (Very Rare)'
};

export default function getLanguage(filePath: string) {
  return addons[filePath] || null;
}
