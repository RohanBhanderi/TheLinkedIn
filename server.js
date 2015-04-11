var express = require('express'),
    expressValidator = require('express-validator'),
    flash = require('connect-flash'),
    swig = require('swig'),
    passport = require('passport'),
    crypto = require('crypto'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    cookieSession = require('cookie-session'),
    messages = require('./util/messages'),
    mysql = require('./models/mysql');

var app = express();

app.set('port', process.env.PORT || 3000);
app.use(cookieParser());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(expressValidator());
app.use(express.logger('dev'));
app.use(cookieSession({ secret: '@cMpE@8#' , cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static(__dirname + '/public'));
app.use(messages());

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// view caching
// app.set('view cache', false);
// swig.setDefaults({ cache: false });

require('./util/auth')(passport);

//API endpoints
require('./routes')(app, passport);

//If request does not map to any route redirect to default route.
app.get('*', function(req, res){
    res.render("index");
});

//Connection pool initialization
mysql.createConnPool();

app.listen(app.get('port'), function() {
    console.log('%s: Node server started on %d ...', Date(Date.now()), app.get('port'));
});
