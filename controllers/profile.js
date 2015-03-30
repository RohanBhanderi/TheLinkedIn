exports.showProfile = function(req,res){
	console.log(req.param.userid);
	res.render('index/user-profile', {firstname: req.user.first_name,lastname: req.user.last_name});
};

//---------------------------------------

