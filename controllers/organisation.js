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