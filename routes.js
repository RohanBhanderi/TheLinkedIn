
var rendering = require('./util/rendering'),
    indexController = require('./controllers/index'),
    loginController = require('./controllers/login'),
    profileController = require('./controllers/profile'),
    userdtlsController = require('./controllers/userdtls'),
    edudtlsController = require('./controllers/edudtls'),
    expdtlsController = require('./controllers/expdtls'),
	skillsController = require('./controllers/skills'),
	connsController = require('./controllers/conns');

module.exports = function (app, passport) {

    // Home
    app.get('/', indexController.home);
    app.get('/home', ensureAuthenticated, indexController.userHome);

    // Auth
    app.get('/register', loginController.registerPage);
    app.post('/register', loginController.registerPost);
    app.get('/login', loginController.loginPage);
    app.post('/login', loginController.checkLogin);
    app.get('/logout', loginController.logout);
    
    // Profile
    app.get('/profile', ensureAuthenticated, profileController.showProfile);
    app.post('/userdtls', ensureAuthenticated, userdtlsController.saveUserDtls);
    app.post('/edudtls', ensureAuthenticated, edudtlsController.saveEduDtls);
    app.post('/expdtls', ensureAuthenticated, expdtlsController.saveExpDtls);
    app.post('/skills', ensureAuthenticated, skillsController.saveSkills);
    app.post('/conns', ensureAuthenticated, connsController.saveConns);

    app.get('/userdtls/:userid',ensureAuthenticated, 	userdtlsController.getUserDtls);
    app.get('/edudtls/:userid', ensureAuthenticated, 	edudtlsController.getEduDtls);
    app.get('/expdtls/:userid', ensureAuthenticated, 	expdtlsController.getExpDtls);
    app.get('/skills/:userid', 	ensureAuthenticated, 	skillsController.getSkills);
    app.get('/conns/:userid', 	ensureAuthenticated, 	connsController.getConns);
   
    //Auth Middleware
    function ensureAuthenticated(req, res, next) {
        if (req.isAuthenticated()) { return next(); }
        res.redirect('/login');
    }
};
