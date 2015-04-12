var dateutil = require('../util/dateutil');
var dynamo = require("./../models/dynamo.js");

saveSkills = function(req,res){
    
    var userid = req.body.userid;
    
    var created = dateutil.now();
	// var data = {
	// 		userid : userid,
	// 		skillname: req.body.skillname,
	// 		creationdate:created,
	// 		modifydate:created
	// };

	// mysql.queryDb("INSERT INTO skills SET ?", data, function(err, response) {
	// 	if (err) {
	// 		console.log("Error while perfoming query !!!");
	// 		res.status(500).json({
	// 			status : 500,
	// 			message : "Please try again later"
	// 		});
	// 	} else {
	// 		res.status(200).json({
	// 			status : 200,
	// 			message : "Skills has been added Succesfully"
	// 		});
	// 	}
	// });
	// ------------------
	var skillset = [req.body.skillname];
	dynamo.getDBConn().updateItem(
    {"TableName":"skills",
        "Key":{
            "userid":{"S": "" + userid}
        },
        "AttributeUpdates":{
        	"skillset":{ "Value" : {"SS":skillset }, "Action":"ADD" }
        }
    }, function(err, response) {
		if (err) {
			console.log("Error while perfoming query !!!" + err);
			res.status(500).json({status : 500, message : "Please try again later" });
		} else {
			res.status(200).json({status : 200, message : "Skill has been updated Succesfully"});
		}
	});

	// ------------------
};

getSkills=function(req,res){
	
	// mysql.queryDb('select * from skills where userid=?',[req.params.userid],function(err,rows){
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

	dynamo.getUserItems("skills",req.params.userid,function(err,response){
		if(err){
			console.log(err);
			res.status(500).json({status:500,message : "Error while retrieving data"});
		}else{
			console.log(response);
			// var result = {
			// 	userid: response.Items[0].userid.S,
			// 	firstname : response.Items[0].firstname.S,
			// 	lastname : response.Items[0].lastname.S,
			// 	email:response.Items[0].email.S,
			// 	headline : response.Items[0].headline.S,
			// 	dob : response.Items[0].dob.S,
			// 	summary : response.Items[0].summary.S
			// };
			//console.log("Response: " + JSON.stringify(response));
			var result = [];
			if(response.Items.length > 0){
				response.Items[0].skillset.SS.forEach(function(skill){
					result.push({
						userid : req.params.userid,
						skillname : skill
					});
				});
			}
			res.status(200).json({status:200,data : result });
		}
	});
};

getAllSkills = function(req,res){
	// mysql.queryDb("SELECT * FROM skills",function(err,response){
	// 	if(err){
	// 		res.status(500).json({status:500,message : "Error while retrieving data"});
	// 	}else{
	// 		res.status(200).json({status:200,data : response});
	// 	}
	// });

	dynamo.getAllItems('skills',function(err,response){
		if(err){
			res.status(500).json({status:500,message : "Error while retrieving data"});
		}else{
			var result = [];
			response.Items.forEach(function(item) {
				item.skillset.SS.forEach(function(skill){
					result.push({
						userid : req.params.userid,
						skillname : skill
					});
				});
			});
			res.status(200).json({status:200,data : result });
		}
	});
};

exports.getSkills = getSkills;
exports.saveSkills = saveSkills;
exports.getAllSkills = getAllSkills; 