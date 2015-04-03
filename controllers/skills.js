var dateutil = require('../util/dateutil');

saveSkills = function(req,res){
    
    var profile_id = req.body.userid;
    var skills = req.body.skills;
    
    var created = dateutil.now();
	var data = {
			profile_id : profile_id,
			skills: skills,
			created:created,
			modified:created
			};
	mysql.queryDb('select * from skills where profile_id=?',[profile_id],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no userdtls');
				mysql.queryDb('insert into skills set ?',data,function(err,result){
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

updateSkills = function(req,res){
	var modified = dateutil.now();
	var profile_id = req.body.userid;
	
	var data = {
			skills: skills,
			modified:modified
			};
    
	mysql.queryDb('update skills set ? where profile_id =' + profile_id ,data,function(err,result){
		if(err) {
			console.log(err);
	        req.flash('error', 'Unable to update skills details.');
	        res.redirect('/profile');
		} 
//		else {
//			req.flash('error', 'Unable to create account.');
//	        res.redirect('/profile');
//		}
	});
	
};

getSkills=function(req,res){
	
	mysql.queryDb('select * from skills where profile_id=?',[req.params.userid],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no userdtls');
				res.writeHead(200,{"Content-type":"application/json"});
				res.end('');
			}else{
				//console.log(result);
				res.writeHead(200,{"Content-type":"application/json"});
				res.end(JSON.stringify(rows[0]));
			}
		} else {	
			console.error(e.stack);
	        res.send(500, "Server crashed.");
		}
	});
	
};

exports.getSkills = getSkills;

exports.saveSkills = saveSkills;
exports.updateSkills =updateSkills;