var dateutil = require('../util/dateutil');

saveSkills = function(req,res){
    
    var userid = req.body.userid;
    
    var created = dateutil.now();
	var data = {
			userid : userid,
			skillname: req.body.skillname,
			creationdate:created,
			modifydate:created
	};

	mysql.queryDb("INSERT INTO skills SET ?", data, function(err, response) {
		if (err) {
			console.log("Error while perfoming query !!!");
			res.status(500).json({
				status : 500,
				message : "Please try again later"
			});
		} else {
			res.status(200).json({
				status : 200,
				message : "Skills has been added Succesfully"
			});
		}
	});
	
};

getSkills=function(req,res){
	
	mysql.queryDb('select * from skills where userid=?',[req.params.userid],function(err,rows){
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
};

getAllSkills = function(req,res){
	mysql.queryDb("SELECT * FROM skills",function(err,response){
		if(err){
			res.status(500).json({status:500,message : "Error while retrieving data"});
		}else{
			res.status(200).json({status:200,data : response});
		}
	});
};

exports.getSkills = getSkills;
exports.saveSkills = saveSkills;
exports.getAllSkills = getAllSkills; 