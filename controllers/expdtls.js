var dateutil = require('../util/dateutil'),
	moment = require('moment');

saveExpDtls = function(req,res){
    
    var profile_id = req.body.userid;
    var place = req.body.place;
    var role = req.body.role;
    
    var from = req.body.from;
    var to = req.body.to;
    var formDate = moment(from,'MM/YYYY').toDate();
    var toDate = moment(to,'MM/YYYY').toDate();
    
    var created = dateutil.now();
	var data = {
			profile_id : profile_id,
			from: formDate,
			to: toDate,
			place: place,
			role: role,
			created:created,
			modified:created
			};
    
	mysql.queryDb('select * from profile_expdtls where profile_id=?',[profile_id],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no userdtls');
				mysql.insertData('insert into profile_expdtls set ?',data,function(err,result){
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
				this.updateExpDtls(req,res);
			}
		} else {	
			console.error(e.stack);
	        res.send(500, "Server crashed.");
		}
	});
};

updateExpDtls = function(req,res){
	var modified = dateutil.now();
	var profile_id = req.body.userid;
    var place = req.body.place;
    var role = req.body.role;
    
	var from = req.body.from;
    var to = req.body.to;
    var formDate = moment(from,'MM/YYYY').toDate();
    var toDate = moment(to,'MM/YYYY').toDate();
	var data = {
			from: formDate,
			to: toDate,
			place: place,
			role: role,
			modified:modified
			};
    
	mysql.queryDb('update profile_expdtls set ? where profile_id =' + profile_id ,data,function(err,result){
		if(err) {
			console.log(err);
	        
	        res.writeHead(200,{"Content-type":"application/json"});
			res.end(JSON.stringify(result));
		} 
//		else {
//			req.flash('error', 'Unable to create account.');
//	        res.redirect('/profile');
//		}
	});
	
};

getExpDtls=function(req,res){
	
	mysql.queryDb('select * from profile_expdtls where profile_id=?',[req.params.userid],function(err,rows){

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

exports.getExpDtls = getExpDtls;
exports.saveExpDtls=saveExpDtls;
exports.updateExpDtls=updateExpDtls;