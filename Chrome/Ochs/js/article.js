var Ochs = Ochs || {};
	
Ochs.Article = {
	init: function() {
		Ochs.pageType = "article";

		Ochs.showOverlay();

		Ochs.drawNavBar();
		Ochs.addSiteNav();

		this.removeMisc();
		this.reduceArticleInline();
		this.removeSubscribeToModule();
		this.insertAds();

		Ochs.hideOverlay();
	},

	removeMisc: function(){
		
		// <h6 class="dateline">Published: September 2, 2011    </h6>
		
		$(".dateline").html().replace("Published: ", "");
		
	},

	insertAds: function() {
		
		var ad = $("#MiddleRight");
		var hasImageOption = ad.find("noscript")[0];

		if (hasImageOption) {

		//	Favor NonJavascript ad version over Flash
			ad.html(hasImageOption.innerText);

			var img = ad.find("img")[0];
			if (img.naturalWidth==0) {
			//	If alternative ad image is a dud then remove it
				ad.remove();
			}

		} else if ($("#MiddleRight:contains('Ads by Google')")) {
			
		//	Keep Google Ads to 3 Rows

			var table = ad.find("table tbody tr td table");

			if (table[1]) {
				var trs = $(table[1]).find("tr");
				var len = trs.length;

				for (var i=3; i<len; i++) {
					$(trs[i]).remove();
				}
			}
		}
	},
	
	reduceArticleInline: function(){
		var x = $("div.articleInline div.columnGroup:visible,div.articleInline div.inlineImage:visible");
		if (x.length==0) {
			$("div.articleInline").remove();
		}
	},

	removeSubscribeToModule: function () {
		var header = $("#main div.cColumn").find("h3.sectionHeader");
		if (header.length>0) {
			$(header[0]).parentsUntil("div.cColumn").hide();
		}
	}
};

Ochs.Article.init();
