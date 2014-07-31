//maximum width of a bar
var BAR_MAX = 200;

function getStatsHtml(stats) {
    var ret = '';
    //add all key/value pars to an array
    var sortedStats = [];
    var totalTags = 0;
    for (var tagName in stats) {
        sortedStats.push({tagName:tagName, freq: stats[tagName]});
        totalTags += stats[tagName];
    }
    //write the number of used tags and the total number of all tags
    document.getElementById('tag-number').innerHTML = sortedStats.length.toString();
    document.getElementById('total-tags').innerHTML = totalTags.toString();
    //first sort the array alphabetically
    sortedStats.sort(function (a, b) {
        if (a.tagName < b.tagName) {
            return -1;
        } else if (a.tagName > b.tagName) {
            return 1;
        } else {
            return 0;
        }
    });
    //then sort it based on frequencies
    /*
     sortedStats.sort(function (a, b) {
     return b.freq - a.freq;
     });
     */
    for (var i = 0; i < sortedStats.length; i++) {
        ret += '<tr data-tag="' + sortedStats[i].tagName + '">' +
            '<td><code>&lt;' + sortedStats[i].tagName + '&gt;</code></td>' +
            '<td class="border-left">' + sortedStats[i].freq + '</td>' +
            '<td class="border-left"><div class="bar" style="width:' + Math.ceil(sortedStats[i].freq / totalTags * BAR_MAX) + 'px;"></div></td>' +
            '</tr>';

    }
    return ret;
}


var tabId; //this will cache the tabId
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
        //signal the counter.js script to highlight all instances of the tag
    });
}

/** the event listener for when the mouse leaves a row */
function onmouseout() {
    chrome.tabs.sendMessage(tabId, {highlightTags: true}, function (response) {
        //no tag is specified so it will unhighlight the tags previously highlighted
    });
}
