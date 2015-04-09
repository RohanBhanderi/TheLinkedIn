
var rendering = require('./util/rendering'),
    indexController = require('./controllers/index'),
    loginController = require('./controllers/login'),
    profileController = require('./controllers/profile'),
    userdtlsController = require('./controllers/userdtls'),
    edudtlsController = require('./controllers/edudtls'),
    expdtlsController = require('./controllers/expdtls'),
	skillsController = require('./controllers/skills'),
    organisationController = require('./controllers/organisation'),
	connsController = require('./controllers/conns');
	followController = require('./controllers/follow');
	connectionController = require('./controllers/connection');
	jobController = require('./controllers/jobpost');
	

module.exports = function (app, passport) {

    // Home
    app.get('/', indexController.home);
    app.get('/home', ensureAuthenticated, indexController.userHome);

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

    app.post('/skills', ensureAuthenticated, skillsController.saveSkills);
    app.post('/connections', ensureAuthenticated, connsController.saveConns);

    app.get('/userdtls',ensureAuthenticated,    userdtlsController.getAllUserDtls);
    app.get('/userdtls/:userid',ensureAuthenticated, 	userdtlsController.getUserDtls);
    app.get('/expdtls/:userid', ensureAuthenticated,    expdtlsController.getExpDtls);
    app.get('/edudtls/:userid', ensureAuthenticated, 	edudtlsController.getEduDtls);
    app.get('/skills/:userid', 	ensureAuthenticated, 	skillsController.getSkills);
    app.get('/connections/:userid', 	ensureAuthenticated, 	connsController.getConns);
    app.get('/connections/requests/:userid', ensureAuthenticated, connsController.getConnRequests);

    app.get('/companies',ensureAuthenticated,     organisationController.getProfitOrganisations);
    app.get('/institutions', ensureAuthenticated,    organisationController.getEduOrganisations);
    app.get('/skills', ensureAuthenticated,    skillsController.getAllSkills);

	app.get('/follow/:userid', followController.getFollow);
    app.post('/follow', followController.addFollow);
    app.del('/follow', followController.unFollow);
    app.get('/connect/:userid', connectionController.getConn);
    app.post('/connect', connectionController.addConn);
    app.del('/connect', connectionController.removeConn);
    app.post('/postjob', jobController.postJob);
    
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
