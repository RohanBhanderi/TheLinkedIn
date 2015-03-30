var dateutil = require('../util/dateutil'),
	moment = require('moment');

saveEduDtls = function(req,res){
	
 try{
    var profile_id = req.body.userid;
    var college = req.body.college;
    var degree = req.body.degree;
    
    var from = req.body.from;
    var to = req.body.to;
    var formDate = moment(from,'MM/YYYY').toDate();
    var toDate = moment(to,'MM/YYYY').toDate();
    
    var created = dateutil.now();
	var data = {
			profile_id : profile_id,
			from: formDate,
			to: toDate,
			college: college,
			degree: degree,
			created:created,
			modified:created
			};
    
	mysql.queryDb('select * from profile_edudtls where profile_id=?',[profile_id],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no userdtls');
				mysql.queryDb('insert into profile_edudtls set ?',data,function(err,result){
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
				this.updateEduDtls(req,res);
			}
		} else {	
			console.error(e.stack);
	        res.send(500, "Server crashed.");
		}
	});
 }
 catch(e){
	 console.error(e);
     res.send(500, JSON.stringify({error:e}));
 }
};

updateEduDtls = function(req,res){
	var modified = dateutil.now();
	var profile_id = req.body.userid;
	var from = req.body.from;
    var to = req.body.to;
    var formDate = moment(from,'MM/YYYY').toDate();
    var toDate = moment(to,'MM/YYYY').toDate();
    var college = req.body.college;
    var degree = req.body.degree;
    
	var data = {
			from: formDate,
			to: toDate,
			college: college,
			degree: degree,
			modified:modified
			};
    
	mysql.insertData('update profile_edudtls set ? where profile_id =' + profile_id ,data,function(err,result){
		if(err) {
			console.log(err);
	        req.flash('error', 'Unable to update education details.');
	        res.redirect('/profile');
		} 
//		else {
//			req.flash('error', 'Unable to create account.');
//	        res.redirect('/profile');
//		}
	});
	
};

getEduDtls=function(req,res){
	
	mysql.queryDb('select * from profile_edudtls where profile_id=?',[req.params.userid],function(err,rows){

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

exports.getEduDtls = getEduDtls;
exports.saveEduDtls=saveEduDtls;
exports.updateEduDtls=updateEduDtls;