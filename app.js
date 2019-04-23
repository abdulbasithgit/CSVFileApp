var app = angular.module("myApp", ["ngRoute","ngFileUpload"]);

app.config(function($routeProvider) {
    $routeProvider
        .when('/mainPage', {
            templateUrl: 'app/view/mainPageView.html',
            controller: 'mainPageController'
        })
        .otherwise({
			redirectTo: '/mainPage'
		});
});