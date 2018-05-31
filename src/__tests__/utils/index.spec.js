import Utils from '../../popup/utils';

describe("Utils function tests", () => {
	describe("shallow copy tests", () => {
		let obj = {};
		let func = ()=>{};
		let source = {one: 1, two: "two", three: obj, four: func};
		let result = Utils.shallowCopy(source);
		it("Copy haves all fields", () => {
			expect(result.one).toBeDefined();
			expect(result.two).toBeDefined();
			expect(result.three).toBeDefined();
		});
		it("Copies are shallow", () => {
			expect(result.one).toEqual(source.one);
			expect(result.two).toEqual(source.two);
			expect(result.three).toEqual(source.three);
			expect(result.four).toEqual(source.four);
		});
	});
});