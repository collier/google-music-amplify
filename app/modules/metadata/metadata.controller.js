angular.module('metadata', ['ngMaterial','spotify'])

.controller('MetadataBtnCtrl', function($scope, $mdDialog) {
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
  $scope.songName = angular.copy($('.simple-dialog-content input[data-field="1"]').attr('data-original'));
  $scope.songArtist = angular.copy($('.simple-dialog-content input[data-field="3"]').attr('data-original'));

  var buildQuery = function(track, artist) {
    var result='track:"'+track+'"';
    if(artist)
      result+='+artist:"'+artist+'"';
    return result;
  };

  $scope.getSpotifyResults = function() {
    Spotify.search(buildQuery($scope.songName, $scope.songArtist), 'track').then(function (data) {
      $scope.spotifyResults = data.tracks.items;
    });
  };

  $scope.getSpotifyResults();

  $scope.updateMetadata = function(song) {
    $('.simple-dialog-content input[data-field="1"]').val(song.name);
    $('.simple-dialog-content input[data-field="3"]').val(song.artists[0].name);
    $('.simple-dialog-content input[data-field="5"]').val(song.artists[0].name);
    $('.simple-dialog-content input[data-field="4"]').val(song.album.name);
    $('.simple-dialog-content input[data-field="14"]').val(song.track_number);
    $('.simple-dialog-content input[data-field="16"]').val(song.disc_number);
    $('.simple-dialog-content .album-image a.download')
      .attr('download',song.album.name+song.name)
      .attr('href',song.album.images[0].url)
      .show();
    Spotify.getAlbum(song.album.id).then(function(data){
      $('.simple-dialog-content input[data-field="18"]').val(data.release_date.substring(0,4));
      $('.simple-dialog-content input[data-field="15"]').val(data.tracks.total);
      $('.simple-dialog-content input[data-field="11"]').val(data.genres[0]);
      $scope.hide();
    });
  }

  $scope.hide = function() {
    $mdDialog.hide();
  };
});
