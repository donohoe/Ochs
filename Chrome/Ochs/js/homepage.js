var NYTArticleCommentCounts = {};

Ochs.Homepage = {
	init: function() {
		Ochs.pageType = "homepage";

		Ochs.showOverlay();
		
		Ochs.drawNavBar();
		Ochs.addSiteNav();
		
		this.updateTitle();
		this.payTribute();
		this.removeCommentPipes();
		this.resizeWsodImages();

		this.freeformLedeSlideshow();
		this.moveAds();
		
		Ochs.hideOverlay();
	},

	payTribute: function() {
		$('body').append("<span id='stevejobs' style='background: url(" + chrome.extension.getURL("img/steve_badge.png") + ") no-repeat;'></span>");
	},

	updateTitle: function() {
		$("title")[0].innerHTML = "The New York Times";
	},

	removeCommentPipes: function() {
		$("#main .baseLayout .spanAB li").each(function(i, li){
			var ih = this.innerHTML;
			if (ih.toLowerCase().indexOf("comment")>-1 && ih.indexOf("|")>-1) {
				li.innerHTML = ih.replace(/\|/g, "");
				if (li.innerText.length < 3) {
					$(li).remove();
				}
			}
		});
	},

	resizeWsodImages: function() {
	//	Redo WSOD charts to fit any adjusted widths
		var imgs = $("#main img[src*='markets.on.nytimes.com/research/tools/builder/api.asp']");
		var len  = imgs.length;

		for (var i=0; i<len; i++) {
			var img         = imgs[i];
			var w           = $(img).closest(".columnGroup")[0].clientWidth;
			var replaceThis = "w=" + img.naturalWidth;
			var withThis    = "w=" + w;
			imgs[i].src     = img.src.replace(replaceThis, withThis);
			imgs[i].width   = w;
		}
	},

	freeformLedeSlideshow: function() {
	/*  Sometimes we have freeform HTML that needs direct manipulation. Example: Libya coverage */

		var wrapper = $("#ledePackageMMWidget");

		if (wrapper.length) {

			var gallery = $(".nytmm_slidingGallery");
			var width   = $(gallery[0]).width();

		//	Gallery
			var classFull = [ ".nytmm_slidingGallery", ".nytmm_anchorList", ".nytmm_anchorList_mask", ".nytmm_slidingPhotos_slide", "img.nytmm_slidingPhotos_imageSlide"]

			for (var i=0; i<classFull.length; i++) {
				var klass = classFull[i];
				var els   = wrapper.find(klass);

				wrapper.find(klass).each(function() {
				    $(this).css("width", "100%");
				});
			}

			$("li.nytmm_anchorList_itemHorizontal").each(function() {
			    $(this).css("width", "603px");
			});

		//	Video PLayer
			wrapper.find("div.nytmm_videoPlayer").css("width", "100%");

			wrapper.find("embed").each(function(){
				var html = this.outerHTML.replace(/495/g,'590');
				$(this).parent().html(html);
			});
		}

	//	Embedable SLideshow
		var wrapper = $("#ledePhoto");

		if (wrapper.length) {

			var width     = $(wrapper).width() + "px";
			var classFull = [ "#ledePhoto", ".embeddedSlideshow", "li.slide", "div.image", ".image img"]

			for (var i=0; i<classFull.length; i++) {
				var klass = classFull[i];
				var els   = wrapper.find(klass);

				wrapper.find(klass).each(function() {
				    $(this).css("width", width);
				});
			}

		}

	},

	moveAds: function() {
	/*  Move lower C Column House Ad to Section Grid */
		var target = $("#wellRegion div.first div.columnGroup:nth-child(1)");
		var source = $('#Box1 > div').html();
	
//   	console.log("Target", target);
//		console.log("Source 0", source);

		if (source==null) {
			source = $('#Box1 object').html();//.replace(/336/g, "297");
		}

//		console.log("Source 1", source);

		if (source!=null && source!="null") {
			target.after("<div id='customBox1'>" + source + "</div>");
		}

	}
};

Ochs.Homepage.init();
