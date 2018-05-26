/**
 * @see replaceAllDotsInRegexp
 *
 * @param matchedStr
 * @param p1
 * @param p2
 * @param offset
 * @param str
 * @returns {*}
 */
function replacer(matchedStr, p1, p2, offset, str) {
	console.log(arguments);
	if (!p1) {
		return '[^]';
	}
	if (p1.length % 2 == 0) {
		return p1 + '[^]';
	} else {
		return matchedStr;
	}
}

/**
 * replaces all dots in regexp to [^],
 * it needs because JS can't match new line
 * symbols with "."
 *
 * @param regexp
 * @returns regexp
 */
function replaceAllDotsInRegexp(regexp) {
	return regexp.replace(/(\\+)?\./g, replacer);
}

export default {
	validate(source, regexp) {
		if (!source || !regexp) {
			throw new Error('empty source or regexp prohibited');
		}
		regexp = replaceAllDotsInRegexp(regexp);
		let result = source.match(regexp);
		if (!result) {
			throw new Error("Doesn't match");
		}
		return result;
	}
};