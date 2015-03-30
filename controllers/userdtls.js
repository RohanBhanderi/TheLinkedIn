var dateutil = require('../util/dateutil');

saveUserDtls = function(req,res){
	var city = req.body.city;
	var phone = req.body.phone;
	var profile_id = req.body.userid;

	var created = dateutil.now();
	var data = {
			profile_id : profile_id,
			city : city,
			phone: phone,
			created:created,
			modified:created
	};
	mysql.queryDb('select * from profile_userdtls where profile_id=?',[profile_id],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no userdtls');
				mysql.queryDb('insert into profile_userdtls set ?',data,function(err,result){
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
				this.updateUserDtls(req,res);
			}
		} else {	
			console.error(e.stack);
	        res.send(500, "Server crashed.");
		}
	});
};

updateUserDtls = function(req,res){
	//console.error("update");
	var modified = dateutil.now();
	var city = req.body.city;
	var phone = req.body.phone;
	var profile_id = req.body.userid;
	var data = {
			city : city,
			phone: phone,
			modified:modified
	};

	mysql.queryDb('update profile_userdtls set ? where profile_id =' + profile_id ,data,function(err,result){
		if(err) {
			console.log(err);
			console.error(e.stack);
	        res.send(500, "Server crashed.");
		} else {
			//console.log(result);
			res.writeHead(200,{"Content-type":"application/json"});
			res.end(JSON.stringify(result));
		}
	});

};

getUserDtls=function(req,res){
	//console.log("userid"+req.params.userid);
	mysql.queryDb('select * from profile_userdtls where profile_id=?',[req.params.userid],function(err,rows){

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

exports.getUserDtls = getUserDtls;
exports.saveUserDtls = saveUserDtls;
exports.updateUserDtls = updateUserDtls;