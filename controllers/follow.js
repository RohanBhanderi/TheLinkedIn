var dateutil = require('../util/dateutil');

addFollow = function(req,res){
	var userid = req.body.userid;
	var organisationid = req.body.organisationid;
	//var category = req.body.category;
	var creationdate = dateutil.now();
	var data = {
			userid : userid,
			organisationid : organisationid,
			//category: category,
			creationdate:creationdate,
			modifydate:creationdate
	};
	mysql.queryDb('select * from following where userid=? and organisationid=?',[userid, organisationid],function(err,rows){
		if(!err){
			if(rows==null || rows==''){
				console.log('no organization');
				mysql.queryDb('insert into following set ?',data,function(err,result){
					if(err) {
						console.log(err);
						req.flash('error', 'Unable to save user details.');
						res.redirect('/profile');
					} 
					else {
						res.writeHead(200,{"Content-type":"application/json"});
						res.end(JSON.stringify(result));
					}
				});
			}else{
				console.error("error occurred while inserting");
			}
		} else {	
			console.error(e.stack);
	        res.send(500, "Server crashed.");
		}
	});
};


unFollow = function(req,res){
	var organisationid = req.body.organisationid;
	var userid = req.body.userid;
	mysql.queryDb('delete from following where organisationid = ? and userid = ?', [userid, organisationid],function(err,result){
		if(err) {
			console.log(err);
			console.error(err.stack);
	        res.send(500, "Server crashed.");
		} else {
			console.log("successfully deleted");
			res.writeHead(200,{"Content-type":"application/json"});
			res.end(JSON.stringify(result));
		}
	});

};


getFollow=function(req,res){
	var userid = req.params.userid;
	mysql.queryDb('select * from following where userid=?',[userid],function(err,rows){
		if(!err){
			if(rows==null || rows==''){
				console.log('none following');
				res.writeHead(200,{"Content-type":"application/json"});
				res.end('');
			}else{
				res.writeHead(200,{"Content-type":"application/json"});
				res.end(JSON.stringify(rows));
			}
		} else {	
			console.error(e.stack);
	        res.send(500, "Server crashed.");
		}
	});
	
};

exports.addFollow = addFollow;
exports.getFollow = getFollow;
exports.unFollow = unFollow;