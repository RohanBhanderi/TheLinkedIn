var dateutil = require('../util/dateutil');
var dynamo = require("./../models/dynamo.js");

updateUserDtls = function(req,res){

	if(!req.body.userid || !req.body.lastName || !req.body.dob || !req.body.summary){
		res.status(400).json({
			status : 400,
			message : "Bad Request"
		});
	}else{
		var userid = "" + req.body.userid;

		// var queryParams = {
		// 		firstName : req.body.firstName,
		// 		lastName : req.body.lastName,
		// 		headline : req.body.headline,
		// 		dob : req.body.dob,
		// 		summary : req.body.summary
		// };

		// mysql.queryDb("UPDATE ?? SET ? WHERE ?? = ?",['userdetails',queryParams,'userid',userid],function(err,response){
		// 	if (err) {
		// 		console.log("Error while update userdetails");
		// 	}
		// });

	
		var item = {
			"userid": { "S": userid},
			"firstname" : {"S" : req.body.firstName},
			"lastname" : {"S" :req.body.lastName},
			"email":{"S":req.body.email},
			"headline" : {"S" :req.body.headline},
			"dob" : {"S" :req.body.dob},
			"summary" : {"S" :req.body.summary}
		};

		dynamo.putItem("userdetails",item,function(err,response){
			if(err){
				console.log(err);
				res.status(500).json({status:500,message : "Error while retrieving data"});
			}else{
				console.log(JSON.stringify(response));
				res.status(200).json({status:200,data : response});
			}
		});
	}
};

getAllUserDtls = function(req, res) {
	var data = [];
	dynamo.getDBConn().scan({
	    "TableName": "userdetails",
	    "Limit": 100,
	    ProjectionExpression: "userid, firstname, lastname, email"
	}, function(err,response){
        if(err) {
            console.log(err);
            res.status(500).json({status:500,message : "Please try again later"});
        } else {
        	response.Items.forEach(function(item){
				data.push({
					userid : item.userid.S,
					email : item.email.S,
					name: item.firstname.S + ' ' + item.lastname.S
				});
			});
        	dynamo.getDBConn().scan({
			    "TableName": "organisation",
			    "Limit": 100,
			    ProjectionExpression: "userid, organisationname, email"
			},function(err,responseOrg){
		        if(err) {
		            console.log(err);
		            res.status(500).json({status:500,message : "Please try again later"});
		        } else {
		        	responseOrg.Items.forEach(function(item){
						data.push({
							userid : item.userid.S,
							email : item.email.S,
							name: item.organisationname.S
						});
					});
					//console.log(JSON.stringify(data));
		            res.status(200).json({status:200, data:data});
		        }
			 });
        }
    });
};

getUserDtls=function(req,res){
	console.log("getUserDtls " + req.params.userid);
	dynamo.getUserItems("userdetails",req.params.userid,function(err,response){
		if(err){
			console.log(err);
			res.status(500).json({status:500,message : "Error while retrieving data"});
		}else{
			console.log(response);
			var result = {
				userid: response.Items[0].userid.S,
				firstname : response.Items[0].firstname.S,
				lastname : response.Items[0].lastname.S,
				email:response.Items[0].email.S,
				headline : response.Items[0].headline.S,
				dob : response.Items[0].dob.S,
				summary : response.Items[0].summary.S
			};
			// response.Items.forEach(function(item){
			// 	result.push({
			// 		userid : item.userid.S,
			// 		motto : item.motto.S,
			// 		url : item.url.S,
			// 		overview : item.overview.S
			// 	});
			// });
			// JSON.stringify(result)
			console.log("Result: " + JSON.stringify(result));
			res.status(200).json({status:200,data : result });
		}
	});
	
};

exports.getAllUserDtls = getAllUserDtls;
exports.getUserDtls = getUserDtls;
exports.updateUserDtls = updateUserDtls;