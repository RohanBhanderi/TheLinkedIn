var dateutil = require('../util/dateutil'),
	dynamo = require("./../models/dynamo.js"),
	moment = require('moment');

var MongoClient = require('mongodb').MongoClient;
 
exports.getCareerPath=function(req,res){

	// Connection URL 
	var url = 'mongodb://sambu8865:9may1989@ds031902.mongolab.com:31902/cmpe282prjt';
	// Use connect method to connect to the Server 
	MongoClient.connect(url, function(err, db) {
		if(err){
			console.log(err);
			res.status(500).json({status : 500,message : "Please try again later" });  
		} else {
			
			console.log("Connected correctly to server");
			 console.log(req.params.position);
			  var collection = db.collection('collection333');
			  // Find some documents 
			  collection.find({position : req.params.position},
			  	{path1:1,path2:1,_id:0}).toArray(function(err, docs) {
			    console.log("Found the following records");
			    console.dir(docs);
			    db.close();
			    if (err) {
					console.log("Error while perfoming query !!!" + err);
					res.status(500).json({status : 500,message : "Please try again later" });
				} else {
					res.status(200).json({status : 200, data : docs});
				}
			   
			  });
		}

	});

};