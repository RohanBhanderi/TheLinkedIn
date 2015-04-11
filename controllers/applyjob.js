/**
 * New node file
 */
var dateutil = require("../util/dateutil");
var AWS = require("aws-sdk");
var config = require("./../conf/config.js");
var moment = require("moment");

AWS.config.update({
    accessKeyId: config.awsConfig.accessKeyId,
    secretAccessKey: config.awsConfig.secretAccessKey,
    region: config.awsConfig.region
});
var db = new AWS.DynamoDB();
var tableName = "application";

putAppItem = function(applicationid,jobid, userid, appstatus,cb) {
	   var item = {
	      "applicationid": { "S": applicationid}
	   };
	   if (jobid) item.jobid = { "S": jobid };
	   if (userid) item.userid = { "S": userid };
	   if (appstatus) item.appstatus = { "S": appstatus }; 
	 
	   //var itemJson = JSON.stringify(item);
	   console.log(item);
	    db.putItem({
	       "TableName": tableName,
	       "Item": item
	    }, function(err, data) {
	      if (err) {
	        cb(err,data);
	      } else {
	        cb(null,data);
	      }
	    });
};

	 
	 
//function called on posting a new application
postApplication = function(req,res){
	  console.log(JSON.stringify(req.body));
	  //read request parameters
	    var applicationid = moment.utc().format("YYYYMMDDHHmmssS");
	    var jobid = req.body.jobid;
	    var userid = req.body.userid;
	    var appstatus = req.body.appstatus;
	   	    
	    //call function to insert new application in dynamo db
	    putAppItem(applicationid, jobid, userid,appstatus,function(err, data) {
	      if (err) {
	        console.log(err);
	        res.status(500).json({status : 500,message : "Error while adding job details"});
	      } else {
	        res.status(200).json({status : 200,message : "Successfull", response:data});
	      }
	    });
	  
	};
	
	
//function to get item from the dynamodb table
getAppItem = function(userid, cb) {
		var index = "userid-jobid-index";
		db.query({
			"TableName": tableName,
			"IndexName" : index,
			"KeyConditions" : {
				"userid": {
					"ComparisonOperator": "EQ", 
					"AttributeValueList": [ { "S" : userid } ]
	 		}			
	    },
	 	ProjectionExpression: "userid, jobid, appstatus",
	 }, function(err, data) {
	   if (err) {
	     cb(err,data);
	   } else {
	     cb(null,data);
	   }
	 });
};

//function called to get all applications from dynamodb table
getApplication = function(req,res){
		//read request parameters
		var userid = req.params.userid;

	    getAppItem(userid,function(err, data) {
	      if (err) {
	        console.log(err);
	        res.status(500).json({status : 500,message : "Error while gettin job details"});
	      } else {
	        res.status(200).json({status : 200,message : "Successfull", response:data});
	      }
	    });
};
	
exports.getApplication=getApplication;
exports.postApplication=postApplication;
