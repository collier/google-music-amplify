(function (window, angular, undefined) {
  'use strict';

  angular
    .module('lastfm', [])
    .provider('lastfm', function () {

      // Module global settings.
      var settings = {};
      settings.apiKey = null;
      settings.format = null;
      settings.apiBase = 'http://ws.audioscrobbler.com/2.0';

      this.setApiKey = function (apiKey) {
        settings.apiKey = apiKey;
        return settings.apiKey;
      };

      this.setFormat = function (format) {
        settings.format = format;
        return settings.format;
      };

      this.$get = ['$q', '$http', '$window', function ($q, $http, $window) {

        function NgLastfm () {
          this.apiBase = settings.apiBase;
          this.apiKey = settings.authToken;
          this.format = settings.format;
        }

        NgLastfm.prototype = {
          api: function (endpoint, method, params, data, headers) {
            var deferred = $q.defer();

            $http({
              url: this.apiBase + endpoint,
              method: method ? method : 'GET',
              params: params,
              data: data,
              headers: headers
            })
            .success(function (data) {
              deferred.resolve(data);
            })
            .error(function (data) {
              deferred.reject(data);
            });
            return deferred.promise;
          },

          searchTracks: function (track, artist, options) {
            options = options || {};
            options.track = track;
            options.artist = artist || {};
            options.method='track.search';
            options.format = this.format;
            options.api_key = this.apiKey;

            return this.api('/', 'GET', options);
          }
        };

        return new NgLastfm();

      }];

    });

}(window, angular));
