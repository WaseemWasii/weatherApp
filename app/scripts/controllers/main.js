'use strict';
/**
 * @ngdoc function
 * @name weatherAppApp.controller:MainCtrl
 * @description
 * # MainCtrl
 * Controller of the weatherAppApp
 */
angular.module('weatherAppApp').controller('MainCtrl', function($scope,$location,$localStorage, $http,weatherApi) {

    $scope.$storage= $localStorage;
    $scope.date = new Date();
    $scope.location = '';
    $scope.weatherToday = true;
    $scope.daysWeather = false;
    $scope.searchWeather = false;
    $scope.selectedItem = "Recent Cities";





    var onSuccess = function(position) {
    $scope.location = '';
     var longitude = position.coords.longitude;
     var latitude = position.coords.latitude;

     weatherApi.getWeather(longitude,latitude).success(function(weather){

       
                $scope.bgImage= 'url("./images/'+ weather.currently.icon+'.jpg")'  ;
        
                
                $scope.currentTemperature = Math.round(weather.currently
                    .temperature);
                $scope.feelsLike = Math.round(weather.currently
                    .apparentTemperature);
                $scope.summary = weather.currently.summary;
                $scope.weeklyWeather = weather.daily.data;

       

                 for (var i=0; i < $scope.weeklyWeather.length; i++) {

                    for (var i=0; i<$scope.Days.length;i++){
                        weather.daily.data[i].day = $scope.Days[i];
                    }
                          };
                          var skycons = new Skycons({
                    'color': 'white'
                });


                skycons.add('js-weather-icon', weather.currently.icon);
                skycons.play();
          

                 $scope.addIcons= function(){

                     
                    skycons.add(weather.daily.data[0].day+'-icon', weather.daily.data[0].icon);
                    skycons.add(weather.daily.data[1].day+'-icon', weather.daily.data[1].icon);
                    skycons.add(weather.daily.data[2].day+'-icon', weather.daily.data[2].icon);
                    skycons.add(weather.daily.data[3].day+'-icon', weather.daily.data[3].icon);
                    skycons.add(weather.daily.data[4].day+'-icon', weather.daily.data[4].icon);
                    skycons.add(weather.daily.data[5].day+'-icon', weather.daily.data[5].icon);
                    skycons.add(weather.daily.data[6].day+'-icon', weather.daily.data[6].icon);
                    skycons.add(weather.daily.data[7].day+'-icon', weather.daily.data[7].icon);
                    skycons.play();
            
                 }


                $scope.DailyData  =  $scope.weeklyWeather;
              






    }).error(function(weather, status, headers, config) {
            console.log('ERR: Could not get Weather');
        });


     weatherApi.getCity(longitude,latitude)
     .success(function(city) {

                var result = city.results[0].address_components;
                for (var i = 0; i < result.length; i++) {
                    if (result[i].types[0] === 'locality') {
                        $scope.location += result[i].short_name;
                    }
                    if (result[i].types[0] ===
                        'administrative_area_level_1') {
                        $scope.location += ' ' + result[i].short_name;
                    }
                }})

     .error(function(city, status, headers, config) {
            console.log('ERR: Could not get city');
        });
 
    // onError Callback receives a PositionError object
   


       }


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
    $scope.Days = $scope.getDays(startDate, 6);



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

    
     if ($localStorage.cities == undefined)
    {
        $localStorage.cities= [];
    }


    $scope.favCities= $localStorage.cities;
    
        
     console.log($scope.favCities[0].name);


// Sends Location data from Recent Search History

     $scope.selectFavCity=function(value){
        console.log(value);
        var positionCity={};
        positionCity["coords"] = { longitude: value.longitude, latitude:value.latitude }; 
        onSuccess(positionCity);
     }
     
      
 
    
//updating LocalStorage for Future Data
  
    $scope.addfavCities =function(city){  

     $localStorage.cities.push(city);
    

    }
    

// Get City Position

    $scope.getCityPosition= function(){

            $scope.cityName = document.getElementById('search');

            if ($scope.cityName.value != "")
            {
                 weatherApi.getLongLat($scope.cityName).success(function(cityPosition) {
                    $scope.cityLongLat=cityPosition.results[0].geometry.location;
                    var positionCity = {};


                    positionCity["coords"] = { longitude: $scope.cityLongLat.lng, latitude:$scope.cityLongLat.lat }; 


                   //sending data to Local Storage Function

                    var city ={ name:$scope.cityName.value,longitude: $scope.cityLongLat.lng,latitude:$scope.cityLongLat.lat};
                    
                     $scope.addfavCities(city); 
                    
                    onSuccess(positionCity);

                    
               
               })
                 .error(function(cityPosition, status, headers, config) {console.log('ERR: Could not get city');

             });
   
             }}

$scope.$on('ngRepeatFinished', function(ngRepeatFinishedEvent) {
    $scope.addIcons();
});

$scope.getLocation();

});