var mysql = require('mysql'),config = require('./../conf/config.js');
var db = config.db,
	poolConfig = config.dbPool;

var connectionPool = {};
var userRequest = {};
var maxPool = poolConfig.maxSize;
var currentPool = 0;
var currentWait = 0;

function getConnection(){
	return mysql.createConnection({
		host : db.host,
		port : db.port,
		user : db.user,
		password : db.password,
		database : db.database
	});
}

function isPoolFull()
{
	//Check if the pool size
	if(currentPool <= maxPool)
	{
		return false;
	}
	return true;
}

function createConnPool()
{

	console.log("Initialzing connection pool.");
	while(!isPoolFull())
	{
		//console.log("Connection Pool is NOT full. Proceeding with adding new connections");
		//Adding new connection instance until the pool is full
		connectionPool[++currentPool] = getConnection();
	}
	console.log("Connection pool is initialzed.");

}

function getConnectionFromPool()
{

	var connection = null;

	//Check if there is a connection available. 
	//There are times when all the connections in the pool may be used up
	if(currentPool > 0)
	{
		connection = connectionPool[currentPool--];
	}
	return connection;

}

function returnConnectionToPool(connection)
{
	//Adding the connection from the client back to the connection pool
	if(currentWait>0)
	{
		sqlQuery = userRequest[currentWait--];
		callback = userRequest[currentWait--];
		connection.query(sqlQuery, function(err, rows, fields) {
			if(err){
				console.log("ERROR: " + err.message);
			}
			else 
			{	// return err or result
				//console.log("DB Results:"+rows);
				callback(err, rows);
			}
		});
		//console.log("\nConnection closed..");
		returnConnectionToPool(connection);
	}
	else
		connectionPool[++currentPool] = (connection);
}

/**
 * Method to query database
 */
exports.queryDb = function(queryString, params, callback) {
	
	var connection = getConnectionFromPool();
	//console.log("query called");
	if(connection){
		if (arguments.length == 3) {
			var sql = mysql.format(queryString, params);
			console.log(sql);
			connection.query(sql, function(err, rows, field) {
				if (err) {
					console.log(err);
					callback(err);
				} else {
					callback(null, rows);
				}
				//pool.push(connection);
				returnConnectionToPool(connection);
			});
		} else {
			callback = params;
			connection.query(queryString, function(err, rows, field) {
				if (err) {
					console.log(err);
					callback(err);
				} else {
					callback(null, rows);
				}
				//pool.push(connection);
				returnConnectionToPool(connection);
			});
		}
	}else{
		console.log("No connection found");
	}
};

exports.createConnPool=createConnPool;