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
		"host" : 
        "port" : 3306,
		"user" : "username",
		"password" : 
		"database" : "cmpe_282",
		"connectionLimit" : 

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
	accessKeyId: '',
	secretAccessKey: '',
	region: 'us-west-2'
};
