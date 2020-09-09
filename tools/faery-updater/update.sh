#!/bin/bash
PACK_ZIP_PATH=$1

# Constants
PERKS="- CUSTOMIZE YOUR PERKS -"
ADDONS="- CUSTOMIZE YOUR ADDONS -"
ITEMS="- CUSTOMIZE YOUR ITEMS -"
FAVORS="- CUSTOMIZE YOUR OFFERINGS -"
POWERS="- CUSTOMIZE YOUR POWERS -"
STATUS="- CUSTOMIZE YOUR STATUS EFFECTS -"

# Unzip pack
rm -rf ~/faery
echo "Unzipping"
unzip -q "$PACK_ZIP_PATH" -d ~/faery
echo "Unzipped"

pushd ~/faery

mkdir Custom

echo "===== Blue ====="
mkdir -p Custom/Blue
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Blue Edition" ./Custom/Blue/Perks
cp -r ./"$ADDONS"/"Blue" ./Custom/Blue/ItemAddons
cp -r ./"$ITEMS"/"Blue" ./Custom/Blue/Items
cp -r ./"$FAVORS"/"Blue" ./Custom/Blue/Favors
cp -r ./"$POWERS"/"Blue" ./Custom/Blue/Powers
cp -r ./"$STATUS"/"Blue-Purple" ./Custom/Blue/StatusEffects

echo "===== Gold ====="
mkdir -p Custom/Gold
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Gold and Silver Edition"/"Gold" ./Custom/Gold/Perks
cp -r ./"$ITEMS"/"Gold" ./Custom/Gold/Items
cp -r ./"$STATUS"/"Gold" ./Custom/Gold/StatusEffects

echo "===== Silver ====="
mkdir -p Custom/Silver
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Gold and Silver Edition"/"Silver" ./Custom/Silver/Perks
cp -r ./"$ITEMS"/"Silver" ./Custom/Silver/Items

echo "===== Yellow/Green ====="
mkdir -p Custom/Green_Yellow
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Green Edition" ./Custom/Green_Yellow/Perks
cp -r ./"$ITEMS"/"Lemon Yellow" ./Custom/Green_Yellow/Items
cp -r ./"$POWERS"/"Green" ./Custom/Green_Yellow/Powers
cp -r ./"$STATUS"/"Green" ./Custom/Green_Yellow/StatusEffects

echo "===== Black ====="
mkdir -p Custom/Black
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Halloween Edition"/"Black" ./Custom/Black/Perks
cp -r ./"$ADDONS"/"Black and White" ./Custom/Black/ItemAddons
cp -r ./"$ITEMS"/"Black" ./Custom/Black/Items
cp -r ./"$FAVORS"/"Black and White" ./Custom/Black/Favors
cp -r ./"$POWERS"/"Black" ./Custom/Black/Powers
cp -r ./"$STATUS"/"Black" ./Custom/Black/StatusEffects

echo "===== Night Sky ====="
mkdir -p Custom/NightSky
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Halloween Edition"/"Night Sky" ./Custom/NightSky/Perks
cp -r ./"$ITEMS"/"Night Sky" ./Custom/NightSky/Items
cp -r ./"$POWERS"/"Night Sky" ./Custom/NightSky/Powers

echo "===== Orange ====="
mkdir -p Custom/Orange
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Halloween Edition"/"Orange" ./Custom/Orange/Perks
cp -r ./"$ITEMS"/"Orange" ./Custom/Orange/Items
cp -r ./"$POWERS"/"Orange" ./Custom/Orange/Powers

echo "===== Violet ====="
mkdir -p Custom/Violet
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Halloween Edition"/"Violet" ./Custom/Violet/Perks
cp -r ./"$ITEMS"/"Violet" ./Custom/Violet/Items
cp -r ./"$POWERS"/"Violet" ./Custom/Violet/Powers
cp -r ./"$STATUS"/"Violet" ./Custom/Violet/StatusEffects

echo "===== Pastel ====="
mkdir -p Custom/Pastel
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Pastel Edition"/"- PASTEL PACK -" ./Custom/Pastel/Perks
cp -r ./"$ADDONS"/"- PASTEL PACK -" ./Custom/Pastel/ItemAddons
cp -r ./"$ITEMS"/"- PASTEL ITEM PACK -" ./Custom/Pastel/Items
cp -r ./"$FAVORS"/"- PASTEL PACK -" ./Custom/Pastel/Favors
cp -r ./"$POWERS"/"Light Pink" ./Custom/Pastel/Powers
cp -r ./"$STATUS"/"Lavender" ./Custom/Pastel/StatusEffects

echo "===== Pink ====="
mkdir -p Custom/Pink
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Pink Edition" ./Custom/Pink/Perks
cp -r ./"$ADDONS"/"Pink" ./Custom/Pink/ItemAddons
cp -r ./"$ITEMS"/"Pink" ./Custom/Pink/Items
cp -r ./"$FAVORS"/"Pink" ./Custom/Pink/Favors
cp -r ./"$POWERS"/"Pink" ./Custom/Pink/Powers
cp -r ./"$STATUS"/"Pink-Purple" ./Custom/Pink/StatusEffects

echo "===== Purple ====="
mkdir -p Custom/Purple
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Purple Edition" ./Custom/Purple/Perks
cp -r ./"$POWERS"/"Purple" ./Custom/Purple/Powers
cp -r ./"$STATUS"/"Pink-Purple" ./Custom/Purple/StatusEffects

echo "===== Red ====="
mkdir -p Custom/Red
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Red Edition" ./Custom/Red/Perks
cp -r ./"$ITEMS"/"Red" ./Custom/Red/Items
cp -r ./"$POWERS"/"Red" ./Custom/Red/Powers
cp -r ./"$STATUS"/"Red" ./Custom/Red/StatusEffects

echo "===== Ombre ====="
mkdir -p Custom/Ombre
cp -r ./"$PERKS"/"Faery's Galaxy Perks - Ombre Edition"/"- OMBRE PACK -" ./Custom/Ombre/Perks

popd