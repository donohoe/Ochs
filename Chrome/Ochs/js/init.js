jQuery.extend({
    stringify  : function stringify(obj) {
        var t = typeof (obj);
        if (t != "object" || obj === null) {
            // if (t == "string") obj = '"' + obj + '"';
            if (t == "string") obj = obj; // MODIFIED
            return String(obj);
        } else {
            // recurse array or object
            var n, v, json = [], arr = (obj && obj.constructor == Array);
            for (n in obj) {
                v = obj[n];
                t = typeof(v);
                if (obj.hasOwnProperty(n)) {
                    if (t == "string") v = v; else if (t == "object" && v !== null) v = jQuery.stringify(v);
                    json.push((arr ? "" : n + ':') + String(v));
                }
            }
            return String(json);
        }
    }
});

/* Load settings */

var Storage = null;

chrome.extension.sendRequest({ task: "settings" }, function(response) {
    Storage = response.settings;
});

/* Setup page */

setTimeout(function(){
	Ochs.updateLinksSinglePage();
    document.getElementsByTagName('body')[0].className = "isReady";
}, 3000);

setTimeout(function(){
/*  Remove overlay is there is a delay in loading the page - like a JS reference to Staging form an Ad */
    $("a[name='top']").css("display", "none !important");
	Ochs.hideOverlay();
}, 9000);

/* Configuration and shared variables */

var Nav = {

    visible: {
        stared:  [ "science" ],
        regular: [ "world", "us", "tech", "health", "arts", "travel", "popular", "blogs", "mmedia", "mags" ]
    },

    index:   [ "world", "us", "nyregion", "business", "tech", "science", "health", "sports", "opinion", "arts", "style", "travel", "jobs", "estate", "autos", "classifieds", "corrections", "obits", "today", "popular", "cartoons", "xword", "blogs", "mmedia", "mags" ],

    parents: [
        { id: "world",      display: "World",           link: "world"    },
        { id: "us",         display: "U.S",             link: "national" },
        { id: "nyregion",   display: "N.Y. / Region",   link: "nyregion" },
        { id: "business",   display: "Business",        link: "business" },
        { id: "tech",       display: "Technology",      link: "technology" },
        { id: "science",    display: "Science",         link: "science" },
        { id: "health",     display: "Health",          link: "health" },
        { id: "sports",     display: "Sports",          link: "sports" },
        { id: "opinion",    display: "Opinion",         link: "opinion" },
        { id: "arts",       display: "Arts",            link: "arts" },
        { id: "style",      display: "Style",           link: "style" },
        { id: "travel",     display: "Travel",          link: "travel" },
        { id: "jobs",       display: "Jobs",            link: "jobs" },
        { id: "estate",     display: "Real Estate",     link: "realestate" },
        { id: "autos",      display: "Autos",           link: "automobiles" },
        { id: "classifieds",display: "Classifieds",     link: "http://listings.nytimes.com/classifiedsmarketplace/" },
        { id: "corrections",display: "Corrections",     link: "corrections" },
        { id: "obits",      display: "Obituaries",      link: "obituaries" },
        { id: "today",      display: "Todays Paper",    link: "todayspaper" },
        { id: "popular",    display: "Most Popular",    link: "http://www.nytimes.com/most-popular" },
        { id: "cartoons",   display: "Cartoons",        link: "cartoons" },
        { id: "xword",      display: "Crossword / Games",link: "crosswords" },
        { id: "blogs",      display: "Blogs",           link: "http://www.nytimes.com/interactive/blogs/directory.html" },
        { id: "mmedia",     display: "Multimedia",      link: "multimedia" },
        { id: "mags",       display: "Magazines",       link: "" },
        { id: "wire",       display: "Times Wire",      link: "http://nytimes.com/timeswire" },
        { id: "social",     display: "Social",          link: "" }
    ],

    children: {
        "popular": [
            { id: "memailed",   display: "Emailed",     link: "http://www.nytimes.com/most-popular-emailed" },
            { id: "mviewed",    display: "Viewed",      link: "http://www.nytimes.com/most-popular-viewed" },
            { id: "mblogged",   display: "Blogged",     link: "http://www.nytimes.com/most-popular-blogged" },
            { id: "msearch",    display: "Searched",    link: "http://www.nytimes.com/most-popular-searched" },
            { id: "mmovies",    display: "Movies",      link: "http://www.nytimes.com/most-popular-movies" }
        ],
        "arts": [
            { id: "design",   display: "Art &amp; Design", link: "design" },
            { id: "books",    display: "Books",        link: "http://www.nytimes.com/pages/books/index.html" },
            { id: "dance",    display: "Dance",        link: "dance" },
            { id: "movies",   display: "Movies",       link: "http://www.nytimes.com/pages/movies/index.html" },
            { id: "music",    display: "Music",        link: "music" },
            { id: "tv",       display: "Television",   link: "television" },
            { id: "theater",  display: "Theater",      link: "http://www.nytimes.com/pages/theater/index.html" },
            { id: "vgames",   display: "Video Games",  link: "video-games" }
        ],
        "blogs": [
            { id: "allblogs",   display: "All",          link: "http://www.nytimes.com/interactive/blogs/directory.html" },
            { id: "lede",       display: "The Lede",     link: "http://thelede.blogs.nytimes.com/" },
            { id: "city",       display: "City Room",    link: "http://cityroom.blogs.nytimes.com/" },
            { id: "decode",     display: "Media Decoder", link: "http://mediadecoder.blogs.nytimes.com/" },
            { id: "b538",       display: "Five Thirty Eight", link: "http://fivethirtyeight.blogs.nytimes.com/" },
            { id: "bits",       display: "Bits",         link: "http://bits.blogs.nytimes.com/" },
            { id: "lens",       display: "LENS",         link: "http://lens.blogs.nytimes.com/" },
            { id: "mlode",      display: "MotherLode",   link: "http://parenting.blogs.nytimes.com/" },
            { id: "opinator",   display: "Opinionator",  link: "http://opinionator.blogs.nytimes.com/" }
        ],
        "world": [
            { id: "africa",     display: "Africa",       link: "africa"   },
            { id: "americas",   display: "Americas",     link: "americas" },
            { id: "asia",       display: "Asia",         link: "asia"     },
            { id: "europe",     display: "Europe",       link: "europe"   },
            { id: "middleeast", display: "Middle East",  link: "middleeast" }
        ],
        "us": [
            { id: "politics",   display: "politics",     link: "politics" },
            { id: "education",  display: "Education",    link: "http://www.nytimes.com/pages/education/index.html" },
            { id: "bayarea",    display: "Bay Area",     link: "http://www.nytimes.com/bayarea" },
            { id: "chicago",    display: "Chicago",      link: "http://www.nytimes.com/chicago" },
            { id: "texas",      display: "Texas",        link: "http://www.nytimes.com/texas" }
        ],
        "business": [
            { id: "global",    display: "Global",        link: "global" },
            { id: "dealbook",  display: "DealBook",      link: "http://dealbook.blogs.nytimes.com" },
            { id: "markets",   display: "Markets",       link: "http://markets.on.nytimes.com/research/markets/overview/overview.asp" },
            { id: "energy",    display: "Energy",        link: "energy-environment" },
            { id: "media",     display: "Media",         link: "media" },
            { id: "ptech",     display: "Personal Tech", link: "http://www.nytimes.com/pages/technology/personaltech/index.html" },
            { id: "smlbus",    display: "Small Business", link: "smallbusiness" },
            { id: "money",     display: "Your Money",    link: "http://www.nytimes.com/pages/your-money/index.html" }
        ],
        "tech": [
            { id: "internet",  display: "Internet",      link: "internet" },
            { id: "startup",   display: "Start-Ups",     link: "start-ups" },
            { id: "buscomp",   display: "Business Computing", link: "business-computing" },
            { id: "companies", display: "Energy",        link: "companies" },
            { id: "bits",      display: "Bits",          link: "http://bits.blogs.nytimes.com/" }
        ],
        "health": [
            { id: "research",  display: "Research",             link: "research" },
            { id: "nutrition", display: "Fitness &amp; Nutrition", link: "nutrition" },
            { id: "policy",    display: "Money &amp; Policy",      link: "policy" },
            { id: "views",     display: "Views",                link: "views" },
            { id: "hguides",   display: "Health Guide",         link: "http://health.nytimes.com/health/guides/index.html" },
            { id: "well",      display: "Well", 		        link: "http://well.blogs.nytimes.com/" }
        ],
        "style": [
            { id: "dining",   display: "Dining &amp; Wine",      link: "dining" },
            { id: "fashion",  display: "Fashion &amp; Style",    link: "fashion" },
            { id: "garden",   display: "Home &amp; Garden",      link: "garden" },
            { id: "weddings", display: "Weddings/ Celebrations", link: "fashion/weddings" }
        ],
        "mmedia": [
            { id: "video",    display: "Video",    link: "http://video.nytimes.com/"   },
            { id: "podcasts", display: "Podcasts", link: "http://www.nytimes.com/ref/multimedia/podcasts.html" },
            { id: "mrecent",  display: "Recent",   link: "http://query.nytimes.com/beta/search/query?more=multimedia" }
        ],
        "mags": [
            { id: "smag",     display: "Sunday Magazine", link: "magazine" },
            { id: "tmag",     display: "T Magazine",      link: "t-magazine" },
            { id: "moment",   display: "The Moment",      link: "http://tmagazine.blogs.nytimes.com/" }
        ],
        "social": [
            { id: "atnyt",    display: "@nytimes",          link: "http://twitter.com/nytimes" },
            { id: "atlite",   display: "@nytlite",          link: "http://twitter.com/nytlite" },
            { id: "twit",     display: "Twitter",           link: "http://www.nytimes.com/twitter" },
            { id: "face",     display: "Facebook",          link: "https://www.facebook.com/nytimes" },
            { id: "tumblr",   display: "T Mag / Tumblr",    link: "http://tmagazine.blogs.nytimes.com/" },
            { id: "yout",     display: "YouTube",           link: "http://www.youtube.com/user/TheNewYorkTimes" },
            { id: "vimeo",    display: "Vimeo",             link: "http://vimeo.com/nytimes" },
            { id: "tippl",    display: "Times People",      link: "http://timespeople.nytimes.com/view/user/" }
        ]
    }
};

/* Load NavBar Preferences and over-ride Nav defaults */

chrome.extension.sendRequest({ task: "navigation", action: "load" }, function(response) {
    var nav = response.navigation;
    if (nav.length>0) {
        var navList = nav.split(",");
        if (navList.length>0) {
            Nav.visible.regular = navList;
        }
    }
});
