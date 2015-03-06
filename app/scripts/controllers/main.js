'use strict';
/**
 * @ngdoc function
 * @name weatherAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherAppApp
 */
angular.module('weatherAppApp').controller('MainCtrl', function($scope,
    $location, $http) {
    $scope.date = new Date();
    $scope.location = '';
    $scope.weatherToday = true;
    $scope.daysWeather = false;
    $scope.searchWeather = false;
    var onSuccess = function(position) {
        $scope.location="";
       // console.log(position);
        var date = new Date();
        var longitude = position.coords.longitude;
        var latitude = position.coords.latitude;
        $scope.weatherApi =
            'https://api.forecast.io/forecast/92b81d3f4f5f933c35d4f3d58e14bc0c/';
        $http.jsonp($scope.weatherApi + latitude + ',' + longitude +
            '?callback=JSON_CALLBACK&si=temperature').success(
            function(weather, status, headers, config) {
                //console.log(weather);
                var skycons = new Skycons({
                    'color': 'white'
                });
                skycons.add('js-weather-icon', weather.currently
                    .icon);
                skycons.add('day0-icon', weather.daily.data[0].icon);
                skycons.add('day1-icon', weather.daily.data[1].icon);
                skycons.add('day2-icon', weather.daily.data[2].icon);
                skycons.add('day3-icon', weather.daily.data[3].icon);
                skycons.add('day4-icon', weather.daily.data[4].icon);
                skycons.add('day5-icon', weather.daily.data[5].icon);
                skycons.add('day6-icon', weather.daily.data[6].icon);
                skycons.add('day7-icon', weather.daily.data[7].icon);
                skycons.play();
                $scope.bgImage= 'url("./images/'+ weather.currently.icon+'.jpg")'  ;
                console.log($scope.bgImage);
                
                $scope.currentTemperature = Math.round(weather.currently
                    .temperature);
                $scope.feelsLike = Math.round(weather.currently
                    .apparentTemperature);
                $scope.summary = weather.currently.summary;
                $scope.weeklyWeather = weather.daily.data;
            }).error(function(weather, status, headers, config) {
            console.log('ERR: Could not get Weather');
        });
        //Get current city from longitude and latitude
        $scope.cityApi =
            'http://maps.googleapis.com/maps/api/geocode/json?';
        $http.get($scope.cityApi + 'latlng=' + latitude + ',' +
            longitude + '&callback=JSON_CALLBACK').success(
            function(city, status, headers, config) {
                var result = city.results[0].address_components;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].types[0] === 'locality') {
                        $scope.location += result[i].short_name;
                    }
                    if (result[i].types[0] ===
                        'administrative_area_level_1') {
                        $scope.location += ' ' + result[i].short_name;
                    }
                }
            }).error(function(city, status, headers, config) {
            console.log('ERR: Could not get city');
        });
    };
    // onError Callback receives a PositionError object
    function onError(error) {
        console.log('code: ' + error.code + '\n' + 'message: ' +
            error.message + '\n');
    }
    $scope.getLocation = function(){
        $scope.location="";
        navigator.geolocation.getCurrentPosition(onSuccess, onError)
    }


    $scope.getDays = function getDays(startDate, daysToAdd) {
        var Dates = [];
        for (var i = 0; i <= daysToAdd; i++) {
            var currentDate = new Date();
            currentDate.setDate(startDate.getDate() + i);
            Dates.push(DayAsString(currentDate.getDay()));
        }
        return Dates;
    }

    function DayAsString(dayIndex) {
        var weekdays = new Array(7);
        weekdays[0] = "Sun";
        weekdays[1] = "Mon";
        weekdays[2] = "Tue";
        weekdays[3] = "Wed";
        weekdays[4] = "Thu";
        weekdays[5] = "Fri";
        weekdays[6] = "Sat";
        return weekdays[dayIndex];
    }
    var startDate = new Date();
    $scope.Day = $scope.getDays(startDate, 6);
    $scope.showToday = function() {
        $scope.weatherToday = true;
        $scope.daysWeather = false;
        $scope.searchWeather = false;
    }
    $scope.showWeek = function() {
        $scope.weatherToday = false;
        $scope.daysWeather = true;
        $scope.searchWeather = false;
    }
    $scope.showSearch = function() {
        $scope.weatherToday = false;
        $scope.daysWeather = false;
        $scope.searchWeather = true;
    }

    $scope.getCityPosition= function(){

            $scope.cityName = document.getElementById('search');

            if ($scope.cityName.value != "")
            {

            $scope.cityLocation ='http://maps.googleapis.com/maps/api/geocode/json?';
             $http.get($scope.cityLocation + 'address=' + $scope.cityName.value +'&callback=JSON_CALLBACK')
             .success(function(cityPosition,status, headers, config) {
                        $scope.cityLongLat=cityPosition.results[0].geometry.location;
                       // console.log($scope.cityLongLat);

                        var positionCity = {};
                        positionCity["coords"] = { longitude: $scope.cityLongLat.lng, latitude:$scope.cityLongLat.lat };
                      
                

                       onSuccess(positionCity);



            })
             .error(function(cityPosition, status, headers, config) {
        console.log('ERR: Could not get city');
            });

            }

            else
            {
               $scope.cityName.style.border = "1px solid red";
            }

            

    }


$scope.getLocation();

});