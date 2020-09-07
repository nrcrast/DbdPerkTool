#!/bin/bash
DIR=$1

pushd "$DIR"

mv "Add-ons" "ItemAddOns"
mv "Character Portaits" "CharPortraits"
mv "Offerings" "Favors"
mv "Status Effects" "StatusEffects"
mv "Powers & Action/ACTION" "Actions"
mv "Powers & Action" "Powers"

popd