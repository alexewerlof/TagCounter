//the outline style that is used for highlighting elements
var OUTLINE = '1px solid red';

//Note: since this code is running on document_idle, DOM is in place. It may even run after window.onload
/**
 * This function counts all the tags in this HTML file.
 * It is passive which means it waits for a message from the page action to start counting.
 * @returns {Object} an Object which its keys are tag names (in upper case) and their values are counts (numbers bigger than 0)
 */
function countTags () {
    var allElements = document.getElementsByTagName('*');
    var freq = {};
    for (var i = 0; i < allElements.length; i++) {
        var tagName = allElements[i].tagName;
        if (!freq.hasOwnProperty(tagName)) {
            freq[tagName] = 0;
        }
        freq[tagName]++;
    }

    return freq;
}

var highlightedElements = [];

function highlightTags (tagName) {
    if (tagName) {
        var elements = document.getElementsByTagName(tagName);
        for (var i = 0; i < elements.length; i++) {
            //if it is a tag that can have a style
            if (elements[i].style) {
                elements[i].style.outline = OUTLINE;
                highlightedElements.push(elements[i]);
            }
        }
    } else {
        for (var i = 0; i < highlightedElements.length; i++) {
            if (highlightedElements[i].style) {
                highlightedElements[i].style.outline = '';
            }
        }
        highlightedElements.length = 0;
    }
}

//Register this content script for being called (the popup will call it)
chrome.runtime.onMessage.addListener(function (message, sender, sendResponseFn) {
    if (message.countTags) {
        sendResponseFn(countTags());
    } else if (message.highlightTags) {
        highlightTags(message.tagName);
    }
});

//Tell the background page that this content script is loaded and ready to be called
chrome.runtime.sendMessage({readyToCount: true}, function(response) {
    //Do nothing. Wait for the page action to decide when it's time to count
});