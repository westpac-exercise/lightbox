
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
