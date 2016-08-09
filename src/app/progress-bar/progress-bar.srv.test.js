
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

 
