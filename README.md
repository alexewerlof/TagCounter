#TODO

* Allow the user to select an element to get the stats only for that element and its children
* Allow sorting tags alphabetically or based on their frequency
* Remember the sorting settings in each execution
* Count the number of attributes and text nodes and comment nodes too?
* Better messaging by using the i18n
* Use the all_frames from https://developer.chrome.com/extensions/content_scripts to count tags from all frames
* Show tag frequency (compared to others) with a bar right in front of it.
* Show the number of different tags that was used to build up the page
Y Add CSS to the table
Y How to manage big tables? Scroll.
C Use badge to show number of tags
C Use a "busy" cursor when the page is being analyzed
C Change the icon when counting to indicate busy
C Analyze the page once a second? (maybe an option) Use Alarm API: https://developer.chrome.com/extensions/alarms
C Change badge color when the count changes (and show the diff)
C Add a link to userpixel.com (complicated. See: http://stackoverflow.com/questions/8915845/chrome-extension-open-a-link-from-popup-html-in-a-new-tab)
