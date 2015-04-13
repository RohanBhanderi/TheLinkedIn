var dateutil = require("../util/dateutil");
var AWS = require("aws-sdk");
var config = require("./../conf/config.js");
var moment = require("moment");

AWS.config.update({
	region : config.awsConfig.region,
	accessKeyId : config.awsConfig.accessKeyId,
	secretAccessKey : config.awsConfig.secretAccessKey
});

var db = new AWS.DynamoDB();
var tableName = "job";

getApp = function(id, cb) {
	console.log("In Dynamo");
	db.query({
		"TableName": tableName,
		"KeyConditions" : {
			"jobid": {
				"ComparisonOperator": "EQ", 
				"AttributeValueList": [ { "S" : id } ]
 		}			
    },
 	ProjectionExpression: "title, company, loc, details, created, modified"
 }, function(err, data) {
   if (err) {
     cb(err,data);
   } else {
     cb(null,data);
   }
 });
};


getAllApplications = function(req, res) {
	var userid = req.params.userid;
	console.log(userid);

	var sql1 = "select jobid from jobapplications where userid ='" + userid + "'";
	mysql.queryDb(sql1, function(err, rows) {
		if (!err) {
			if (rows == null || rows == '') {
				console.log('user not found');
				res.writeHead(200, {
					"Content-type" : "application/json"});
				res.end('');
			} else {
				
				for(var i=0;i<rows.length;i++)
					{					
			        console.log(rows[i].jobid);
					var id= rows[i].jobid;
							console.log("In for");			
						//function for getting job details for particular jobid	
						console.log(id);
				getApp (id,function(err, data) {
						      if (err) {
						        console.log(err);
						     
						      } else {
						    // res.status(200).json({status : 200,message : "Successfull", response:data.Items});		
						      console.log(data.Items);
						      }
						    });
					}
				
				//res.writeHead(200, {"Content-type" : "application/json"});
				//res.end(JSON.stringify(rows));
				//res.end(JSON.stringify(rows.length));
			}
		} else {
			console.error(err);
			res.send(500, "Server crashed.");
		}
	});
};

postApplication = function(req, res) {
	var userid = req.body.userid;
	var jobid = req.body.jobid;
	console.log(userid);
	
	// console.log(req.body.userid+" "+req.body.jobid+" "+req.body.status);
	
	var params = {
		userid : userid,
		jobid : jobid,
		status : "PEND"
	};

	mysql.queryDb("insert into jobapplications set ? ", params,function(err, rows) {
	  if (err) {
        console.log(err);
        res.status(500).json({status : 500,message : "Error while adding job details"});
      } else {
        res.status(200).json({status : 200,message : "Successfull", data:rows});
      }
	});
};

exports.getAllApplications = getAllApplications;
exports.postApplication = postApplication;
