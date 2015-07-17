angular.module('metadata', ['ngMaterial','spotify'])

.controller('MetadataCtrl', function($scope, $mdDialog) {
  $scope.alert = '';
  $scope.showDialog = function(ev) {
    $mdDialog.show({
      controller: 'DialogCtrl',
      templateUrl: chrome.extension.getURL('modules/metadata/dialog.html'),
      parent: angular.element(document.body),
      targetEvent: ev
    });
  };
})

.controller('DialogCtrl', function($scope, $mdDialog, Spotify) {
  $scope.songName = $('.simple-dialog-content input[data-field="1"]').attr('data-original');
  $scope.songArtist = $('.simple-dialog-content input[data-field="3"]').attr('data-original');

  var buildQuery = function(track, artist) {
    var result='track:"'+track+'"';
    if(artist)
      result+='+artist:"'+artist+'"';
    return result;
  };

  Spotify.search(buildQuery($scope.songName, $scope.songArtist), 'track').then(function (data) {
    $scope.spotifyResults = data.tracks.items;
    console.log($scope.spotifyResults);
  });

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
    $mdDialog.hide(answer);
  };
});
