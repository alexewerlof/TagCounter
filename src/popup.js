/*global chrome*/

import Vue from 'vue.js';
import stats from './stats.vue';

function tellContentScript(fname, ...args) {
    return new Promise((resolve, reject) => {
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, { fname, args }, (ret) => {
                ret === undefined ? reject(chrome.runtime.lastErro) : resolve(ret)
            });
        });
    });
}

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log(sender.tab ?
                "from a content script:" + sender.tab.url :
                "from the extension");
    alert(request);
    // sendResponse({farewell: "goodbye"});
});

const popup = new Vue({
    el: '#app',
    created() {
        this.getTagList();
    },
    methods: {
        getTagList() {
            return tellContentScript('getTagList').then(tags => this.tags = tags);
        },
        highlight(tagName) {
            return tellContentScript('highlight', tagName);
        },
        unhighlight() {
            return tellContentScript('unhighlight');
        }
    },
    data: {
        tags: []
    },
    render(h) {
        return h('stats', {
            props: {
                tags: this.tags,
                getTagList: this.getTagList,
                highlight: this.highlight,
                unhighlight: this.unhighlight
            }
        });
    },
    components: { stats }
});

/*
var app = angular.module('popup', []);

app.constant('chrome', chrome);
app.constant('chrome', {
    tabs: {
        query: function (query, callback) {
            callback([1]);
        },
        sendMessage: function (tabId, msg, callback) {
            //setTimeout(function () {
            callback(['html', 'body', 'a', 'a']);
            //}, 0);
        }
    }
});

app.factory('getTabId', ['chrome', function (chrome) {
    //cache the tabId
    var tabIdCache;
    // does something in the current tab. For speed improvement it caches the tabId
    // @param callback {function} The function to call when the tabId is resolved
    return function getTabId(callback) {
        if (tabIdCache) {
            callback(tabIdCache);
        } else {
            chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
                tabIdCache = tabs[0].id;
                callback(tabIdCache);
            });
        }
    };
}]);

app.factory('sendMessage', ['chrome', 'getTabId', function (chrome, getTabId) {
    // Sends a message to the content script
    // @param msg {Object} the message object
    // @param callback [function] the function that processes the results from the content script
    //
    return function sendMessage(msg, callback) {
        getTabId(function (tabId) {
            chrome.tabs.sendMessage(tabId, msg, callback || angular.noop);
        });
    }
}]);

app.controller('TagCounterCtrl', ['$scope', 'sendMessage', 'tagType', function ($scope, sendMessage, tagType) {
    //decides if a tag is visible based on its type
    $scope.tagTypes = {
        html5: {
            show: true,
            count: 0,
            desc: 'HTML5 elements like <article> and <main>'
        },
        html4: {
            show: true,
            count: 0,
            desc: 'Good old HTML4 elements like <p> and <div>'
        },
        svg: {
            show: true,
            count: 0,
            desc: 'SVG elements like <circle> and <rect>'
        },
        unknown: {
            show: true,
            count: 0,
            desc: 'Unknown elements like Angular tags or Web Components'
        },
        obsolete: {
            show: true,
            count: 0,
            desc: 'Obsolete tags like <center> and <applet>'
        },
        draft: {
            show: true,
            count: 0,
            desc: 'W3C draft tags which are experimental'
        }
    };

    $scope.elementNumber = 0;
    $scope.tagNumber = 0;
    $scope.sortingComponent = 'freq';
    $scope.isReversedSort = true;
    $scope.tags = [];
    $scope.headerClicked = function (header) {
        if ( $scope.sortingComponent === header ) {
            $scope.isReversedSort = !$scope.isReversedSort;
        } else {
            $scope.sortingComponent = header;
        }
    };
    $scope.updateStats = function () {
        sendMessage({fname: 'getAllElements'}, function (allElements) {
            $scope.elementNumber = allElements.length;

            //make an object where keys are tag names and values are frequencies
            var freq = allElements.reduce(function (o, tagName) {
                o[tagName] = (o[tagName] | 0 ) + 1;
                return o;
            }, {});

            $scope.tagNumber = Object.keys(freq).length;

            var tags = [];
            for (var tagName in freq) {
                if (freq.hasOwnProperty(tagName)) {
                    tags.push({
                        name: tagName,
                        freq: freq[tagName],
                        percent: (100 * freq[tagName] / allElements.length).toFixed(2), //TODO: this line can be optimized
                        type: tagType(tagName)
                    });
                }
            }
            $scope.tags = tags;
            $scope.$apply();
        });
    };

    $scope.updateStats();

    $scope.isTagShown = function (tag, index) {
        return $scope.tagTypes[tag.type].show;
    };

    $scope.highlightTags = function (tagName) {
        sendMessage({fname:'highlightTags', args: [tagName]});
    };

    $scope.unhighlight = function () {
        sendMessage({fname:'unhighlight'});
    };
}]);
*/