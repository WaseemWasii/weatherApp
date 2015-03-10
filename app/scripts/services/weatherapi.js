'use strict';

/**
 * @ngdoc service
 * @name weatherAppApp.weatherApi
 * @description
 * # weatherApi
 * Factory in the weatherAppApp.
 */
angular.module('weatherAppApp')
  .factory('weatherApi', ['$http',function ($http) {
    // Service logic
    // ...

    

    // Public API here
    return {
      getWeather: function (longitude,latitude) {

        
        var weather;
         var weatherApi =
            'https://api.forecast.io/forecast/92b81d3f4f5f933c35d4f3d58e14bc0c/';
       
        

        return $http.jsonp( weatherApi + latitude + ',' + longitude +
            '?callback=JSON_CALLBACK&si=temperature').success(
            function(weather) {            
            
            });
      },

      getCity: function(longitude,latitude){
      

        var cityApi =
            'http://maps.googleapis.com/maps/api/geocode/json?';

        return $http.get(cityApi + 'latlng=' + latitude + ',' +
            longitude + '&callback=JSON_CALLBACK').success(function(city){

            }).error(function(city, status, headers, config) {
            console.log('ERR: Could not get city');
        });
      },

      getLongLat:function(city){

        var cityName= city;
         var cityLocation ='http://maps.googleapis.com/maps/api/geocode/json?';
        return $http.get(cityLocation + 'address=' + cityName.value +'&callback=JSON_CALLBACK').success(function(cityPosition)
        {

        })
      }



    };
  }]);
