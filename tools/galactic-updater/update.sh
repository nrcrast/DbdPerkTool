#!/bin/bash
MY_DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"
DIR=$1

pushd "$DIR"

rm -rf Custom
mkdir Custom

ls

function move() {
	echo "===== $1 ====="
	mkdir -p Custom/$1/Pack

	local SRC="- PERK COLORS -"/$1
	local DEST="Custom/$1/Pack/Perks"
	echo "SRC: ${SRC}"
	echo "DEST: ${DEST}"
	cp -r "./$SRC" "./${DEST}"
	node ${MY_DIR}/generateMeta.js $1 > ./${DEST}/../../meta.json
	pushd ${DEST}/../..
	7z a -r ../$1.zip *
	popd
}

move "Aqua"
move "Blue"
move "Fusia"
move "Green"
move "Pink"
move "Purple"
move "Red"
move "Yellow"

popd