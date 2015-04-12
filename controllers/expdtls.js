var dateutil = require('../util/dateutil'),
	dynamo = require("./../models/dynamo.js"),
	moment = require('moment');

saveExpDtls = function(req,res){
	
	var created = dateutil.now();

	if(!req.body.userid || !req.body.startdate || !req.body.enddate || !req.body.companyname || !req.body.title){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		// var formDate = moment(req.body.startdate,'MMMM-YYYY').toDate();
		// var toDate = moment(req.body.enddate,'MMMM-YYYY').toDate();

		// var queryParam = {
		// 		userid : req.body.userid,
		// 		startdate : formDate,
		// 		enddate : toDate,
		// 		companyname : req.body.companyname,
		// 		title : req.body.title,
		// 		creationdate:created,
		// 		modifydate:created
		// }

		// mysql.queryDb("INSERT INTO experience SET ?", queryParam, function(err,
		// 		response) {
		// 	if (err) {
		// 		console.log("Error while perfoming query !!!");
		// 		res.status(500).json({
		// 			status : 500,
		// 			message : "Please try again later"
		// 		});
		// 	} else {
		// 		res.status(200).json({
		// 			status : 200,
		// 			message : "Experience has been added Succesfully"
		// 		});
		// 	}
		// });
		var rangekey = moment.utc().format("YYYYMMDDHHmmssS");
		var item = {
			"userid" : {"S" : "" + req.body.userid},
			"rangekey" : {"S" : rangekey},
			"startdate" :  {"S" : req.body.startdate},
			"enddate" :  {"S" : req.body.enddate},
			"companyname" :  {"S" : req.body.companyname},
			"title" : {"S" : req.body.title}
		};
		dynamo.putItem("experience",item,function(err,response) {
			if (err) {
				console.log("Error while perfoming query !!!" + err);
				res.status(500).json({
					status : 500,
					message : "Please try again later"
				});
			} else {
				res.status(200).json({
					status : 200,
					message : "Experience has been added Succesfully"
				});
			}
		});

	}
};

updateExpDtls = function(req,res){
	var modified = dateutil.now();
	if(!req.body.old || !req.body.update){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		var old = req.body.old, update = req.body.update;
		
		// var newParam ={
		// 		startdate : moment(update.startdate,'MMMM-YYYY').toDate(),
		// 		enddate : moment(update.enddate,'MMMM-YYYY').toDate(),
		// 		companyname : update.companyname,
		// 		title : update.title,
		// 		modifydate:modified
		// };
		// //and ?? = ? and ?? = ?
		// //,'startdate',old.startdate,'enddate',old.enddate
		// mysql.queryDb("UPDATE experience SET ? WHERE ?? = ? and ?? = ? and ?? = ?", 
		// 	[newParam,'userid',old.userid,'companyname',old.companyname,'title',old.title], 
		// 	function(err, response) {
		// 	if (err) {
		// 		console.log("Error while perfoming query !!!");
		// 		console.log(err);
		// 		res.status(500).json({
		// 			status : 500,
		// 			message : "Please try again later"
		// 		});
		// 	} else {
		// 		res.status(200).json({
		// 			status : 200,
		// 			message : "Experience has been updated Succesfully"
		// 		});
		// 	}
		// });
		
		//See dynamo.js for this
		dynamo.getDBConn().updateItem(
		    {"TableName":"experience",
		        "Key":{
		            "userid":{"S": "" + old.userid},
		            "rangekey" : {"S":old.rangekey}  
		        },
		        "AttributeUpdates":{
		        	"companyname":{	"Value" : {"S":update.companyname }, "Action":"PUT" },
		        	"title":{ "Value" : {"S":update.title }, "Action":"PUT" },
		        	"startdate":{ "Value" : {"S":update.startdate }, "Action":"PUT" },
		        	"enddate":{	"Value" : {"S":update.enddate }, "Action":"PUT" }
		        }
		    }, function(err, response) {
				if (err) {
					console.log("Error while perfoming query !!!" + err);
					res.status(500).json({status : 500, message : "Please try again later" });
				} else {
					res.status(200).json({ status : 200, message : "Experience has been updated Succesfully"});
				}
			});

	}
};

getExpDtls=function(req,res){
	if(!req.params.userid){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		// mysql.queryDb('SELECT * FROM experience WHERE ?',[{userid:req.params.userid}],function(err,rows){

		// 	if (err) {
		// 		res.status(500).json({
		// 			status : 500,
		// 			message : "Error while retrieving data"
		// 		});
		// 	} else {
		// 		console.log(rows);
		// 		res.status(200).json({
		// 			status : 200,
		// 			data : rows
		// 		});
		// 	}
		// });

		dynamo.getUserItems("experience",req.params.userid,function(err,response){
		if(err){
			console.log(err);
			res.status(500).json({status:500,message : "Error while retrieving data"});
		}else{
			console.log(response);
			var result = [];
			response.Items.forEach(function(item){
				result.push({
					userid : item.userid.S,
					rangekey : item.rangekey.S,
					companyname : item.companyname.S,
					title : item.title.S,
					startdate : item.startdate.S,
					enddate : item.enddate.S
				});
			});
			// JSON.stringify(result)
			//console.log("Result: " + JSON.stringify(result));
			res.status(200).json({status:200,data : result });
			}
		});
//-----------------------
	}
};

deleteExpDtls=function(req,res){
	console.log(JSON.stringify(req.body));
	if(!req.body.userid || !req.body.companyname || !req.body.startdate || !req.body.enddate || !req.body.title){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		// var userid = req.body.userid,
		// companyname = req.body.companyname,
		// startdate = req.body.startdate,
		// enddate = req.body.enddate,
		// title = req.body.title

		// //,'startdate',startdate,'enddate',enddate
		// //
		// mysql.queryDb('DELETE FROM ?? WHERE ?? = ? AND ??=? AND ?? = ?',['experience','userid',userid,'companyname',companyname,'title',title],function(err,response){
		// 	if (err) {
		// 		console.log("Error while deleting experience !!!");
		// 		console.log(err);
		// 		res.status(500).json({
		// 			status : 500,
		// 			message : "Error while deleting experience !!!"
		// 		});
		// 	} else {
		// 		res.status(200).json({
		// 			status : 200,
		// 			message : "Experience has been deleted Succesfully"
		// 		});
		// 	}
		// });

		var key = {
			"userid" : {"S" : "" + req.body.userid},
			"rangekey" : {"S" : req.body.rangekey}
		};
		dynamo.deleteItem("experience",key,function(err,response){
			if (err) {
				console.log("Error while deleting experience !!!" + err);
				res.status(500).json({ status : 500, message : "Error while deleting experience !!!"});
			} else {
				res.status(200).json({ status : 200, message : "Experience has been deleted Succesfully"});
			}
		});
		//-----------------------
	}
};

exports.getExpDtls = getExpDtls;
exports.saveExpDtls=saveExpDtls;
exports.updateExpDtls=updateExpDtls;
exports.deleteExpDtls=deleteExpDtls;