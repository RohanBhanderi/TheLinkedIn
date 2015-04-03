var app = angular.module('app',['angular-flash.service', 'angular-flash.flash-alert-directive','xeditable'])
.config(function (flashProvider) {
            flashProvider.errorClassnames.push('alert-danger');
            flashProvider.successClassnames.push('alert-success');
            flashProvider.warnClassnames.push('alert-warn');
            flashProvider.infoClassnames.push('alert-info');
})
.run(function(editableOptions) {
  editableOptions.theme = 'bs3'; // bootstrap3 theme
});