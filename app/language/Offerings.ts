const languageMap: { [key: string]: string } = {
  'favors/anniversary/iconfavors_bloodypartystreamers.png':
    'Bloody Party Streamers (Rare)',
  'favors/anniversary/iconfavors_escapecake.png': 'Escape! Cake (Uncommon)',
  'favors/anniversary/iconfavors_gruesomegateau.png': 'Gruesome Gateau',
  'favors/anniversary/iconfavors_survivorpudding.png':
    'Survivor Pudding (Uncommon)',
  'favors/cannibal/iconfavors_bonesplinter.png': 'Bone Splinter (Ultra Rare)',
  'favors/dlc2/iconfavors_blacksplinter.png': 'Black Splinter (Ultra Rare)',
  'favors/dlc2/iconfavors_decrepitclapboard.png':
    'Decrepit Clapboard (Uncommon)',
  'favors/dlc2/iconfavors_harvestfestivalleaflet.png':
    'Harvest Festival Leaflet (Common)',
  'favors/dlc2/iconfavors_stroderealtykey.png': 'Strode Realty Key (Rare)',
  'favors/dlc3/iconfavors_fumingcordage.png': 'Fuming Cordage (Common)',
  'favors/dlc3/iconfavors_fumingwelcomesign.png':
    'Fuming Welcome Sign (Uncommon)',
  'favors/dlc3/iconfavors_granmascookbook.png': "Grandma's Cookbook (Rare)",
  'favors/dlc3/iconfavors_muddysplinter.png': 'Muddy Splinter (Ultra Rare)',
  'favors/dlc4/iconfavors_emergencycertificate.png':
    'Emergency Certificate (Common)',
  'favors/dlc4/iconfavors_psychiatricassessmentreport.png':
    'Psychiatric Assessment Report (Uncommon)',
  'favors/dlc4/iconfavors_shatteredglasses.png': 'Shattered Glasses (Rare)',
  'favors/dlc4/iconfavors_shocksplinter.png': 'Shock Splinter (Ultra Rare)',
  'favors/dlc5/iconfavors_childrensbook.png': "Children's Book (Uncommon)",
  'favors/dlc5/iconfavors_paintedriverrock.png': 'Painted River Rock (Common)',
  'favors/dlc5/iconfavors_thelastmask.png': 'The Last Mask (Rare)',
  'favors/england/iconfavors_smokingsplinter.png':
    'Smoking Splinter (Ultra Rare)',
  'favors/england/iconfavors_thepiedpiper.png': 'The Pied Piper (Rare)',
  'favors/finland/iconfavors_glasssplinter.png': 'Glass Splinter (Ultra Rare)',
  'favors/finland/iconfavors_jigsawpiece.png': 'Jigsaw Piece (Rare)',
  'favors/haiti/iconfavors_yamaokascrest.png': 'Yamaoka Family Crest (Rare)',
  'favors/halloween/iconfavors_pustulapetals.png': 'Pustula Petals',
  'favors/iconfavors_ardentravenwreath.png': 'Ardent Raven Wreath (Rare)',
  'favors/iconfavors_ardentshrikewreath.png': 'Ardent Shrike Wreath (Rare)',
  'favors/iconfavors_ardentspottedowlwreath.png':
    'Ardent Spotted Owl Wreath (Rare)',
  'favors/iconfavors_ardenttanagerwreath.png': 'Ardent Tanager Wreath (Rare)',
  'favors/iconfavors_azarovskey.png': "Azarov's Key (Rare)",
  'favors/iconfavors_blacksaltstatuette.png': 'Black Salt Statuette (Rare)',
  'favors/iconfavors_boglaurelsachet.png': 'Bog Laurel Sachet (Common)',
  'favors/iconfavors_boundenvelope.png': 'Bound Envelope (Rare)',
  'favors/iconfavors_cattletag28.png': 'Cattle Tag-28 (Common)',
  'favors/iconfavors_cattletag81.png': 'Coldwind Cattle Tag-81 (Uncommon)',
  'favors/iconfavors_chalkpouch.png': 'Chalk Pouch (Common)',
  'favors/iconfavors_charredweddingphotograph.png':
    'Charred Wedding Photograph (Rare)',
  'favors/iconfavors_clearreagent.png': 'Clear Reagent (Common)',
  'favors/iconfavors_creamchalkpouch.png': 'Cream Chalk Pouch (Uncommon)',
  'favors/iconfavors_crecentmoonbouquet.png':
    'Crescent Moon Bouquet (Uncommon)',
  'favors/iconfavors_crispleafamaranthsachet.png':
    'Crispleaf Amaranth Sachet (Common)',
  'favors/iconfavors_cutcoin.png': 'Cut Coin (Very Rare)',
  'favors/iconfavors_devoutravenwreath.png': 'Devout Raven Wreath (Uncommon)',
  'favors/iconfavors_devoutshrikewreath.png': 'Devout Shrike Wreath (Uncommon)',
  'favors/iconfavors_devoutspottedowlwreath.png':
    'Devout Spotted Owl Wreath (Uncommon)',
  'favors/iconfavors_devouttanagerwreath.png':
    'Devout Tanager Wreath (Uncommon)',
  'favors/iconfavors_faintreagent.png': 'Faint Reagent (Common)',
  'favors/iconfavors_fragrantboglaurel.png': 'Fragrant Bog Laurel (Rare)',
  'favors/iconfavors_fragrantcrispleafamaranth.png':
    'Fragrant Crispleaf Amaranth (Rare)',
  'favors/iconfavors_fragrantprimroseblossom.png':
    'Fragrant Primrose Blossom (Rare)',
  'favors/iconfavors_fragrantsweetwilliam.png': 'Fragrant Sweet William (Rare)',
  'favors/iconfavors_freshboglaurel.png': 'Fresh Bog Laurel (Uncommon)',
  'favors/iconfavors_freshcrispleafamaranth.png':
    'Fresh Crispleaf Amaranth (Uncommon)',
  'favors/iconfavors_freshprimroseblossom.png':
    'Fresh Primrose Blossom (Uncommon)',
  'favors/iconfavors_freshsweetwilliam.png': 'Fresh Sweet William (Uncommon)',
  'favors/iconfavors_fullmoonbouquet.png': 'Full Moon Bouquet (Very Rare)',
  'favors/iconfavors_hazyreagent.png': 'Hazy Reagent (Uncommon)',
  'favors/iconfavors_heartlocket.png': 'Heart Locket (Rare)',
  'favors/iconfavors_hollowshell.png': 'Hollow Shell (Uncommon)',
  'favors/iconfavors_ivorychalkpouch.png': 'Ivory Chalk Pouch (Rare)',
  'favors/iconfavors_jarofsaltylips.png':
    "Vigo's Jar of Salty Lips (Very Rare)",
  'favors/iconfavors_lunacyticket.png': 'Lunacy Ticket (Common)',
  'favors/iconfavors_macmillianledgerpage.png':
    'MacMillan Ledger Page (Common)',
  'favors/iconfavors_macmilliansphalanxbone.png':
    "MacMillan's Phalanx Bone (Rare)",
  'favors/iconfavors_moldyoak.png': 'Moldy Oak (Uncommon)',
  'favors/iconfavors_momentomoricypress.png': 'Cypress Memento Mori (Uncommon)',
  'favors/iconfavors_momentomoriebony.png': 'Ebony Memento Mori (Ultra Rare)',
  'favors/iconfavors_momentomoriivory.png': 'Ivory Memento Mori (Rare)',
  'favors/iconfavors_murkyreagent.png': 'Murky Reagent (Very Rare)',
  'favors/iconfavors_newmoonbouquet.png': 'New Moon Bouquet (Ultra Rare)',
  'favors/iconfavors_pelliottlunacyticket.png':
    'P.Elliott Lunacy Ticket (Uncommon)',
  'favors/iconfavors_petrifiedoak.png': 'Petrified Oak (Very Rare)',
  'favors/iconfavors_plateshredded.png': 'Shredded Plate (Common)',
  'favors/iconfavors_platevirginia.png': 'Virginia Plate (Uncommon)',
  'favors/iconfavors_primroseblossomsachet.png':
    'Primrose Blossom Sachet (Common)',
  'favors/iconfavors_putridoak.png': 'Putrid Oak (Very Rare)',
  'favors/iconfavors_quartermoonbouquet.png': 'Quarter Moon Bouquet (Uncommon)',
  'favors/iconfavors_ravenwreath.png': 'Raven Wreath (Common)',
  'favors/iconfavors_rottenoak.png': 'Rotten Oak (Rare)',
  'favors/iconfavors_saltpouch.png': 'Salt Pouch (Uncommon)',
  'favors/iconfavors_scratchedcoin.png': 'Scratched Coin (Uncommon)',
  'favors/iconfavors_sealedenvelope.png': 'Sealed Envelope (Uncommon)',
  'favors/iconfavors_shinycoin.png': 'Shiny Coin (Very Rare)',
  'favors/iconfavors_shrikewreath.png': 'Shrike Wreath (Common)',
  'favors/iconfavors_shroudofbinding.png': 'Shroud of Binding (Very Rare)',
  'favors/iconfavors_shroudofseparation.png': 'Shroud of Separation (Uncommon)',
  'favors/iconfavors_shroudofunion.png': 'Shroud of Union (Uncommon)',
  'favors/iconfavors_signedledgerpage.png': 'Signed Ledger Page (Uncommon)',
  'favors/iconfavors_spottedowlwreath.png': 'Spotted Owl Wreath (Common)',
  'favors/iconfavors_sweetwilliamsachet.png': 'Sweet William Sachet (Common)',
  'favors/iconfavors_tanagerwreath.png': 'Tanager Wreath (Common)',
  'favors/iconfavors_tarnishedcoin.png': 'Tarnished Coin (Uncommon)',
  'favors/iconfavors_vigosshroud.png': "Vigo's Shroud (Uncommon)",
  'favors/iconfavors_wardblack.png': 'Black Ward (Very Rare)',
  'favors/iconfavors_wardwhite.png': 'White Ward (Very Rare)',
  'favors/kenya/iconfavors_damagedphoto.png': 'Damaged Photo (Rare)',
  'favors/lunarnewyear/iconfavors_redmoneypacket.png': 'Red Envelope',
  'favors/qatar/iconfavors_hawkinsnationallaboratoryid.png':
    'Hawkins National Laboratory I.D.  (Rare)',
  'favors/summer/iconfavors_bbqinvitation.png': 'BBQ Invitation',
  'favors/ukraine/iconfavors_dustynoose.png': 'Dusty Noose (Rare)'
};

export default function getLanguage(tag) {
  return languageMap[tag] || null;
}
