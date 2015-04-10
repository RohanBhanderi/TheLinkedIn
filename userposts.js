var dateutil = require('../util/dateutil');

saveposts = function(req,res){
	var headline = req.body.headline;
	var body =req.body.postbody;
	var profile_id = req.body.userid;

	var created = dateutil.now();
	var data = {
			postheadline: headline,
			postbody: body,
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

updateposts = function(req,res){
	//console.error("update");
	var headline = req.body.headline;
	var body =req.body.postbody;
	var profile_id = req.body.userid;

	var created = dateutil.now();
	var data = {
			postheadline: headline,
			postbody: body,
			creationdate:created,
			modifydate:created
	};

	mysql.queryDb('update posts set ? where userid =' + profile_id ,data,function(err,result){
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

getposts=function(req,res){
	//console.log("userid"+req.params.userid);
	mysql.queryDb('select * from posts where userid=?',[req.params.userid],function(err,rows){

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
			console.error(err.stack);
	        res.send(500, "Server crashed.");
		}
	});
	
};

likeposts = function(req,res){
	//console.error("update");
	var postid =req.body.postid;
	var profile_id = req.body.userid;

	var created = dateutil.now();
	var data = {
			postid:postid,
			userid:profile_id,
			creationdate:created,
			modifydate:created
	};

	mysql.queryDb('insert into likes set?',data,function(err,result){
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

exports.getPosts = getposts;
exports.savePosts = saveposts;
exports.updatePosts = updateposts;
exports.likePosts=likeposts;
