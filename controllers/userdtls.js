var dateutil = require('../util/dateutil');

updateUserDtls = function(req,res){

	if(!req.body.userid || !req.body.lastName || !req.body.dob || !req.body.summary){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		var userid = req.body.userid;

		var queryParams = {
				firstName : req.body.firstName,
				lastName : req.body.lastName,
				headline : req.body.headline,
				dob : req.body.dob,
				summary : req.body.summary
		};

		mysql.queryDb("UPDATE ?? SET ? WHERE ?? = ?",['userdetails',queryParams,'userid',userid],function(err,response){
			if (err) {
				res.status(500).json({
					status : 500,
					message : "Error while updating user profile"
				});
			} else {
				res.status(200).json({
					status : 200,
					message : "Successfull"
				});
			}
		});
	}
};

getAllUserDtls = function(req, res) {
	mysql.queryDb("SELECT userid,CONCAT_WS(' ',firstname,lastname) as name,email from userdetails UNION SELECT userid, organisationname as name,email from organisation",
		function(err, response) {
		if (err) {
			console.log("Error while fetching list of all the users !!!");
			res.status(500).json({
				status : 500,
				message : "Please try again later"
			});
		} else {
			console.log("api/user successfull");
			res.status(200).json({
				status : 200,
				data : response
			});
		}
	});
};

getUserDtls=function(req,res){
	//console.log("userid"+req.params.userid);
	mysql.queryDb('select * from userdetails where userid=?',[req.params.userid],function(err,rows){
		if (err) {
			console.log("Error while fetching list of all the users !!!");
			res.status(500).json({
				status : 500,
				message : "Please try again later"
			});
		} else {
			//console.log("api/user successfull");
			res.status(200).json({
				status : 200,
				data : rows
			});
		}
	});
	
};

exports.getAllUserDtls = getAllUserDtls;
exports.getUserDtls = getUserDtls;
exports.updateUserDtls = updateUserDtls;