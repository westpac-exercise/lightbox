angular
.module('lb-pb-app')
.directive('lightBox', function() {
	return {
		restrict: 'EA',
		controller: 'lightBoxCtrl',
		//controllerAs: 'ctrl',
		templateUrl: 'app/light-box/light-box.tpl.html',
		scope: {},
		transclude: true,
		// event handler for the start event from the view
		link : function (scope) {
		scope.$on("start", function (event) {
				scope.showLightBox = true;
            });
      }
	};
});
