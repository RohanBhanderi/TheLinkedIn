var dateutil = require('../util/dateutil');

saveUserDtls = function(req,res){
	var city = req.body.city;
	var phone = req.body.phone;
	var profile_id = req.body.userid;
	var summary = req.body.summary;
	var created = dateutil.now();
	var data = {
			profile_id : profile_id,
			city : city,
			phone: phone,
			summary: summary,
			created:created,
			modified:created
	};
	mysql.queryDb('select * from userdetails where userid=?',[profile_id],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no userdtls');
				mysql.queryDb('insert into userdetails set ?',data,function(err,result){
					if(err) {
						console.log(err);
						req.flash('error', 'Unable to save user details.');
						res.redirect('/profile');
					} 
					else {
						//console.log(result);
						res.status(200).json({message:'User details updated successfully'});
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
	var summary = req.body.summary;
	var data = {
			city : city,
			phone: phone,
			summary: summary,
			modified:modified
	};

	mysql.queryDb('update userdetails set ? where userid =' + profile_id ,data,function(err,result){
		if(err) {
			console.error(e.stack);
	        res.status(500).json(result);
		} else {
			//console.log(result);
			res.status(200).json({message:'User details updated successfully'});
		}
	});

};

getUserDtls=function(req,res){
	//console.log("userid"+req.params.userid);
	mysql.queryDb('select * from userdetails where userid=?',[req.params.userid],function(err,rows){

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