angular
.module('lb-pb-app')
.service('configService', ['$http', '$log', function($http, $log) {
	this.getJSON = function (filePath) {
		return $http.get(filePath)
		.then(function (response) {
			if (response.data) {
				return response.data;
			} else {
				$log.error(response);
				return null;
			}
		}, function (response) {
			$log.error(response.status, response.statusText);
			return null;
		});
	};
}]);