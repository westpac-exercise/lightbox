/*jslint node: true */
"use strict";

var app = angular.module('lb-pb-app', []);

app.controller('appctrl', ['$scope', function($scope) {

$scope.start = function () {
		// Broadcast the start invent , so that event can be handled from the directives 
		$scope.$broadcast("start");
		}	
}]);

