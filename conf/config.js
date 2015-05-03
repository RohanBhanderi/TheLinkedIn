/**
 * Database Configurations
 */
exports.db = {
		// Local
		"host" : "localhost",
		"port" : 3306,
		"user" : "root",
		"password" : "rohan",
		"database" : "cmpe_282"
		
		/*//AWS
		"host" : 
        "port" : 3306,
		"user" : "username",
		"password" : 
		"database" : "cmpe_282",
		"connectionLimit" : 
		 /**/

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
