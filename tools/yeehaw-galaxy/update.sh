#!/bin/bash
DIR=$1

pushd "$DIR"

mv "Add-ons" "ItemAddOns"
mv "Character Portraits" "CharPortraits"
mv "Offerings" "Favors"
mv "Status Effects" "StatusEffects"
mv "Powers & Action/ACTION" "Actions"
mv "Powers & Action" "Powers"

mkdir Custom

mkdir -p Custom/Pink
mv Perks/Pink Custom/Pink/Perks

mv Perks/Blue/* Perks/
rm -rf Perks/Blue

popd