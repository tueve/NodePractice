var moment = require('moment');

module.exports = {
	dateFormatToShow: function(date) {
		return moment(date).format('DD MM YYYY');
	},
	truncate: function(str, leng) {
		return str.length > leng
			? str.substring(0, leng) + '...'
			: str;
	},
	eq: function(a, b) {
		return a === b;
	}
};
