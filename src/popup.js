function getStatsHtml(stats) {
    var ret = '';
    var totalTags = 0;
    //TODO: add the frequency bar
    for (var tagName in stats) {
        ret += '<tr data-tag="' + tagName + '"><td>&lt;' + tagName + '&gt;</td><td>' + stats[tagName] + '</td></tr>';
        totalTags += stats[tagName];
    }
    //TODO: remove this dirty method
    document.getElementById('total-tags').innerHTML = totalTags;
    return ret;
}

var tabId;
chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    tabId = tabs[0].id;
    chrome.tabs.sendMessage(tabId, {countTags: true}, function(response) {
        var tableBody = document.getElementById('table-body');
        tableBody.innerHTML = getStatsHtml(response);
        var rows = tableBody.childNodes;
        for (var i = 0; i < rows.length; i++) {
            rows[i].addEventListener('mouseover', onmouseover);
            rows[i].addEventListener('mouseout', onmouseout);
        }
    });
});

/** the event listener for when the mouse of over a row */
function onmouseover (e) {
    chrome.tabs.sendMessage(tabId, {highlightTags: true, tagName: e.currentTarget.dataset['tag']}, function (response) {

    });
}

/** the event listener for when the mouse leaves a row */
function onmouseout() {
    chrome.tabs.sendMessage(tabId, {highlightTags: true}, function (response) {
        //no tag is specified so it will unhighlight the tags previously highlighted
    });
}
