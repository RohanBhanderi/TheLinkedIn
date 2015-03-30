/**
 * Database Configurations
 */
exports.db = {
		"host" : "localhost",
		"port" : 3306,
		"user" : "root",
		"password" : "rohan",
		"database" : "linkedin",
		"connectionLimit" : 100
};

/**
 * Database Pooling Configurations
 */
exports.dbPool = {
		"maxSize" : 50
};