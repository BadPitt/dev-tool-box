

describe("замена . на [^]", function () {
	let regexp = '^wo(.*)rd$';
	let reference = '^wo([^]*)rd$';
	it(`замена одиночного символа в ${regexp} должна вернуть ${reference}`, function () {
		assert.equal(replaceAllDotsInRegexp(regexp), reference);
	});

	regexp = '^wo(\\.*)rd$';
	reference = '^wo(\\.*)rd$';
	it(`замена c одиночным экранированием ${regexp} должна вернуть ${reference}`, function () {
		assert.equal(replaceAllDotsInRegexp(regexp), reference);
	});

	regexp = '^wo(\\\\.*)rd$';
	reference = '^wo(\\[^]*)rd$';
	it(`замена c двойным экранированием ${regexp} должна вернуть ${reference}`, function () {
		assert.equal(replaceAllDotsInRegexp(regexp), reference);
	});

	regexp = '^wo(\\\\\\.*)rd$';
	reference = '^wo(\\\\\\.*)rd$';
	it(`замена c тройным экранированием ${regexp} должна вернуть ${reference}`, function () {
		assert.equal(replaceAllDotsInRegexp(regexp), reference);
	});
});