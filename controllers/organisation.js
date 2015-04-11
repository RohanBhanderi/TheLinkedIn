var dynamo = require("./../models/dynamo.js");

exports.getAllOrganisations =function(req,res){
	getOrganisations(req, res, ['EDU','PRO']);
};

exports.getEduOrganisations =function(req,res){
	getOrganisations(req, res, ['EDU']);
};

exports.getProfitOrganisations =function(req,res){
	getOrganisations(req, res, ['PRO']);
};

getOrganisations = function(req,res,filter){
	mysql.queryDb("SELECT * FROM organisation WHERE organisationtype in ?",[[filter]],function(err,response){
		if(err){
			res.status(500).json({status:500,message : "Error while retrieving data"});
		}else{
			res.status(200).json({status:200,data : response});
		}
	});
};

exports.getOrgDtls = function(req,res){
	console.log("getOrgDtls " + req.params.userid);
	dynamo.getUserItems("org_profile",req.params.userid,function(err,response){
		if(err){
			console.log(err);
			res.status(500).json({status:500,message : "Error while retrieving data"});
		}else{
			console.log(response);
			// var result = [];
			// response.Items.forEach(function(item){
			// 	result.push({
			// 		userid : item.userid.S,
			// 		motto : item.motto.S,
			// 		url : item.url.S,
			// 		overview : item.overview.S
			// 	});
			// });JSON.stringify(result)
			res.status(200).json({status:200,data : response.Items});
		}
	});
};

exports.saveOrgDtls = function(req,res){
	var item = {
      "userid": { "S": ""+req.body.userid},
      "motto" : { "S": req.body.motto},
      "url" : { "S": req.body.url},
      "overview" : { "S": req.body.overview},
   	};
	dynamo.putItem("org_profile",item,function(err,response){
		if(err){
			console.log(err);
			res.status(500).json({status:500,message : "Error while retrieving data"});
		}else{
			console.log(JSON.stringify(response));
			res.status(200).json({status:200,data : response});
		}
	});
}