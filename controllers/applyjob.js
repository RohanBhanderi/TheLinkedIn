var dateutil = require("../util/dateutil");
var AWS = require("aws-sdk");
var config = require("./../conf/config.js");
var moment = require("moment");
async = require("async");

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
 	ProjectionExpression: "title, company, details, created, modified"
 }, function(err, data) {
   if (err) {
   	console.log("dynamo " + err);
     cb(err,data);
   } else {
   	console.log("dynamo " + JSON.stringify(data));
     cb(null,data);
   }
 });
};


getAllApplications = function(req, res) {
	var userid = req.params.userid;
	console.log(userid);

	mysql.queryDb("select jobid from jobapplications where userid = ? ", userid, function(err, rows) {
		if (!err) {
			if (rows == null || rows == '') {
				console.log('user not found');
				res.writeHead(200, {"Content-type" : "application/json"});
				res.end('');
			} else {
				var items = [];

				// rows.forEach(function(row){
				// 	console.log(row.jobid);
				// 	var id= row.jobid;
				// 	console.log(id);
				// 	getApp (id,function(err, data) {
				//       if (err) {
				//         console.log(err);
				//       } else {
				//       	items.push(data.Items);
				//       }
				//     });
				// });


  
				// 1st para in async.each() is the array of items
				async.each(rows,
				  // 2nd param is the function that each item is passed to
				  function(row, callback){
				    // Call an asynchronous function, often a save() to DB
				    // item.someAsyncCall(function (){
				    //   // Async call is done, alert via callback
				    //   callback();
				    // });

				    getApp (row.jobid,function(err, data) {
				      if (err) {
				        console.log(err);
				      } else {
				      	data.Items.forEach(function(item){
				      		items.push(item);
				      	});
				      	callback();
				      }
				    });
				  },
				  // 3rd param is the function to call when everything's done
				  function(err){
				   console.log(" ITEMS::" + JSON.stringify(items));
					res.writeHead(200, {"Content-type" : "application/json"});
					res.end(JSON.stringify(items));
				  }
				);

				
				// console.log(" ITEMS::" + JSON.stringify(items));
				// res.writeHead(200, {"Content-type" : "application/json"});
				// res.end(JSON.stringify(items));
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
