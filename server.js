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

app.use(cookieParser());
//app.use(bodyParser());
app.use(bodyParser.json()); // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // to support URL-encoded bodies
app.use(expressValidator());
app.use(express.logger('dev'));
app.use(cookieSession({ secret: '@cMpE@7#' , cookie: { maxAge: 60000 }}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());
app.use(express.static('./public'));
//app.use(express.favicon(__dirname + '/public/images/shortcut-icon.png'));
app.use(messages());

app.engine('html', swig.renderFile);
app.set('view engine', 'html');
app.set('views', __dirname + '/views');

// view caching
// app.set('view cache', false);
// swig.setDefaults({ cache: false });

require('./util/auth')(passport);
require('./routes')(app, passport);
mysql.createConnPool();

app.listen(3000);
console.log('Listening on port 3000');
