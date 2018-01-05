//Note: since this code is running on document_idle, DOM is in place. It may even run after window.onload

//the outline style that is used for highlighting elements
const OUTLINE = '1px solid red';
/** Holds a list of all elements that have been highlighted so that we can easily remove the highlight effect later */
const highlighted = [];

/**
 * Returns all elements in the page for analysis in the popup script
 */
function getTagList() {
    // see also getElementsByTagNameNS
    return Array.from(document.getElementsByTagName('*')).map(t => t.tagName);
};

/**
 * Removes the outline styles from all elements in highlighted array
 */
function unhighlight() {
    highlighted.forEach(el => el.style.outline = '');
    highlighted.length = 0;
};

/**
 * Highlights all elements with the specified tag applying the OUTLINE style and putting them in highlighted array
 * @param tagName {String} the name of the tag to be highlighted
 */
function highlight(tagName) {
    // perf: skip the whole unhighlight and hightlight thing if it's the same tag that's already highlighted
    unhighlight();

    Array.from(document.getElementsByTagName(tagName))
        .filter(el => style in el)
        .forEach(el => {
            style.outline = OUTLINE;
            highlighted.push(el);
        });
};

const messageHandlerFns = { highlight, unhighlight, getTagList};
/**
 * Register this content script for being called (the popup will call it)
 * @param message {Object}
 *        message.fname {string} name of the function (it should exist in the `messageHandlerFns` in this file
 *        [message.args] {Array} an optional array that will be passed to the function as its arguments
 * @param sendResponseFn {function} The function that will be called back with the results of the call
 */
chrome.runtime.onMessage.addListener(function (message, sender, sendResponseFn) {
    const fn = messageHandlerFns[message.fname];
    if (typeof fn === 'function') {
        sendResponseFn(Array.isArray(message.args)? fn(...message.args): fn());
    }
});

//Tell the background page that this content script is loaded and ready to be called
chrome.runtime.sendMessage({fname: 'readyToCount'});
