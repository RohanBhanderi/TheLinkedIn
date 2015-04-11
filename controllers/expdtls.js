var dateutil = require('../util/dateutil'),
	moment = require('moment');

saveExpDtls = function(req,res){
	
	var created = dateutil.now();

	if(!req.body.userid || !req.body.startdate || !req.body.enddate || !req.body.companyname || !req.body.title){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		var formDate = moment(req.body.startdate,'MMMM-YYYY').toDate();
		var toDate = moment(req.body.enddate,'MMMM-YYYY').toDate();

		var queryParam = {
				userid : req.body.userid,
				startdate : formDate,
				enddate : toDate,
				companyname : req.body.companyname,
				title : req.body.title,
				creationdate:created,
				modifydate:created
		}

		mysql.queryDb("INSERT INTO experience SET ?", queryParam, function(err,
				response) {
			if (err) {
				console.log("Error while perfoming query !!!");
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
		
		var newParam ={
				startdate : moment(update.startdate,'MMMM-YYYY').toDate(),
				enddate : moment(update.enddate,'MMMM-YYYY').toDate(),
				companyname : update.companyname,
				title : update.title,
				modifydate:modified
		};
		//and ?? = ? and ?? = ?
		//,'startdate',old.startdate,'enddate',old.enddate
		mysql.queryDb("UPDATE experience SET ? WHERE ?? = ? and ?? = ? and ?? = ?", 
			[newParam,'userid',old.userid,'companyname',old.companyname,'title',old.title], 
			function(err, response) {
			if (err) {
				console.log("Error while perfoming query !!!");
				console.log(err);
				res.status(500).json({
					status : 500,
					message : "Please try again later"
				});
			} else {
				res.status(200).json({
					status : 200,
					message : "Experience has been updated Succesfully"
				});
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
		mysql.queryDb('SELECT * FROM experience WHERE ?',[{userid:req.params.userid}],function(err,rows){

			if (err) {
				res.status(500).json({
					status : 500,
					message : "Error while retrieving data"
				});
			} else {
				console.log(rows);
				res.status(200).json({
					status : 200,
					data : rows
				});
			}
		});
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
		var userid = req.body.userid,
		companyname = req.body.companyname,
		startdate = req.body.startdate,
		enddate = req.body.enddate,
		title = req.body.title

		//,'startdate',startdate,'enddate',enddate
		//
		mysql.queryDb('DELETE FROM ?? WHERE ?? = ? AND ??=? AND ?? = ?',['experience','userid',userid,'companyname',companyname,'title',title],function(err,response){
			if (err) {
				console.log("Error while deleting experience !!!");
				console.log(err);
				res.status(500).json({
					status : 500,
					message : "Error while deleting experience !!!"
				});
			} else {
				res.status(200).json({
					status : 200,
					message : "Experience has been deleted Succesfully"
				});
			}
		});
	}
};

exports.getExpDtls = getExpDtls;
exports.saveExpDtls=saveExpDtls;
exports.updateExpDtls=updateExpDtls;
exports.deleteExpDtls=deleteExpDtls;