var app = angular.module('lb-pb-app');

app.controller('lightBoxCtrl', ['$scope', function($scope) {
	
	//Shows the light box on controller instantciation
	$scope.showLightBox = true;
	// event handler for the start event from the root view
	$scope.open = function($scope){
		$scope.showLightBox = false;
	};

	// event handler for the close event from the lightbox template view
	$scope.close = function(){
		$scope.showLightBox = false;
	};

}]);

