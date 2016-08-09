/*jslint node: true */
"use strict";

var app = angular.module('lb-pb-app', []);

app.controller('appctrl', ['$scope', function($scope) {

$scope.start = function () {
		// Broadcast the start invent , so that event can be handled from the directives 
		$scope.$broadcast("start");
		}	
}]);

;var app = angular.module('lb-pb-app');

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

;angular
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
;
angular
.module('lb-pb-app')
.service('progressService', ['$interval','$q','$log', function($interval,$q,$log) {

	var states = states = {
        PENDING: 0,
        STARTED: 1
    }, 
    	progress ={
    		value :0,
    		fractionedValue :0
    },
    fraction =1;
    
    return {
        progress: { value: 0, fractionedValue: 0  },

        start : function (progressConfig) {
        
            this.states = states;
            this.state = states.PENDING;    
            
            // using a promise as against a call back will ensure the Comtroller will be
            // notified of Heartbeat of the porgress as an when it happen
            var q =$q.defer();
            var progressInterval;
            progress.value =0;
            progress.fractionedValue=0;

            //only allow the progress to do its thing if the state is pending
            if (this.state == states.PENDING) {
                 
                 // Fractions will ensure the progress bar width will always add up to 100% 
                 // and not exceed it , this ensure the progress bar Width equates to 100%  
                 // regardlesss of the progress interval set from config (finish -start ) is  
                 // greater or less than 100 

                if ((progressConfig.finish-progressConfig.start) >100)
                    {
                        fraction =Math.floor((progressConfig.finish-progressConfig.start) /100);
                    }                
                
                progress.value=progressConfig.start;
                this.state = states.STARTED;

                // function will increment the progress value from start and finish 
                // based on the heart beat duration set in the config      
                progressInterval = $interval(function() {
                
                    if (progress.value< progressConfig.finish) {
                        progress.value += 1;
                        
                        if(progress.value % fraction ==0)
                        {
                            progress.fractionedValue+=1;
                            
                        }
                        if (progress.fractionedValue <= 100 ) 
                            q.notify(progress);
                        else 
                            q.reject('Error');    

                    } else {
                        $interval.cancel(progressInterval);
                    }
                }, progressConfig.duration);

        }
        return q.promise;
	},

    stop : function () {

        if (this.state == states.STARTED) {
           $interval.cancel(this.progressInterval);
        }
        
        this.state = states.PENDING;
    },
     valiidateConfig : function (progressConfig) {
               var isOk = false;

               if ( progressConfig !==null && 
                angular.isNumber(progressConfig.start) &&
                angular.isNumber(progressConfig.finish) &&
                angular.isNumber(progressConfig.duration)) 
                   {
                           isOk = true;
                   }
                   else
                   {
                    $log.error("Process config validation error")
                   }
                   return isOk;
               },
 }; 			
		
}]);
;var app = angular.module('lb-pb-app');

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
;angular
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
});;angular
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