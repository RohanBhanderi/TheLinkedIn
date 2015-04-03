var flash = require('connect-flash');

module.exports = function() {
    return function(req, res, next) {
        var error_messages = req.flash('error');
        var info_messages = req.flash('info');
        var success_messages = req.flash('success');
        res.locals.messages = [];
        for(var i in error_messages) {
            res.locals.messages.push({type: 'alert alert-danger alert-dismissible', message: error_messages[i]});
        }
        for(var i in info_messages) {
            res.locals.messages.push({type: 'alert alert-info alert-dismissible', message: info_messages[i]});
        }
        for(var i in success_messages) {
            res.locals.messages.push({type: 'alert alert-success alert-dismissible', message: success_messages[i]});
        }   
        res.locals.isAuthenticated = req.isAuthenticated();
        res.locals.flash = req.flash;
        res.locals.session = req.session;
        res.locals.userid = (typeof(req.user) != "undefined" && req.user != null) ? req.user.id : '';
        next();
    };
};
