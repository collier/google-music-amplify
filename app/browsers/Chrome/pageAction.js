(function(global){
  'use strict';

  chrome.runtime.onInstalled.addListener(function (details) {
    // Replace all rules ...
    chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
      // With a new rule ...
      chrome.declarativeContent.onPageChanged.addRules([
        {
          // Fires when Google Music loads
          conditions: [
            new chrome.declarativeContent.PageStateMatcher({
              pageUrl: {
                urlContains: 'play.google.com/music',
                schemes: ['https','http']
              }
            })
          ],
          // And shows the extension's page action.
          actions: [ new chrome.declarativeContent.ShowPageAction() ]
        }
      ]);
    });
  });
}(this));
