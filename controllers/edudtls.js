var dateutil = require('../util/dateutil'),
	dynamo = require("./../models/dynamo.js"),
	moment = require('moment');

saveEduDtls = function(req,res){
	var created = dateutil.now();
	console.log(JSON.stringify(req.body));
	if(!req.body.userid || !req.body.startdate || !req.body.enddate || !req.body.school || !req.body.degree){
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
		// 		school : req.body.school,
		// 		degree : req.body.degree,
		// 		creationdate:created,
		// 		modifydate:created
		// }

		// mysql.queryDb("INSERT INTO education SET ?", queryParam, function(err,
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
		// 			message : "Education has been added Succesfully"
		// 		});
		// 	}
		// });
		//---------------------
		
		var rangekey = moment.utc().format("YYYYMMDDHHmmssS");
		var item = {
			"userid" : {"S" : "" + req.body.userid},
			"rangekey" : {"S" : rangekey},
			"startdate" :  {"S" : req.body.startdate},
			"enddate" :  {"S" : req.body.enddate},
			"school" :  {"S" : req.body.school},
			"degree" : {"S" : req.body.degree}
		};
		dynamo.putItem("education",item,function(err,response) {
			if (err) {
				console.log("Error while perfoming query !!!" + err);
				res.status(500).json({status : 500,message : "Please try again later" });
			} else {
				res.status(200).json({status : 200, message : "Education has been added Succesfully"});
			}
		});

		//---------------------
	}
};

updateEduDtls = function(req,res){
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
		// 		school : update.school,
		// 		degree : update.degree,
		// 		modifydate:modified
		// };
		// //and ?? = ? and ?? = ?
		// //'startdate',old.startdate,'enddate',old.enddate
		// mysql.queryDb("UPDATE education SET ? WHERE ?? = ? and ?? = ? and ?? = ?", 
		// 	[newParam,'userid',old.userid,'school',old.school,'degree',old.degree], 
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
		// 			message : "Education has been updated Succesfully"
		// 		});
		// 	}
		// });
		//----------------------------------
		//See dynamo.js for this
		dynamo.getDBConn().updateItem(
		    {"TableName":"education",
		        "Key":{
		            "userid":{"S": "" + old.userid},
		            "rangekey" : {"S":old.rangekey}  
		        },
		        "AttributeUpdates":{
		        	"school":{	"Value" : {"S":update.school }, "Action":"PUT" },
		        	"degree":{ "Value" : {"S":update.degree }, "Action":"PUT" },
		        	"startdate":{ "Value" : {"S":update.startdate }, "Action":"PUT" },
		        	"enddate":{	"Value" : {"S":update.enddate }, "Action":"PUT" }
		        }
		    }, function(err, response) {
				if (err) {
					console.log("Error while perfoming query !!!" + err);
					res.status(500).json({status : 500, message : "Please try again later" });
				} else {
					res.status(200).json({status:200, message : "Education has been updated Succesfully"});
				}
			});

		//-----------------------------------
	}
};

getEduDtls=function(req,res){
	
	if(!req.params.userid){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		// mysql.queryDb('SELECT * FROM education WHERE ?',[{userid:req.params.userid}],function(err,rows){

		// 	if (err) {
		// 		res.status(500).json({
		// 			status : 500,
		// 			message : "Error while retrieving data"
		// 		});
		// 	} else {
		// 		res.status(200).json({
		// 			status : 200,
		// 			data : rows
		// 		});
		// 	}
		// });
		//--------------------------
			
		dynamo.getUserItems("education",req.params.userid,function(err,response){
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
					school : item.school.S,
					degree : item.degree.S,
					startdate : item.startdate.S,
					enddate : item.enddate.S
				});
			});
			// JSON.stringify(result)
			//console.log("Result: " + JSON.stringify(result));
			res.status(200).json({status:200,data : result });
			}
		});

		//--------------------------
	}
	
};

deleteEduDtls=function(req,res){
	console.log(JSON.stringify(req.body));
	console.log(JSON.stringify(req.params));
	if(!req.body.userid || !req.body.school || !req.body.startdate || !req.body.enddate || !req.body.degree){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		// var userid = req.body.userid,
		// school = req.body.school,
		// startdate = req.body.startdate,
		// enddate = req.body.enddate,
		// degree = req.body.degree

		// //,'startdate',startdate,'enddate',enddate
		// //
		// mysql.queryDb('DELETE FROM ?? WHERE ?? = ? AND ??=? AND ?? = ?',['education','userid',userid,'school',school,'degree',degree],function(err,response){
		// 	if (err) {
		// 		console.log("Error while deleting education details !!!");
		// 		console.log(err);
		// 		res.status(500).json({
		// 			status : 500,
		// 			message : "Error while deleting experience !!!"
		// 		});
		// 	} else {
		// 		res.status(200).json({
		// 			status : 200,
		// 			message : "Education details has been deleted Succesfully"
		// 		});
		// 	}
		// });
		//----------------------
		
		var key = {
			"userid" : {"S" : "" + req.body.userid},
			"rangekey" : {"S" : req.body.rangekey}
		};
		dynamo.deleteItem("education",key,function(err,response){
			if (err) {
				console.log("Error while deleting education !!!" + err);
				res.status(500).json({ status : 500, message : "Error while deleting education !!!"});
			} else {
				res.status(200).json({ status : 200, message : "Education has been deleted Succesfully"});
			}
		});

		//----------------------
	}
};

exports.getEduDtls = getEduDtls;
exports.saveEduDtls=saveEduDtls;
exports.updateEduDtls=updateEduDtls;
exports.deleteEduDtls=deleteEduDtls;