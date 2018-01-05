## Intro

A browser extension that shows stats about HTML tags on the page.

 * Shows the list and total number of tags used to build the page
 * Shows stats on each type of elements
 * Counts how many of each tag was used
 * You can sort the stats by name and number
 * It's easy to refresh the stats for dynamically changing pages
 * Identifies standard tag types for HTML 5, HTML 4, SVG, and even W3C drafts
 * Highlights all occurrences of a tag when you hover over it
 * Can filter to show stats about only one type of tag
 * UI looks and feels like the native Chrome developer tools
 * Open source: https://github.com/userpixel/TagCounter

## How does it work?
It injects a tiny script (less than 700B) into the page. When it is ready it shows a little <n> icon
on the address bar. Only when you click that little icon the script counts the tags and shows the
statistics table.

## Developer

Alex Ewerlöf (@alexewerlof)