describe('Unit testing Light box', function() {
  var $compile,
      $rootScope;

  // Load the lb-pb-app module, which contains the directive
  beforeEach(module('lb-pb-app'));

  var $httpBackend;
  beforeEach(inject(function($injector) {
 
}));

  // Store references to $rootScope and $compile
  // so they are available to all tests in this describe block
  beforeEach(inject(function(_$compile_, _$rootScope_,$injector){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $compile = _$compile_;
    $rootScope = _$rootScope_;
    $httpBackend = $injector.get('$httpBackend');
  }));

  it('Replaces the element with the appropriate content', function() {

   //$httpBackend.whenGET('app/light-box/light-box.tpl.html').passThrough();
    // Compile a piece of HTML containing the directive
    var element = $compile('<light-box class="lightbox"></light-box>')($rootScope);
    // fire all the watches, so the scope expression will be evaluated
    $rootScope.$digest();
    console.log("test" + element.html());
    // Check that the compiled element contains the templated content
    expect(element.html()).toContain("Progress");
  });
});
