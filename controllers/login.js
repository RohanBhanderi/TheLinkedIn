var crypto = require('crypto'),
    passport = require('passport'),
    data = require('../models/mysql'),
	moment = require('moment'),
	dateutil = require('../util/dateutil');

exports.registerPage = function(req, res) {
    res.render('login/register', {username: req.flash('username')});
};

exports.registerPost = function(req, res) {
    var vpw = req.body.vpw;
    var pwu = req.body.pw;
    var un = req.body.un;
    var fn = req.body.fn;
    var ln = req.body.ln;
    
    req.flash('username', un);
    
    if(vpw !== pwu) {
        req.flash('error', 'Your passwords did not match.');
        res.redirect('/register');
        return;
    }

    req.checkBody('un', 'Please enter a valid email.').notEmpty().isEmail();
    var errors = req.validationErrors();
    if (errors) {
        var msg = errors[0].msg;
        req.flash('error', msg);
        res.redirect('/register');
        return;
    }
    
    var new_salt = Math.round((new Date().valueOf() * Math.random())) + '';
    var pw = crypto.createHmac('sha1', new_salt).update(pwu).digest('hex');
    var created = dateutil.now();
    
    var data = {first_name : fn,
			last_name : ln,
			email : un,
			password: pw,
			active:'1',
			created:created,
			modified:created,
			last_login:created,
			salt:new_salt};
    
	mysql.queryDb('insert into users set ?',data,function(err,result){
		if(err) {
			console.log(err);
	        req.flash('error', 'Unable to create account.');
	        res.redirect('/register');
		} else {
			mysql.queryDb('insert into user_profile_map set ?',{user_id: result.insertId,created: created},
			function(err,result){
				if(err) {
					console.log(err);
				    req.flash('error', 'Unable to create account.');
				    res.redirect('/register');
				} else {
					req.session.profileId = result.insertId;
					passport.authenticate('local')(req, res, function () {
				        res.redirect('/home');
				    });
				}
			});
		}
	});
};

exports.loginPage = function(req, res) {
    res.render('login/index', {username: req.flash('username')});
};


exports.checkLogin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err || !user) {
            req.flash('username', req.body.un);
            req.flash('error', info.message);
            return res.redirect('/login');
        }
        req.logIn(user, function(err) {
            if (err) {
                req.flash('error', info.message);
                return res.redirect('/login');
            }
            req.flash('success', 'Welcome! ' +user.first_name);
            req.session.last_login = moment(user.last_login).format('LLL');
            req.session.userid=user.id;
            //console.log(new Date() + "|" + user.last_login + "|"+ moment() + "|" + new Date().toLocaleString());
            console.log(moment(user.last_login).format('LLL'));
            mysql.queryDb('update users set ? where ?',[{last_login:new Date()},{id:user.id}],function(err,result){
        		if(err) {
        			console.log(err);
        	        req.flash('error', 'Unable to create account.');
        		}
        	});
            return res.redirect('/profile?userid='+user.id);
        });
    })(req, res, next);
};

exports.logout = function(req, res) {
    req.logout();
    req.flash('info', 'You are now logged out.');
    res.redirect('/login');
};
