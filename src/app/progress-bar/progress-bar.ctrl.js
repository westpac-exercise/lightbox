var app = angular.module('lb-pb-app');

app.controller('progressBarCtrl', ['$scope','configService', 'progressService' ,'$log', function($scope,configService, progressService,$log) {

var progressConfig = '';
	
	// call config service to retrieve progress data config data  
	configService
	.getJSON('data.json')
	.then(function(data){
		// perfrom config sanity 
		if(data && data.data.lightbox){
			progressConfig = data.data.lightbox;
			
			//call Progress service passing the config data 
			progressService
			   .start(progressConfig)
			   //promise will notify the progress value based on every heartbeat of the interval
			   .then(null, null, function(prog) {
			   	// set the scope progress attributes so that the view can be updated
			   	$scope.progress = prog;
			   	$scope.finish =progressConfig.finish;
			     //console.log($scope.progressConfig.finish);
			   })
			   // handle excpetion 
			   .catch(function error(msg) {
    			$log.error(msg);
 				 });
		}
	})
		//function to handle the start event from the view
 		$scope.start =function($scope) {
			progressService
			   .start(progressConfig)
			   .catch(function error(msg) {
    			$log.error(msg);
 				 });;
		}
}]);
