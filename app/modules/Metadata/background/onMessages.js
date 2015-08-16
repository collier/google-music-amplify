(function(global){
  'use strict';

  chrome.runtime.onMessage.addListener(
    // Handle all messages coming from content scripts
    function(request, sender, sendResponse) {
      if (request.event == "hello") {
        sendResponse({
          farewell: "goodbye"
        });
      }
    }
  });
}(this));
