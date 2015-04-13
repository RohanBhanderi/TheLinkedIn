var dateutil = require("../util/dateutil");
exports.home = function(req, res) {
	sess=req.session;
	var profile_id = sess.userid;
	
	mysql.queryDb('select * from posts p where userid=(select userid from following where organisationid=? Union select organisationid from following where userid=?) order by modifydate desc',[profile_id,profile_id],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no posts');
				res.writeHead(200,{"Content-type":"application/json"});
				res.end('');
			}else{
				console.log(rows);
				res.writeHead(200,{"Content-type":"application/json"});
				res.end(JSON.stringify(rows));
			}
		} else {	
			console.error(err.stack);
	        res.send(500, "Server crashed.");
		}
	});
	
};


exports.userHome = function(req, res) {
	
	var profile_id =req.params.userid;
	
	mysql.queryDb('select * from posts p where userid=(select userid from following where organisationid=? Union select organisationid from following where userid=?) order by modifydate desc',[profile_id,profile_id],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no posts');
				res.writeHead(200,{"Content-type":"application/json"});
				res.end('');
			}else{
				console.log(rows[0]);
				res.writeHead(200,{"Content-type":"application/json"});
				res.end(JSON.stringify(rows));
			}
		} else {	
			console.error(err.stack);
	        res.send(500, "Server crashed.");
		}
	});
	
};

exports.savePost = function(req,res){
	//var headline = req.body.headline;
	var postbody =req.body.postbody;
	var profile_id = req.body.userid;

	var created = dateutil.now();
	var data = {
			postbody: postbody,
			userid: profile_id,
			creationdate:created,
			modifydate:created
	};
	mysql.queryDb('select * from posts where userid=?',[profile_id],function(err,rows){

		if(!err){
			if(rows==null || rows==''){
				console.log('no posts dtls');
				mysql.queryDb('insert into posts set ?',data,function(err,result){
					if(err) {
						console.log(err);
						req.flash('error', 'Unable to save posts for user');
						res.redirect('/home');
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

