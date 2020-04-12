const mergeImages = require('merge-images');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const { Canvas, Image } = require('canvas');

if(process.argv.length < 3) {
	console.log('Must supply path to pack');
	process.exit(1);
}

const packDir = process.argv[2];
console.log(`Searching for pack in ${packDir}`);

const bbqPath = path.resolve(packDir, 'Perks', 'Cannibal', 'iconPerks_BBQAndChili.png');
const blPath = path.resolve(packDir, 'Perks', 'iconPerks_balancedLanding.png');
const sbPath = path.resolve(packDir, 'Perks', 'iconPerks_sprintBurst.png');
const enduringPath = path.resolve(packDir, 'Perks', 'iconPerks_enduring.png');

const spacingInBetween = 50;
const marginEnds = 50;
const perkWidthHeight = 256;

const imgWidth = (marginEnds * 2) + (spacingInBetween * 3) + (perkWidthHeight * 4);
const imgHeight = 256 + 32;
const yPadding = (imgHeight - 256) / 2;

const images = [bbqPath, blPath, sbPath, enduringPath];
const mergeOpts = [];

console.log(`Img Height: ${imgHeight} Width: ${imgWidth}`);

let currentX = marginEnds;
for(let i = 0; i < images.length; i++) {
	mergeOpts.push({
		src: images[i], 
		x:  currentX, 
		y: yPadding,
	});
	currentX += perkWidthHeight + spacingInBetween;
}
console.log(mergeOpts);
mergeImages(mergeOpts, {
	width: imgWidth,
	height: imgHeight,
	Canvas: Canvas,
	Image: Image
})
	.then(b64 => {
		let base64Image = b64.split(';base64,').pop();
		const imgBuf = Buffer.from(base64Image, 'base64');
		sharp(imgBuf).resize(1100).toFile('image.png').then(data => {
			console.log('File created');
		});
	}).catch(e => {
		console.log(e);
	});

