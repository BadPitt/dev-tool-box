
function apply(options, compiler) {
	compiler.plugin('emit', function(compilation, callback) {

		console.log("ManifestPlugin starts");

		var manifest = JSON.stringify(options.manifestData);

		// Insert this list into the Webpack build as a new file asset:
		compilation.assets[options.manifestFileName] = {
			source: function() {
				return manifest;
			},
			size: function() {
				return manifest.length;
			}
		};

		callback();
	});
};

module.exports = function(options) {

	console.log(options);
	this.manifestFileName = options.fileName || "manifest.json";
	this.manifestData = options.manifestData;

	if (options instanceof Array) {
		options = {
			include: options
		};
	}

	if (!Array.isArray(options.include)) {
		options.include = [ options.include ];
	}

	return {
		apply: apply.bind(this, options)
	};
};
