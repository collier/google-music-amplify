'use strict';

// chrome.runtime.onInstalled.addListener(function (details) {
//  // Replace all rules ...
//   chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
//     // With a new rule ...
//     chrome.declarativeContent.onPageChanged.addRules([
//       {
//         // That fires when a page's URL contains a 'g' ...
//         conditions: [
//           new chrome.declarativeContent.PageStateMatcher({
//             pageUrl: {
//               urlContains: 'google',
//               schemes: ['https','http']
//             }
//           })
//         ],
//         // And shows the extension's page action.
//         actions: [ new chrome.declarativeContent.ShowPageAction() ]
//       }
//     ]);
//   });
// });

// chrome.tabs.onUpdated.addListener(function (tabId) {
//   chrome.pageAction.show(tabId);
// });

// chrome.tabs.onUpdated.addListener(function (tabId) {
  // chrome.pageAction.show(tabId);
// });


chrome.tabs.onUpdated.addListener(function (tabId) {
 // Replace all rules ...
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    // With a new rule ...
    chrome.declarativeContent.onPageChanged.addRules([
      {
        // That fires when a page's URL contains a 'g' ...
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({
            pageUrl: {
              urlContains: 'google',
              schemes: ['https','http']
            }
          })
        ],
        // And shows the extension's page action.
        actions: [ new chrome.pageAction.show(tabId) ]
      }
    ]);
  });
});

console.log('\'Allo \'Allo! Event Page for Page Action');
