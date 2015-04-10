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
	accessKeyId: 'AKIAJDYMZKVOGIBWEMBA',
	secretAccessKey: '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',
	region: 'us-west-2'
};