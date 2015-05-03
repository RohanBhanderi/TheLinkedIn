var crypto = require('crypto'),
passport = require('passport'),
data = require('../models/mysql'),
moment = require('moment'),
dateutil = require('../util/dateutil'),
dynamo = require("./../models/dynamo.js");

exports.register = function(req, res) {
    //var vpw = req.body.vpw;
    console.log("registerPost inside");
    var pwu = req.body.password;
    var un = req.body.email;
    var fn = req.body.firstName;
    var ln = req.body.lastName;
    var orgname = req.body.orgname;
    var usertype = req.body.usertype;

    req.checkBody('email', 'Please enter a valid email.').notEmpty().isEmail();
    var errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        var msg = errors[0].msg;
        res.status(400).json({
            status : 400,
            message : msg
        });
    }
    
    var new_salt = Math.round((new Date().valueOf() * Math.random())) + '';
    var pw = crypto.createHmac('sha1', new_salt).update(pwu).digest('hex');
    var created = dateutil.now();
    
    var data={
        username:un,
        password:pw,
        approved:1,
        usertype:usertype,
        creationdate:created,
        modifydate:created,
        lastlogin:created,
        salt:new_salt
    };

    mysql.queryDb('insert into userauthenticate set ?',data,function(err,result){
      if(err) {
         console.log(err);
         res.status(500).json({
            status : 500,
            message : "Please try again later"
        });
     } else {
      var userid = "" + result.insertId;
      if(usertype == 'usr') {

            var item = {
              "userid": { "S": userid},
              "firstname" : {"S" : fn},
              "lastname" : {"S" :ln},
              "email":{"S":un},
              "headline" : {"S" :"Not Added"},
              "dob" : {"S" :"Not Added"},
              "summary" : {"S" :"Not Added"}
            };
            dynamo.putItem("userdetails",item,function(err,result){
                if(err) {
                	  console.log("userdetails problem");
                    console.log(err);
                   res.status(500).json({
                    status : 500,
                    message : "Please try again later"
                });
               } else {
                   req.session.userid = userid;
                   passport.authenticate('local')(req, res, function () {
                    lastLogin = new Date();
                    req.session.email = un;

                    res.status(200).json({
                        status : 200,
                        userid : userid,
                        email : un,
                        name : req.body.firstName + " " + req.body.lastName,
                        usertype:usertype,
                        lastLogin : lastLogin.toDateString() + " " + lastLogin.toLocaleTimeString()
                    });
                });
               }
           });

     } else {

        var item = {
              "userid" : {"S":userid},
              "organisationname" : {"S":orgname},
              "organisationtype": { "S": "PRO"},
              "creationdate" : {"S" : dateutil.nowFullString()},
              "modifydate" : {"S" : dateutil.nowFullString()},
              "email":{"S":un}
            };
          dynamo.putItem("organisation",item,function(err,result){
            if(err) {
              console.log(err);
               res.status(500).json({
                status : 500,
                message : "Please try again later"
            });
           } else {
               req.session.userid = userid;
               passport.authenticate('local')(req, res, function () {
                lastLogin = new Date();
                req.session.email = un;

                res.status(200).json({
                    status : 200,
                    userid : userid,
                    email : un,
                    name : req.body.orgname,
                    usertype:usertype,
                    lastLogin : lastLogin.toDateString() + " " + lastLogin.toLocaleTimeString()
                });
            });
           }//inner else
       });

    }//outer else
  }
});//Main Mongo DB
};

exports.checkLogin = function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
        if (err) {
            console.log(err);
            res.status(500).json({status:500,message : info.message + "Please try again later"});
        }
        if(!user) {
         console.log(err);
         res.status(401).json({status:401,message : info.message + "Please try again later"}); 
     }
     req.logIn(user, function(err) {
        if (err) {
            console.log(err);
            res.status(500).json({status:500,message : err + "Please try again later"});
        }
        var lastlogin = moment(user.lastlogin).format('LLL');
        req.session.lastlogin = lastlogin;
        req.session.userid = user.userid;
        req.session.email = user.username;
        console.log(moment(user.lastlogin).format('LLL'));

            //Async Query
            mysql.queryDb('update userauthenticate set ? where ?',[{lastlogin:new Date()},{userid:user.userid}],function(err,result){
              if(err) {
                 console.log(err);
             }
         });
          if(user.usertype == 'usr')  {

            dynamo.getUserItemsProj("userdetails",user.userid,"firstname, lastname",function(err,result){
                if(err) {
                    console.log(err);
                    res.status(500).json({status:500,message : "Please try again later"});
                } else {
                    //console.log(JSON.stringify(result));
                    res.status(200).json({status : 200, userid:user.userid, email : user.username, name : result.Items[0].firstname.S + ' ' + result.Items[0].lastname.S, usertype:user.usertype,lastLogin : lastlogin});
                }
            }); 
          } else {

            dynamo.getUserItemsProj("organisation",user.userid,"organisationname",function(err,result){
                if(err) {
                    console.log(err);
                    res.status(500).json({status:500,message : "Please try again later"});
                } else {
//                    console.log(JSON.stringify(result));
                    res.status(200).json({status : 200, userid:user.userid, email : user.username, name : result.Items[0].organisationname.S, usertype:user.usertype,lastLogin : lastlogin});
                }
            });        
        }
      });
    })(req, res, next);
};

exports.logout = function(req, res) {
    req.logout();
    res.send(200);
};

// route to test if the user is logged in or not 
exports.loggedin = function(req, res) {
    res.send(req.isAuthenticated() ? req.user : '0'); 
};
