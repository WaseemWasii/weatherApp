'use strict';

/**
 * @ngdoc directive
 * @name weatherAppApp.directive:weatherDirective
 * @description
 * # weatherDirective
 */
angular.module('weatherAppApp')
  .directive('weatherDirective', function ($timeout) {
    return {
      
      restrict: 'A',
      link: function (scope, element, attr) {
      	if (scope.$last === true) {
      		$timeout(function () {
      			scope.$emit('ngRepeatFinished');
      		})}}

       
      }
    }
  );




