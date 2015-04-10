var dateutil = require('../util/dateutil'),
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
		var formDate = moment(req.body.startdate,'MMMM-YYYY').toDate();
		var toDate = moment(req.body.enddate,'MMMM-YYYY').toDate();

		var queryParam = {
				userid : req.body.userid,
				startdate : formDate,
				enddate : toDate,
				school : req.body.school,
				degree : req.body.degree,
				creationdate:created,
				modifydate:created
		}

		mysql.queryDb("INSERT INTO education SET ?", queryParam, function(err,
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
					message : "Education has been added Succesfully"
				});
			}
		});
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
		
		var newParam ={
				startdate : moment(update.startdate,'MMMM-YYYY').toDate(),
				enddate : moment(update.enddate,'MMMM-YYYY').toDate(),
				school : update.school,
				degree : update.degree,
				modifydate:modified
		};
		//and ?? = ? and ?? = ?
		//'startdate',old.startdate,'enddate',old.enddate
		mysql.queryDb("UPDATE education SET ? WHERE ?? = ? and ?? = ? and ?? = ?", 
			[newParam,'userid',old.userid,'school',old.school,'degree',old.degree], 
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
					message : "Education has been updated Succesfully"
				});
			}
		});
	}
};

getEduDtls=function(req,res){
	
	if(!req.params.userid){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		mysql.queryDb('SELECT * FROM education WHERE ?',[{userid:req.params.userid}],function(err,rows){

			if (err) {
				res.status(500).json({
					status : 500,
					message : "Error while retrieving data"
				});
			} else {
				res.status(200).json({
					status : 200,
					data : rows
				});
			}
		});
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
		var userid = req.body.userid,
		school = req.body.school,
		startdate = req.body.startdate,
		enddate = req.body.enddate,
		degree = req.body.degree

		//,'startdate',startdate,'enddate',enddate
		//
		mysql.queryDb('DELETE FROM ?? WHERE ?? = ? AND ??=? AND ?? = ?',['education','userid',userid,'school',school,'degree',degree],function(err,response){
			if (err) {
				console.log("Error while deleting education details !!!");
				console.log(err);
				res.status(500).json({
					status : 500,
					message : "Error while deleting experience !!!"
				});
			} else {
				res.status(200).json({
					status : 200,
					message : "Education details has been deleted Succesfully"
				});
			}
		});
	}
};

exports.getEduDtls = getEduDtls;
exports.saveEduDtls=saveEduDtls;
exports.updateEduDtls=updateEduDtls;
exports.deleteEduDtls=deleteEduDtls;