var crypto = require('crypto'),
    LocalStrategy = require('passport-local').Strategy;
    mysql = require('../models/mysql');

module.exports = function(passport) {

    passport.serializeUser(function(user, done) {
    	console.log('serializeUser' + user.id + ":" + user.first_name);
        done(null, user.id);
    });

    passport.deserializeUser(function(user_id, done) {
    	mysql.queryDb('select * from users where id = ?',[user_id],function(err,rows){
    		if(err) {
    			console.log('deserializeUser' + err);
    			return done(err);
    		} else {
    			return done(null, rows[0]);
    		}
    	});
    });

    passport.use(new LocalStrategy({
        usernameField: 'un',
        passwordField: 'pw'
    },function(email, password, done) {
    	mysql.queryDb('select * from users where email = ?',[email],function(err,rows){
    		if(err) {
    			console.log('use' + err);
    			return done(err);
    		} else {
    			if(rows==null || rows==''){
    				console.log('deserializeUser' + err);
    				return done(null, false, { 'message': 'No user with this username and password exists.'});
    			} else {
	    			var sa = rows[0].salt;
	                var pw = rows[0].password;
	                var upw = crypto.createHmac('sha1', sa).update(password).digest('hex');
	                if(upw == pw) {
	                    return done(null, rows[0]);
	                }
	                return done(null, false, { 'message': 'Invalid password'});
    			}
    		}
    	});    	
    }));
};
