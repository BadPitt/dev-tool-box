const FS = require('fs');
const Path = require('path');

function apply(manifestOptions, imagesOptions, compiler) {
	compiler.plugin('emit', function (compilation, callback) {

		console.log("ManifestPlugin starts");

		processImages(compilation, imagesOptions);

		processManifest(compilation, manifestOptions);

		callback();
	});
}

function processManifest(compilation, manifestOptions) {
	let manifest = JSON.stringify(manifestOptions.manifestData, null, 2);
	// Insert this list into the Webpack build as a new file asset:
	manifestOptions.manifestFileName =
		manifestOptions.manifestFileName || 'manifest.json';
	compilation.assets[manifestOptions.manifestFileName] = {
		source: function () {
			return manifest;
		},
		size: function () {
			return manifest.length;
		}
	};
}

function processImages(compilation, imagesOptions) {
	let {path, pattern, root, outputDirectory=''} = imagesOptions;
	if (!path.match(`^${Path.sep}`)) {
		path = Path.sep + path;
	}
	var images = getImages(path, pattern, root);
	for (let prop in images) {
		if (images.hasOwnProperty(prop)) {
			if (outputDirectory.length > 0 &&
				!outputDirectory.match(`${Path.sep}$`)) {
				outputDirectory = outputDirectory + Path.sep;
			}
			compilation.assets[outputDirectory + images[prop].name] = {
				source: function () {
					return images[prop].file;
				},
				size: function () {
					return images[prop].file.length;
				}
			};
		}
	}
}

function getImages(filename, pattern, root = Path.sep) {
	let images = {};
	if (FS.statSync(root + filename).isDirectory()) {
		root = root + filename;
		let files = FS.readdirSync(root);
		for (let i = 0; i < files.length; i++) {
			if (FS.statSync(root + files[i]).isDirectory()) {
				let innerImages = getImages(files[i], pattern, root);
				for (let prop in innerImages) {
					if (innerImages.hasOwnProperty(prop)) {
						images[prop] = innerImages[prop];
					}
				}
			}
			if (files[i].match(pattern)) {
				images[root + files[i]] = {
					name: files[i],
					file: FS.readFileSync(root + files[i])
				};
			}
		}
	} else {
		images[root + filename] = {
			name: filename,
			file:FS.readFileSync(root + filename)
		};
	}
	return images;
}

/**
 * @param manifestOptions - container object for manifest options
 * 		  manifestOptions.manifestFileName  - name of manifest file
 * 		  manifestOptions.manifestData - manifest
 *
 * @param imagesOptions - container object for images options
 * 		  imagesOptions.path - path to assets
 * 		  imagesOptions.pattern - /\.png/ for example
 * 		  imagesOptions. root - __dirname
 *
 * @returns {{apply: any}}
 */
module.exports = function (manifestOptions, imagesOptions) {

	console.dir(manifestOptions);
	console.dir(imagesOptions);

	return {
		apply: apply.bind(this, manifestOptions, imagesOptions)
	};
};
