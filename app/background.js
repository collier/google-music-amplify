(function(global){
  'use strict';

  // Handles displaying page action icon only on Google Music pages
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

  // Helper method for forward message
  var forwardMessage = function(request) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, request, function(response) {
        console.log(request);
      });
    });
  };

  // Forward all messages back to content scripts
  chrome.runtime.onMessage.addListener(
    function(request, sender, sendResponse) {
      forwardMessage(request);
    }
  );

}(this));
