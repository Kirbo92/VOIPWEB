(function () {
	var app = angular.module('app', [
		'ngRoute',
		'app.controllers',
        'app.services'
	])

	.config(['$routeProvider', function ($routeProvider) {
		$routeProvider
		
		.when('/', {
			templateUrl: 'views/voip.html',
			controller: 'VoipController'
		})
	}])
})();