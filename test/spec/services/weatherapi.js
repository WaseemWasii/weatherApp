'use strict';

describe('Service: weatherApi', function () {

  // load the service's module
  beforeEach(module('weatherAppApp'));

  // instantiate service
  var weatherApi;
  beforeEach(inject(function (_weatherApi_) {
    weatherApi = _weatherApi_;
  }));

  it('should do something', function () {
    expect(!!weatherApi).toBe(true);
  });

});
