/**
 * Database Configurations
 */
exports.db = {
		// Local
		// "host" : "localhost",
		// "port" : 3306,
		// "user" : "root",
		// "password" : "",
		// "database" : "cmpe_282",
		
		//AWS
		"host" : "mydb.cwvz0jc9ipyp.us-west-2.rds.amazonaws.com",
        "port" : 3306,
		"user" : "username",
		"password" : "password1",
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
	accessKeyId: 'AKIAIEO4Y6ZRTE7WAORQ',
	secretAccessKey: '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',
	region: 'us-west-2'
};

/*
* Redis config
 */
exports.redisConfig = {
	host : 'replica282-001.halkdi.0001.usw2.cache.amazonaws.com',
	port : '6379'
}