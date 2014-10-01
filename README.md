#Description

A super light and simple extension for counting the number of tags in a page and showing a beautiful statistics page.

It only counts the tags when you explicitly ask. Therefore it's not going to affect your performance at all.

It's open source. See the source code on Github: https://github.com/hanifbbz/TagCounter

#How does it work?
It injects a tiny script (less than 0.6 KB) into the page. When it is ready it shows a little <n> icon on the address bar. If you click that little icon the script will count the tags and show the statistics. When you hover over any tag in the statistics page it will highlight all those elements.

#Available on WebStore
See it on [WebStore] (https://chrome.google.com/webstore/detail/tagcounter/okjmidhcodkplbehcomejnfjlkbdnjlg)

#Ideas

(C: Canceled, Y: Yes, D: Doing, *: To be decided)

* Remember the sorting settings in each execution
* Edit TagCounter's description on Google Chrome WebStore so that it is mentioned that it works with Web Components and SVG tags
* Publish the logo on Dribbble
* Allow the user to select an element to get the stats only for that element and its children
* Better messaging by using the i18n
* Use the all_frames from https://developer.chrome.com/extensions/content_scripts to count tags from all frames
* Introduce TagCounter on EchoJS
* Possibly write an article for SitePoint about how to make Chrome Apps and use TagCounter as a use-case
Y Make the logo slightly more grey to match the google translate logo
Y Test it before shipping the new version
Y Some visual enhancements on the progress bar
Y Add a sort icon that matches the one from the network tab of the chrome developer tools
Y Fix the flickering of the highlighted tags when mouse moves over a selection
Y Allow sorting tags alphabetically or based on their frequency
Y Show tag frequency (compared to others) with a bar right in front of it.
Y Show the number of different tags that was used to build up the page
Y Sync the version from package.json to manifest.json (or vice versa)
Y Show Tag type along with the tag name (HTML, SVG, XML, WebComponent, etc.)
Y Move tag visibility check outside the loop (it's also a todo on TagCounter-content-script.js)
Y Investigate if it's possible to shrink TagCounter-content-script.js even more
Y Rename counter.js to tagcounter.js for identification
Y Add CSS to the table
Y How to manage big tables? Scroll.
C Count the number of attributes and text nodes and comment nodes too?
C Use badge to show number of tags
C Use a "busy" cursor when the page is being analyzed
C Change the icon when counting to indicate busy
C Analyze the page once a second? (maybe an option) Use Alarm API: https://developer.chrome.com/extensions/alarms
C Change badge color when the count changes (and show the diff)
C Add a link to userpixel.com (complicated. See: http://stackoverflow.com/questions/8915845/chrome-extension-open-a-link-from-popup-html-in-a-new-tab)