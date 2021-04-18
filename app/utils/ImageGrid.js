import { default as Canvas } from 'canvas';
import fs from 'fs-extra';
import logger from 'electron-log';

export default class ImageGrid {
	static async generate(images, opts) {
		const { imgHeight, imgWidth, padding, gridWidth } = opts;

		const canvas = Canvas.createCanvas(0, 0);
		const xPadding = (gridWidth - 1) * padding;
		canvas.width = imgWidth * gridWidth + xPadding;

		const numRows = Math.ceil(images.length / gridWidth);
		const yPadding = numRows > 1 ? (numRows - 1) * padding : 0;
		// console.log('Num Rows: ' + numRows);
		// console.log('Y Padding: ' + yPadding);
		canvas.height = imgHeight * numRows + yPadding;

		const ctx = canvas.getContext('2d');
		let currentRow = 0;
		let currentX = 0;
		let currentY = 0;
		for (let i = 0; i < images.length; i++) {
			if (i > 0 && i % gridWidth === 0) {
				currentX = 0;
				currentY += imgHeight + padding;
				currentRow++;
			}
			let img;
			try {
				logger.debug(`Loading image: ${images[i]}`);
				img = await Canvas.loadImage(await fs.promises.readFile(images[i]));
			} catch (err) {
				logger.error(`Error loading image: ${images[i]}`, err);
			}

			ctx.drawImage(img, currentX, currentY, imgWidth, imgHeight);
			currentX += imgWidth + padding;
		}

		return new Promise((resolve, reject) => {
			canvas.toBuffer(
				(err, buf) => {
					if (err) {
						reject(err);
						return;
					}
					// Buf is a PNG
					resolve(buf);
				},
				'image/png',
				{ compressionLevel: 9 },
			);
		});
	}
}
