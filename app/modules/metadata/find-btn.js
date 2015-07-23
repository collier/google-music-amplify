'use strict';

module.exports = function($scope, $mdDialog) {
  $scope.alert = '';

  $scope.showDialog = function(ev) {
    $mdDialog.show({
      controller: 'DialogCtrl',
      templateUrl: chrome.extension.getURL('modules/metadata/dialog.html'),
      parent: angular.element(document.body),
      targetEvent: ev
    });
  };

};
