describe('progressService test', function(){
    describe('when I call progressService', function(){
		
		var service, $interval,http;
		var mockconfig = { start: 1, finish:100, duration : 100 };
		
		// Arrange
        beforeEach(module('lb-pb-app'));
        beforeEach(inject(function(_$interval_, _progressService_) {
    	service = _progressService_;
    	$interval = _$interval_;
    	}));

		//Assert         
       // expect(service).not.toEqual(null);
	
        it('should fetch progress percentage on every heartbeat interval', function() {

	    	var testProgress  = function(progress) {

	    	var progressValue =progress.value;	
	
	    	expect(progressValue >= mockconfig.start).toBeTruthy();
          	expect(progressValue <= mockconfig.finish).toBeTruthy();

          	$interval.flush(4000);	

            };

	    	var failTest = function(error) {
     		 expect(error).toBeUndefined();
   			 };

	        //act 
	        service.start(mockconfig)
	        .then(null,null,testProgress)
	        .catch(function(err){
	        	done(new Error('Promise fail: ' + err));
	        });
	     $interval.flush();        

	    });

    });    

});

