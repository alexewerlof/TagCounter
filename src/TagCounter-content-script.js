//Note: since this code is running on document_idle, DOM is in place. It may even run after window.onload

/**
 * This object contains the exported functionality.
 * It is specially used in the addListener() call to expose this API to the popup so that it can call any of these functions.
 */
var exports = {};

/**
 * Returns all elements in the page for analysis in the popup script
 */
exports.getAllElements = function () {
    var allElements = document.getElementsByTagName('*');
    var results = [];
    for ( var i = 0; i < allElements.length; i++) {
        results.push(allElements[i].tagName.toLowerCase());
    }
    return results;
};

/** Holds a list of all elements that have been highlighted so that we can easily remove the highlight effect later */
var hiEl = [];

/**
 * Removes the outline styles from all elements in hiEl array
 */
exports.unhighlight = function () {
    for (var i = 0; i < hiEl.length; i++) {
        hiEl[i].style.outline = '';
    }
    hiEl.length = 0;
};

/**
 * Highlights all elements with the specified tag applying the OUTLINE style and putting them in hiEl array
 * @param tagName {String} the name of the tag to be highlighted
 */
exports.highlightTags = function (tagName) {
    var i;
    //the outline style that is used for highlighting elements
    var OUTLINE = '1px solid red';

    var elements = document.getElementsByTagName(tagName);
    //All elements are from the same tag. If it is a kind of tag that can have a style
    if ( elements.length && elements[0].style) {
        for (i = elements.length - 1; i >= 0; i--) {
            hiEl.push(elements[i]);
            elements[i].style.outline = OUTLINE;
        }
    }
};

/**
 * Register this content script for being called (the popup will call it)
 * @param message {Object}
 *        message.fname {string} name of the function (it should exist in the `exports` in this file
 *        [message.args] {Array} an optional array that will be passed to the function as its arguments
 * @param sendResponseFn {function} The function that will be called back with the results of the call
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponseFn) {
    sendResponseFn(exports[message.fname].apply(document, message.args || []))
});

//Tell the background page that this content script is loaded and ready to be called
chrome.runtime.sendMessage({readyToCount: true});