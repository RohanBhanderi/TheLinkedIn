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
	accessKeyId: 'AKIAITLO5PMLW4MASVLA',
	secretAccessKey: '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',
	region: 'us-west-2'
};