#Ochs

Ochs provides a step-back, focusing on a cleaner layout, single-page, less-is-more approach for The New York Times web site.

##Why?

The New York Times web site is well designed but at times bursting with too much information and calls for attention.

Ochs provides a step-back, focusing on a cleaner layout, increased Typekit usage, single-page articles, less clutter and more white-space. It takes a less-is-more approach and removes content - though never the most important.

This continues to be a work in progress. The best experience is with the Home Page and the Articles. Improvements and more functionality to follow.

I'd also note that its an aspiration to re-insert all ads to the fullest extent possible but so they are complementary, not intrusive - this is currently in-progress.

##Current form

Ochs exists only as a extension for the Google Chrome browser. It is hoped that if enough people like it, that with this code as a start point, extensions any browser can be written using common rules and stylings.

In making Ochs available in GitHub it is in the Chrome Webstore as an Extension as Version 0.1.5.3

##Roadmap

###Major

* Bookmarklet (Mobile Safari and others)
* Separating out CSS and Javascript based rules for content so same files re-used for any browser extension
* Build scripts
 
###Features

* Restore ads but with consideration for UX (a tough one)
* Local weather
* Full-screen Slideshows
* Investigate Typekit usage (Done, implemented)
* Dynamic Homepage & Sectionfront updates
* Feedback/bug reporting (Started)
* Customized horizontal navigation, starting with Homepage (Done)
* Single-page articles (Done)

##Development

###Production

A production version of Ochs is currently in the Google Chrome Webstore:

https://chrome.google.com/webstore/detail/lejiflopkadmkjajbalpkglfhmkjchol

###Local

* Bring up the extensions management page by clicking the wrench icon and choosing `Tools > Extensions`.
* If Developer mode has a `+` by it, click the `+` to add developer information to the page. The `+` changes to a `-`, and more buttons and information appear.
* Click the `Load unpacked extension` button. A file dialog appears.
* In the file dialog, navigate to your extension's folder and click `OK`.
* If your extension is valid, its icon appears next to the address bar, and information about the extension appears in the extensions page.

(Extract from http://code.google.com/chrome/extensions/getstarted.html)


