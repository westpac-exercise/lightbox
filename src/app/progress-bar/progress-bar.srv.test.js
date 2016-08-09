/*describe('progressService test', function(){
    describe('when I call progressService', function(){
		
		var service,http;
		var mockconfig = { start: 1, finish:100, duration : 100 };
		
		// Arrange
        beforeEach(module('lb-pb-app'));
        beforeEach(inject(function(progressService) {
    	service = progressService;
    	}));

		//Assert         
        expect(service).not.toEqual(null);
	
        it('should fetch progress percentage on every heartbeat interval', inject(function(service,$timeout) {

	    	var testProgress  = function(progress) {

	    	var progressValue =progress.value;	
	
	    	expect(progressValue >= mockconfig.start).toBeTruthy();
          	expect(progressValue <= mockconfig.finish).toBeTruthy();
            };

	    	var failTest = function(error) {
     		 expect(error).toBeUndefined();
   			 };

	        //act 
	        service.start(mockconfig)
	        .then(null,null,testProgres)
	     //   .catch(function(err){
	     //   	done(new Error('Promise fail: ' + err));
	     //   });
	     $timeout.flush();        


	    }));

    });    

});
*/ 


describe("Asynchronous specs", function() {
var service,http;
var mockconfig = { start: 1, finish:100, duration : 100 };
service = "progressService";
   beforeEach(module('lb-pb-app'));	
  beforeEach(function(done) {
    setTimeout(function() {
      
      done();
    }, mockconfig.duration);
  });



    it('should fetch progress percentage on every heartbeat interval', inject(function(service,done) {

	    	var testProgress  = function(progress) {

	    	var progressValue =progress.value;	
	
	    	expect(progressValue >= mockconfig.start).toBeTruthy();
          	expect(progressValue <= mockconfig.finish).toBeTruthy();
            };

	    	var failTest = function(error) {
     		 expect(error).toBeUndefined();
   			 };

	        //act 
	        service.start(mockconfig)
	        .then(null,null,testProgres)
	     //   .catch(function(err){
	     //   	done(new Error('Promise fail: ' + err));
	     //   });
	    done();
  	    }));
   	 
  	});

 /* describe("long asynchronous specs", function() {
    var originalTimeout;
    beforeEach(function() {
      originalTimeout = jasmine.DEFAULT_TIMEOUT_INTERVAL;
      jasmine.DEFAULT_TIMEOUT_INTERVAL = 10000;
    });

    it("takes a long time", function(done) {
      setTimeout(function() {
        done();
      }, 9000);
    });

    afterEach(function() {
      jasmine.DEFAULT_TIMEOUT_INTERVAL = originalTimeout;
    });
  });
});

*/
