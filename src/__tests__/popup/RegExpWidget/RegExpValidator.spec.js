
import Validator from '../../../popup/RegExpWidget/RegExpValidator';

describe("замена . на [^]", function () {
	let regexp1 = '^wo(.*)rd$';
	let reference1 = '^wo([^]*)rd$';
	it(`замена одиночного символа в ${regexp1} должна вернуть ${reference1}`, function () {
		expect(Validator.replaceAllDotsInRegexp(regexp1)).toBe(reference1);
	});

	let regexp2 = '^wo(\\.*)rd$';
	let reference2 = '^wo(\\.*)rd$';
	it(`замена c одиночным экранированием ${regexp2} должна вернуть ${reference2}`, function () {
		expect(Validator.replaceAllDotsInRegexp(regexp2)).toBe(reference2);
	});

	let regexp3 = '^wo(\\\\.*)rd$';
	let reference3 = '^wo(\\\\[^]*)rd$';
	it(`замена c двойным экранированием ${regexp3} должна вернуть ${reference3}`, function () {
		expect(Validator.replaceAllDotsInRegexp(regexp3)).toBe(reference3);
	});

	let regexp4 = '^wo(\\\\\\.*)rd$';
	let reference4 = '^wo(\\\\\\.*)rd$';
	it(`замена c тройным экранированием ${regexp4} должна вернуть ${reference4}`, function () {
		expect(Validator.replaceAllDotsInRegexp(regexp4)).toBe(reference4);
	});

	let regexp5 = '^wo(.*)rd$';
	let source = 'wo\n\n\n\nrd';
	it(`валидация с ресурсом с переносом строки должна работать, regexp:${regexp5}, source:${source}`,
		()=> {
			expect(Validator.validate(source, regexp5)[0]).toBe(source); // сматчилась вся строка
		});
});