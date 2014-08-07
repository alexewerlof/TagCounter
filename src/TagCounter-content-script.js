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
        if (freq[tagName]) {
            freq[tagName]++;
        } else {
            freq[tagName] = 1;
        }
    }

    return freq;
}

/** Holds a list of all elements that have been highlighted so that we can easily remove the highlight effect later */
var hiEl = [];

/**
 * If there is a tagName, it will highlight all those tags by applying the OUTLINE style
 * If tagName is empty, it will remove all outline styles from the elements that are already in hiEl array above.
 * @param tagName
 */
function highlightTags (tagName) {
    var i;
    //the outline style that is used for highlighting elements
    var OUTLINE = '1px solid red';

    if (tagName) {
        var elements = document.getElementsByTagName(tagName);
        //All elements are from the same tag. If it is a kind of tag that can have a style
        if ( elements.length && elements[0].style) {
            for (i = elements.length - 1; i >= 0; i--) {
                hiEl.push(elements[i]);
                elements[i].style.outline = OUTLINE;
            }
        }
    } else {
        for (i = hiEl.length - 1; i >=0 ; i--) {
            hiEl[i].style.outline = '';
        }
        hiEl.length = 0;
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
chrome.runtime.sendMessage({readyToCount: true});