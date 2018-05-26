
export default {
	shallowCopy: function(obj) {
		let result = {};
		for (let prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				result[prop] = obj[prop];
			}
		}
		return result;
	}
};