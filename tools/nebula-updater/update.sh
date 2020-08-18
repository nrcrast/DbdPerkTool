#!/bin/bash
DIR=$1

pushd "$DIR"

mkdir Custom

echo "===== Blue ====="
mkdir -p Custom/Blue
mv "Monochrome Perks (choose the color)"/"BLUE perks" Custom/Blue/Perks

echo "===== Light Blue ====="
mkdir -p Custom/LightBlue
mv "Monochrome Perks (choose the color)"/"LIGHT BLUE perks" Custom/LightBlue/Perks

echo "===== Dark Blue ====="
mkdir -p Custom/DarkBlue
mv "Monochrome Perks (choose the color)"/"DARK BLUE perks" Custom/DarkBlue/Perks

echo "===== Grey ====="
mkdir -p Custom/Grey
mv "Monochrome Perks (choose the color)"/"GREY perks" Custom/Grey/Perks

echo "===== Pink ====="
mkdir -p Custom/Pink
mv "Monochrome Perks (choose the color)"/"PINK perks" Custom/Pink/Perks

echo "===== Purple ====="
mkdir -p Custom/Purple
mv "Monochrome Perks (choose the color)"/"PURPLE perks" Custom/Purple/Perks

echo "===== Red ====="
mkdir -p Custom/Red
mv "Monochrome Perks (choose the color)"/"RED perks" Custom/Red/Perks

popd