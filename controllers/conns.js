var dateutil = require('../util/dateutil');

saveConns = function(req,res){
    
    var userid = req.param.userid;
    var conns = req.body.conns;
    
    var created = dateutil.now();
	var data = {
			userid : userid,
			conns: conns,
			creationdate:created,
			modifydate:created
	};
    
	mysql.queryDb('select * from following where userid=?',[userid],function(err,rows){

		if (err) {
			console.log("Error while perfoming query !!!");
			res.status(500).json({
				status : 500,
				message : "Please try again later"
			});
		} else {
			res.status(200).json({
				status : 200,
				message : "Connection has been added Succesfully"
			});
		}
	});
	
};

updateConns = function(req,res){
	var modified = dateutil.now();
	var userid = req.body.userid;
	
	var data = {
			conns: conns,
			modifydate:modified
	};
    
	mysql.queryDb('update following set ? where userid =' + userid ,data,function(err,result){
		if(err) {
			console.log(err);
	        res.status(500).json({
				status : 500,
				message : "Please try again later"
			});
		}
	});
	
};

getConns=function(req,res){
	
	mysql.queryDb('select * from following where userid=?',[req.params.userid],function(err,rows){
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

getConnRequests = function(req,res){
	res.status(200).json({status:200,data : []});
};

exports.getConns = getConns;
exports.saveConns=saveConns;
exports.updateConns=updateConns;
exports.getConnRequests=getConnRequests;