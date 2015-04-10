/**
 * Database Configurations
 */
exports.db = {
		"host" : "localhost",
		"port" : 3306,
		"user" : "root",
		"password" : "rohan",
		"database" : "cmpe_282",
		"connectionLimit" : 100
};

/**
 * Database Pooling Configurations
 */
exports.dbPool = {
		"maxSize" : 50
};

/*
* AWS configurations
*/
exports.awsConfig = {
	accessKeyId: 'AKIAJUOQDC23TB4QH4KA',
	secretAccessKey: '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',
	region: 'us-west-2'
};