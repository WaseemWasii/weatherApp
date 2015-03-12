'use strict';
/**
 * @ngdoc service
 * @name weatherAppApp.weatherApi
 * @description
 * # weatherApi
 * Factory in the weatherAppApp.
 */
angular.module('weatherAppApp').factory('weatherApi', ['$http',
    function($http) {
        // Service logic
        // ...
        // Public API here
        return {
            getWeather: function(longitude, latitude) {
                var weather;
                var weatherApi =
                    'https://api.forecast.io/forecast/92b81d3f4f5f933c35d4f3d58e14bc0c/';
                return $http.jsonp(weatherApi + latitude + ',' +
                    longitude +
                    '?callback=JSON_CALLBACK&si=temperature').success(
                    function(weather, status, headers, config) {}
                ).error(function(weather, status, headers,
                    config) {
                    console.log(
                        'ERR: Could not get Weather');
                });
            },
            getCity: function(longitude, latitude) {
                var cityApi =
                    'https://maps.googleapis.com/maps/api/geocode/json?';
                return $http.get(cityApi + 'latlng=' + latitude +
                    ',' + longitude + '&callback=JSON_CALLBACK&key=AIzaSyB1dk8PXJ96MAPNBP29rG6kDovG201nEj4'
                ).success(function(city, status, headers,
                    config) {}).error(function(city, status,
                    headers, config) {});
            },
            getLongLat: function(city) {
                var cityName = city;
                var cityLocation =
                    'https://maps.googleapis.com/maps/api/geocode/json?';
                return $http.get(cityLocation + 'address=' +
                        cityName.value + '&callback=JSON_CALLBACK&key=AIzaSyB1dk8PXJ96MAPNBP29rG6kDovG201nEj4')
                    .success(function(cityPosition, status, headers,config) {})
                    .error(function(cityPosition,status, headers, config) {
                        console.log('ERR: Could not get city');
                    });
            }
        };
    }
]);