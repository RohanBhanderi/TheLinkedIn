var loginController = require('./controllers/login'),
    profileController = require('./controllers/profile'),
    userdtlsController = require('./controllers/userdtls'),
    edudtlsController = require('./controllers/edudtls'),
    expdtlsController = require('./controllers/expdtls'),
	skillsController = require('./controllers/skills'),
    organisationController = require('./controllers/organisation'),
	followController = require('./controllers/follow'),
	connectionController = require('./controllers/connection'),
	jobController = require('./controllers/jobpost'),
	followController = require('./controllers/follow'),
	connectionController = require('./controllers/connection');

module.exports = function (app, passport) {

    // Home
    app.get('/', function(req,res){ res.render("index"); });
    app.get(['/home','/logout'], ensureAuthenticated, function(req,res){ res.render("index"); });

    // Auth
    app.post('/register', loginController.register);
    app.get('/login', loginController.loginPage);
    app.post('/login', loginController.checkLogin);
    app.get('/loggedin',loginController.loggedin);
    app.post('/logout', loginController.logout);
    
    // Profile
    //app.get('/profile', ensureAuthenticated, profileController.showProfile);
    app.put('/userdtls', ensureAuthenticated, userdtlsController.updateUserDtls);
    
    app.post('/edudtls', ensureAuthenticated, edudtlsController.saveEduDtls);
    app.put('/edudtls', ensureAuthenticated, edudtlsController.updateEduDtls);
    app.delete('/edudtls', ensureAuthenticated, edudtlsController.deleteEduDtls);
    
    app.post('/expdtls', ensureAuthenticated, expdtlsController.saveExpDtls);
    app.put('/expdtls', ensureAuthenticated, expdtlsController.updateExpDtls);
    app.delete('/expdtls', ensureAuthenticated, expdtlsController.deleteExpDtls);

     app.get('/skills/:userid',     ensureAuthenticated,    skillsController.getSkills);
    app.post('/skills', ensureAuthenticated, skillsController.saveSkills);

    app.get('/userdtls',ensureAuthenticated,    userdtlsController.getAllUserDtls);
    app.get('/userdtls/:userid',ensureAuthenticated, 	userdtlsController.getUserDtls);
    app.get('/expdtls/:userid', ensureAuthenticated,    expdtlsController.getExpDtls);
    app.get('/edudtls/:userid', ensureAuthenticated, 	edudtlsController.getEduDtls);
   
    app.get('/companies',ensureAuthenticated,     organisationController.getProfitOrganisations);
    app.get('/institutions', ensureAuthenticated,    organisationController.getEduOrganisations);
    app.get('/skills', ensureAuthenticated,    skillsController.getAllSkills);

    //Connections
	app.get('/follow/:userid', ensureAuthenticated, followController.getFollow);
    app.post('/follow', ensureAuthenticated, followController.addFollow);
    app.delete('/follow', ensureAuthenticated, followController.unFollow);
    app.get('/connect/:userid', ensureAuthenticated, connectionController.getConn);
    app.post('/connect', ensureAuthenticated, connectionController.addConn);
    app.delete('/connect', ensureAuthenticated, connectionController.removeConn);
    app.post('/postjob', ensureAuthenticated, jobController.postJob);
    app.delete('/deletejob', ensureAuthenticated, jobController.deleteJob);
    app.get('/connect/:userid/:secuserid', ensureAuthenticated, connectionController.checkUsersConn);
	
    //Auth Middleware
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { 
            return next(); 
        } else {
            //res.redirect('/login');
           // res.status(401).json({message : "Unauthorized access !!"}); 
        }
    }
};
