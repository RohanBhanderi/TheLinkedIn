var dateutil = require('../util/dateutil');
var AWS = require('aws-sdk');

AWS.config.update({
	  accessKeyId: 'your key',
	  secretAccessKey: 'access key',
	  region: 'us-west-1'
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
putItem = function(jobid, title, company, location, details, created, modified) {
   var item = {
      'jobid': { 'S': jobid}
   };
   if (title) item.title = { 'S': title };
   if (company) item.company = { 'S': company }; 
   if (location) item.location = { 'S': location };
   if (details) item.details = { 'S': details }; 
   if (created) item.created = { 'S': created };
   if (modified) item.modified = { 'S': modified }; 
    db.putItem({
       'TableName': tableName,
       'Item': item
    }, function(err, data) {
    	if(err){
    		console.log(err);
    	} else{
    		console.log(data);
    	}
       
    });
 };

//function called on posting a new job 
postJob = function(req,res){
	//read request parameters
	var jobid = '1234'		//need to be changed for auto generation
    var company = req.param.organisationid;
    var title = req.body.title;
    var location = req.body.location;
    var details = req.body.details;
    var created = dateutil.now();
    var modified = req.body.modified;
	
    /* hardcoded values tested to insert data in database
	var jobid = '1234';		//need to be auto
    var company = "HP";
    var title = "Software Engineer Intern";
    var location = "San Jose";
    var details = "The Software Engineer Intern will take on the role of QA testing and developer within the team.";
    var created = dateutil.now().toString();
    var modified = dateutil.now().toString();*/

    //call function to insert new job in dynamo db
   	putItem(jobid, title, company, location, details, created, modified);
	
};


exports.postJob=postJob;
exports.putItem=putItem;
