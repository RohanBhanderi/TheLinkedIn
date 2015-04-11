
getUser=function(req,res){
	
	var sql1 = "select * from userdetails where firstname='" + req.params.username
	+ "' OR lastname='" + req.params.username +"' OR concat_ws(' ',firstname,lastname)='" + req.params.username + "'";
	
	mysql.queryDb(sql1,function(err,rows){

if(!err){
			if(rows==null || rows==''){
				console.log('user not found');
				res.writeHead(200,{"Content-type":"application/json"});
				res.end('');
			}else{
				console.log(rows);
				res.writeHead(200,{"Content-type":"application/json"});
				res.end(JSON.stringify(rows[0]));
			}
		} else {	
			console.error(e.stack);
	        res.send(500, "Server crashed.");
		}
	});
};
exports.getUser = getUser;
