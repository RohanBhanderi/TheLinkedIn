var moment = require('moment');

exports.now = function(){
	//return new Date().toISOString().slice(0, 19).replace('T', ' ');
	return new Date();
};

exports.nowFullString = function(){
	//return new Date().toISOString().slice(0, 19).replace('T', ' ');
	return moment().format('DD-MMMM-YYYY');
};

exports.nowString = function(){
	//return new Date().toISOString().slice(0, 19).replace('T', ' ');
	return moment().format('MMMM-YYYY');
};