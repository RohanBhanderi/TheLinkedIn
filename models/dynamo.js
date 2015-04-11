var AWS = require('aws-sdk');
var config = require("./../conf/config.js");

AWS.config.update({
    accessKeyId: config.awsConfig.accessKeyId,
    secretAccessKey: config.awsConfig.secretAccessKey,
    region: config.awsConfig.region
});

var db = new AWS.DynamoDB();

exports.putItem = function(tableName,item,cb) {
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
exports.deleteItem = function(tableName,hashkey,cb) {
    var item = {
       "jobid": { "S": hashkey}
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

//function to get data from the dynamodb table
exports.getUserItems = function(tableName, hashkey, cb) {
  var item = {
    "TableName": tableName,
    "KeyConditions" : {
      "userid": {
        "ComparisonOperator": "EQ", 
        "AttributeValueList": [ { "S" : hashkey } ]
    }     
  }
 };
 console.log("item to fetch: " + JSON.stringify(item));
  db.query(item, function(err, data) {
   if (err) {
     cb(err,data);
   } else {
     cb(null,data);
   }
 });
};

 exports.dynamodb = db;