/*
chrome.tabs.onActivated.addListener(function (activeInfo) {
    chrome.pageAction.show(activeInfo.tabId);
});*/

chrome.runtime.onMessage.addListener(function (message, sender, sendResponseFn) {
    if (message.readyToCount && sender && sender.tab && sender.tab.id) {
        chrome.pageAction.show(sender.tab.id);
    }
});