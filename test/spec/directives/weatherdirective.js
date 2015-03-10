'use strict';

describe('Directive: weatherDirective', function () {

  // load the directive's module
  beforeEach(module('weatherAppApp'));

  var element,
    scope;

  beforeEach(inject(function ($rootScope) {
    scope = $rootScope.$new();
  }));

  it('should make hidden element visible', inject(function ($compile) {
    element = angular.element('<weather-directive></weather-directive>');
    element = $compile(element)(scope);
    expect(element.text()).toBe('this is the weatherDirective directive');
  }));
});
