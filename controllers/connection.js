var dateutil = require('../util/dateutil');

addConn = function(req,res){
	var userid = req.body.userid;
	var organisationid = req.body.secuserid;
	var category = req.body.category;
	var creationdate = dateutil.now();
	var data = {
		userid : userid,
		organisationid : organisationid,
		category : category,
		creationdate:creationdate,
		modifydate:creationdate
	};

	mysql.queryDb('insert into following set ?',data,function(err,result){
		if(err){
			console.log("Error while fetching connection data. " + err);
			res.status(500).json({status : 500,message : "Please try again later"});
		}else{
			res.status(200).json({status : 200, message:"Successfull",data : result});
		}
	});

	// mysql.queryDb('select * from following where userid=? and organisationid=?',[userid, organisationid], function(err,rows){
	// 	if(!err){
	// 		if(rows==null || rows==''){
	// 			console.log('user is not following');
	// 			mysql.queryDb('insert into following set ?',data,function(err,result){
	// 				if(err){
	// 					console.log("error while fetching connection data");
	// 					console.log(err);
	// 					res.status(500).json({status : 500,message : "Please try again later"});
	// 				}else{
	// 					res.status(200).json({status : 200, message:"Successfull",data : rows});
	// 				}
	// 			});
	// 		}else{
	// 			console.log("error while fetching connection data");
	// 			console.log(err);
	// 			res.status(500).json({status : 500,message : "Please try again later"});
	// 		}
	// 	} else {	
	// 		console.log("error while fetching connection data");
	// 		console.log(err);
	// 		res.status(500).json({status : 500,message : "Please try again later"});
	// 	}
	// });
};


removeConn = function(req,res){
	var organisationid = req.body.organisationid;
	var userid = req.body.userid;
	mysql.queryDb('delete from following where organisationid = ? and userid = ?',[userid, organisationid], function(err,result){
		if(err){
			console.log("error while fetching connection data");
			console.log(err);
			res.status(500).json({status : 500,message : "Please try again later"});
		}else{
			res.status(200).json({status : 200, message:"Successfull",data : result});
		}

	});
};


getConn=function(req,res){
	var userid = req.params.userid
	mysql.queryDb('select * from following where userid=?',[userid],function(err,result){
		if(err){
			console.log("Error while retrieving user connections !!! " + err);
			res.status(500).json({status : 500,message : "Error while retrieving user connections !!"});
		}else{
			if(result.length!==0){
				var array = [];
				result.forEach(function(connection){
					if(connection.userid == userid){
						array.push(connection.organisationid);
					}else{
						array.push(connection.userid);
					}
				});

//"SELECT userid,CONCAT_WS(' ',firstname,lastname) as name,email from userdetails usr WHERE usr.userid IN (?) UNION SELECT userid, organisationname as name,'' as email from organisation as org where org.userid in (?)"
				mysql.queryDb("SELECT username as name,'' as email from userauthenticate usr WHERE usr.userid IN (?)",[array],function(err,rows){
					if(err){
						console.log("Error while retrieving user connections !!!" + err);
						res.status(500).json({status : 500,message : "Error while retrieving user connections"});
					}else{
						console.log(JSON.stringify(rows));
						res.status(200).json({status : 200,message:"Successfull", data : rows});
					}
				});
			}else{
				res.status(200).json({status : 200, message : "No Connections"});
			}
		}
	});
	
};

checkUsersConn = function(req,res){
	var userid = req.params.userid
	var secuserid = req.params.secuserid
	mysql.queryDb('select * from following where userid=? and organisationid=?',[userid,secuserid],function(err,result){
		if(err){
			console.log("error while fetching connection data");
			console.log(err);
			res.status(500).json({status : 500,message : "Please try again later"});
		}else{
			res.status(200).json({status : 200, message:"Successfull",data : result});
		}
	});
	
};

exports.addConn = addConn;
exports.getConn = getConn;
exports.checkUsersConn = checkUsersConn;
exports.removeConn = removeConn;