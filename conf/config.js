/**
 * Database Configurations
 */
exports.db = {

	/*	// Local
		 "host" : "localhost",
		 "port" : 3306,
		 "user" : "root",
		 "password" : "",
		 "database" : "cmpe_282",
		*/
	
		//AWS
		"host" : "cmpe282rds.csycvfjjat3i.us-west-1.rds.amazonaws.com",
        "port" : 3306,
		"user" : "cmpe282RDS",
		"password" : "cmpe282RDS",
		"database" : "CMPE_282"		 
};

/*
 * Database Pooling Configurations
*/
exports.dbPool = {
		"maxSize" : 50
};


// AWS configurations

exports.awsConfig = {
	accessKeyId: 'AKIAJ3FYGQLIURBVOH4Q',
	secretAccessKey: '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',
	region: 'us-west-1'
};


/* Redis config
 
exports.redisConfig = {
	host : 'replica282-001.halkdi.0001.usw2.cache.amazonaws.com',
	port : '6379'
}*/

exports.mongoConfig = {
	accessKeyId: 'AKIAJ3FYGQLIURBVOH4Q',
	secretAccessKey: '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',
	region: 'us-west-1'
};