var dynamo = require("./../models/dynamo.js");
var config = require("./../conf/config.js");
var db = dynamo.getDBConn();
/**
 * New node file
 */
var redis = require('redis');
//var client = redis.createClient(config.redisConfig.port,config.redisConfig.host);
//var client = redis.createClient();
var data=[{
	"name":"sambu",
	"lname":"gopan"
},
{
	"name":"sam",
	"lname":"gop"
}
];

redistrial=function(res,req){

client.on('connect', function(err,reply) {
	console.log('3');
	if(err){
		console.log('cache is not available');
		}else{
    console.log('connected');
		}
});

client.set('framework1', JSON.stringify(data),function(err,reply){
	console.log('1');
	client.get('framework1',function(err,reply){
		console.log('2');
		if (reply == null) {
			console.log('here');
	       req.end('/cache');
	    } else {
	    	console.log('there');
	    	jsonobj=JSON.parse(reply);
	        req.end(JSON.stringify(jsonobj));
	    }
	});
	console.log('dissapointed');
});

};

//function to get all jobs from the dynamodb table
var getAllItems = function(tableName,cb) {
	db.scan({
		"TableName": tableName,
		"Limit": 100
	}, function(err, data) {
		if (err) {
			cb(err,data);
		} else {
			cb(null,data);
		}
	});
};

exports.populateCache = function(){

	var data = [];
	dynamo.getDBConn().scan({
	    "TableName": "userdetails",
	    "Limit": 100,
	    ProjectionExpression: "userid, firstname, lastname, email"
	}, function(err,response){
        if(err) {
            console.log(err);
            res.status(500).json({status:500,message : "Please try again later"});
        } else {
        	response.Items.forEach(function(item){
				data.push({
					userid : item.userid.S,
					email : item.email.S,
					name: item.firstname.S + ' ' + item.lastname.S
				});
			});
        	dynamo.getDBConn().scan({
			    "TableName": "organisation",
			    "Limit": 100,
			    ProjectionExpression: "userid, organisationname, email"
			},function(err,responseOrg){
		        if(err) {
		            console.log(err);
		        } else {
		        	responseOrg.Items.forEach(function(item){
						data.push({
							userid : item.userid.S,
							email : item.email.S,
							name: item.organisationname.S
						});
					});

		        	// Data to get for Jobs
		        	getAllItems('job',function(err, response) {
				     if (err) {
				       console.log(err);
				     } else {
				      //console.log(JSON.stringify(response.Items));
				      	response.Items.forEach(function(item){
				      		data.push({
				      			jobid : item.jobid.S,
				      			name : item.title.S
				      		});
				      	});

				      	//Store data on redis
						client.set('cache', JSON.stringify(data),function(err,reply){
							if(err){
								console.log(err);
							} else {
								console.log("Cache populated..");
							}
						});
				     }
				   });
		        }
			 });
        }
    });

};

var getCache = function(cb){
	client.get('cache', function(err,data){
		if(err){
			console.log(err);
			cb(err,data);
		} else {
			console.log("Cache populated..");
			cb(null,JSON.parse(data));
		}
	});
};

exports.getCachedData = function(req,res){
	getCache(function(err,data){
		if(err){
			console.log(err);
			res.status(500).json({status:500, message: err, data:data});
		} else {
			res.status(200).json({status:200, message: "Successfull", data:data});
		}
	});
};

exports.redistrial=redistrial;
