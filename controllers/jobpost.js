var dateutil = require('../util/dateutil');
var AWS = require('aws-sdk');
var config = require("./../conf/config.js");
var moment = require("moment");

AWS.config.update({
    accessKeyId: config.awsConfig.accessKeyId,
    secretAccessKey: config.awsConfig.secretAccessKey,
    region: config.awsConfig.region
});

var db = new AWS.DynamoDB();
var tableName = 'job';		//a table with name job created in dynamodb

/*
 * function to list all tables
db.listTables(function(err, data) {
  console.log(data.TableNames);
});
*/


//function to insert data into dynamodb table
putItem = function(jobid, title, company, loc, details, created, modified,cb) {
   var item = {
      "jobid": { "S": jobid}
   };
   if (title) item.title = { "S": title };
   if (company) item.company = { "S": company }; 
   if (loc) item.loc = { "S": loc };
   if (details) item.details = { "S": details }; 
   if (created) item.created = { "S": created };
   if (modified) item.modified = { "S": modified }; 
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
 
//function to delete data from the dynamodb table
 deleteItem = function(jobid,cb) {
    var item = {
       "jobid": { "S": jobid}
    };
    console.log(item);
     db.deleteItem({
        "TableName": tableName,
        "Key": item
     }, function(err, data) {
       if (err) {
         cb(err,data);
       } else {
         cb(null,data);
       }
     });
  };
  

//function called on posting a new job 
postJob = function(req,res){
  console.log("postJob " + JSON.stringify(req.body))
	//read request parameters
	var jobid = moment.utc().format("YYYYMMDDHHmmssS");
    var company = "" + req.body.organisationid;
    var title = req.body.title;
    var loc = req.body.loc;
    var details = req.body.details;
    var created = "" + req.body.created;
    var modified = "" +  req.body.modified;

    //call function to insert new job in dynamo db
    putItem(jobid, title, company, loc, details, created, modified,function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).json({status : 500,message : "Error while adding job details"});
      } else {
        res.status(200).json({status : 200,message : "Successfull", response:data});
      }
    });

};

//function called on posting a new job 
deleteJob = function(req,res){
	//read request parameters
	var jobid = req.body.jobid;

    //call function to delete a job in dynamo db
    deleteItem(jobid,function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).json({status : 500,message : "Error while deleting job"});
      } else {
        res.status(200).json({status : 200,message : "Successfull", response:data});
      }
    });

};


//function to get job from the dynamodb table
getItem = function(title, cb) {
	var index = "title-company-index";
	db.query({
		"TableName": tableName,
		"IndexName" : index,
		"KeyConditions" : {
			"title": {
				"ComparisonOperator": "EQ", 
				"AttributeValueList": [ { "S" : title } ]
 		}			
    },
 	ProjectionExpression: "jobid, title, company, loc, details, created, modified",
 }, function(err, data) {
   if (err) {
     cb(err,data);
   } else {
     cb(null,data);
   }
 });
};

//function called on posting a new job 
getJob = function(req,res){
	//read request parameters
	var title = req.params.title;
    //call function to insert new job in dynamo db
    getItem(title,function(err, data) {
      if (err) {
        console.log(err);
        res.status(500).json({status : 500,message : "Error while gettin job details"});
      } else {
        res.status(200).json({status : 200,message : "Successfull", response:data.Items});
      }
    });

};


//function to get all jobs from the dynamodb table
getAllItems = function(cb) {
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

//TODO need to pass the hashkey
getAllJobsForOrg = function(cb) {
  db.query({
    "TableName": tableName,
    "KeyConditions" : {
      "jobid": {
        "ComparisonOperator": "EQ", 
        "AttributeValueList": [ { "S" : hashkey } ]
      }
    },
    "Limit": 100
  }, function(err, data) {
    if (err) {
      cb(err,data);
    } else {
      cb(null,data);
    }
  });
};

//function called to get all jobs 
getAllJobs = function(req,res){
   //call function to get all jobs from dynamo db
     getAllItems(function(err, data) {
     if (err) {
       console.log(err);
       res.status(500).json({status : 500,message : "Error while getting all job details"});
     } else {
      console.log(JSON.stringify(data.Items));
       res.status(200).json({status : 200,message : "Successfull", result:data.Items});
     }
   });

};

exports.getAllJobs=getAllJobs;
exports.deleteJob=deleteJob;
exports.postJob=postJob;
exports.getJob=getJob;

