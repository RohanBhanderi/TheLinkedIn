/**
 * Database Configurations
 */
exports.db = {
    // Local
	/*
        "host" : "localhost",
        "port" : 3306,
        "user" : "root",
        "password" : "",
        "database" : "cmpe_282",
    */

    //AWS
    "host" : "",
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
	accessKeyId: '',
	secretAccessKey: '',
	region: ''
};


// Redis config
exports.redisConfig = {
	host : '',
	port : ''
}

// MongoDB config
exports.mongoConfig = {
	accessKeyId: '',
	secretAccessKey: '',
	region: ''
};
