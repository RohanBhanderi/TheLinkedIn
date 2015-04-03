var dateutil = require('../util/dateutil');

saveConns = function(req,res){
    
    var profile_id = req.param.profile_id;
    var conns = req.body.conns;
    
    var created = dateutil.now();
	var data = {
			profile_id : profile_id,
			conns: conns,
			created:created,
			modified:created
			};
    
	mysql.queryDb('select * from profile_conns where profile_id=?',[profile_id],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no userdtls');
				mysql.insertData('insert into profile_conns set ?',data,function(err,result){
					if(err) {
						console.log(err);
						req.flash('error', 'Unable to save user details.');
						res.redirect('/profile');
					} 
					else {
						//console.log(result);
						res.writeHead(200,{"Content-type":"application/json"});
						res.end(JSON.stringify(result));
					}
				});
			}else{
				console.error("update before");
				this.updateSkills(req,res);
			}
		} else {	
			console.error(e.stack);
	        res.send(500, "Server crashed.");
		}
	});
	
};

updateConns = function(req,res){
	var modified = dateutil.now();
	var profile_id = req.body.userid;
	
	var data = {
			conns: conns,
			modified:modified
			};
    
	mysql.queryDb('update profile_conns set ? where profile_id =' + profile_id ,data,function(err,result){
		if(err) {
			console.log(err);
	        req.flash('error', 'Unable to update connections details.');
	        res.redirect('/profile');
		}
	});
	
};

getConns=function(req,res){
	
	mysql.queryDb('select * from profile_conns where profile_id=?',[req.params.userid],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no userdtls');
				res.writeHead(200,{"Content-type":"application/json"});
				res.end('');
			}else{
				//console.log(result);
				res.writeHead(200,{"Content-type":"application/json"});
				res.end(JSON.stringify(rows));
			}
		} else {	
			console.error(e.stack);
	        res.send(500, "Server crashed.");
		}
	});
	
};

exports.getConns = getConns;
exports.saveConns=saveConns;
exports.updateConns=updateConns;