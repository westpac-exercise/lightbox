angular
.module('lb-pb-app')
.directive('progressBar', function () {
	return {
		restrict: 'E',
		controller: 'progressBarCtrl',
		transclude: true,
		templateUrl: 'app/progress-bar/progress-bar.tpl.html',
		// event handler for the start event from the view
			link : function (scope) {
		scope.$on("start", function (event) {
				scope.start();
            });
      }
	};
});