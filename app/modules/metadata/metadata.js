'use strict';

var ngMaterial  = require('angular-material'),
    Spotify     = require('angular-spotify');

module.exports = angular.module('GMA_Metadata', ['ngMaterial', 'spotify'])
  .config(function($mdThemingProvider){
    $mdThemingProvider.theme('default')
      .primaryPalette('light-blue')
  })
  .controller('FindBtnCtrl', require('./find-btn.js'))
  .controller('DialogCtrl', require('./dialog.js'));
