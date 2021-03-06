const FS = require('fs');
const Path = require('path');
const archiver = require('archiver');

function apply(root, manifestOptions, imagesOptions, compiler) {
	compiler.plugin('emit', function (compilation, callback) {

		console.log("ManifestPlugin starts");

		processLicense(compilation, root);

		processImages(compilation, root, imagesOptions);

		processManifest(compilation, manifestOptions);

		callback();
	});
	compiler.plugin('done', function() {
		processZipArchive(root);
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

function processLicense(compilation, root) {
	let LICENSE = Path.sep + 'LICENSE';
	var license = FS.readFileSync(root + LICENSE);

	compilation.assets[LICENSE] = {
		source: function () {
			return license;
		},
		size: function () {
			return license.length;
		}
	};
}


/**
 * @see archiver documentation https://www.npmjs.com/package/archiver
 *
 * @param root	__dirname
 */
function processZipArchive(root) {
	let target = root+ '/build/';
	// create a file to stream archive data to.
	let output = FS.createWriteStream(target + 'DevToolBox.zip');

	let archive = archiver('zip', {
		zlib: { level: 9 } // Sets the compression level.
	});

	// listen for all archive data to be written
	// 'close' event is fired only when a file descriptor is involved
	output.on('close', function() {
		console.log(archive.pointer() + ' total bytes in archive');
	});
	output.on('end', function() {
		console.log('Data has been drained');
	});
	archive.on('error', function(err) {
		console.log('error has occurred!');
		console.log(err);
	});
	// pipe archive data to the file
	archive.pipe(output);
	archive.glob('**/*[!.zip]', {cwd:'build'});
	// archive.directory(target, false);
	archive.finalize();
	console.log('archive building is done!');
}

function processImages(compilation, root, imagesOptions) {
	let {path, pattern, outputDirectory = ''} = imagesOptions;
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
			file: FS.readFileSync(root + filename)
		};
	}
	return images;
}

/**
 * @param root - __dirname
 *
 * @param manifestOptions - container object for manifest options
 *          manifestOptions.manifestFileName  - name of manifest file
 *          manifestOptions.manifestData - manifest
 *
 * @param imagesOptions - container object for images options
 *          imagesOptions.path - path to assets
 *          imagesOptions.pattern - /\.png/ for example
 *
 * @returns {{apply: any}}
 */
module.exports = function (root, manifestOptions, imagesOptions) {

	console.dir(manifestOptions);
	console.dir(imagesOptions);

	return {
		apply: apply.bind(this, root, manifestOptions, imagesOptions)
	};
};
