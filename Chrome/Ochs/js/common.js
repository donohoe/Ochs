var Ochs = {

	init: function() {
		this.insertTypekit();
		this.showUsername();
	},

	insertTypekit: function() {

		if (Storage.fonts==0) {
			document.getElementsByTagName('body')[0].className = "isReady";
			return;
		}

      	var s  = document.getElementsByTagName('script')[0];
		var tk = document.createElement('script');

      	tk.type = 'text/javascript';
      	tk.async = true;
      	tk.src = ('https:' == document.location.protocol ? 'https://' : 'http://') + 'typeface.nytimes.com/fky4uta.js';
      	s.parentNode.insertBefore(tk, s);
      
		tk.onload = function () {
			var s = document.getElementsByTagName('script')[0];
			var st = document.createElement('script');
      		st.type = 'text/javascript';
			st.innerHTML = "try{Typekit.load();}catch(e){ console.log('TKe',e) }";
      		s.parentNode.insertBefore(st, s);
			
			setTimeout(function(){
				document.getElementsByTagName('body')[0].className = "isReady";
			}, 234);
		}
	},

	showUsername: function() {
		var tools    = $("#memberTools");
		var loggedIn = (tools.find("li:contains('Log In')")[0]) ? false : true;
		var user     = false;
		var html     = "<span><a href='http://www.nytimes.com/auth/login'>Login</a></span><span><a href='http://www.nytimes.com/gst/regi.html'>Register</a></span>";

		if (loggedIn) {
			user = tools.find("li:contains('Welcome')")[0].innerHTML.replace("Welcome, ", "");
			html = "<span><a href='http://www.nytimes.com/logout'>Logout</a></span><span>Hello " + user + "</span>";
		}

		var target = $(".socialMediaModule")[0] || false;
		if (target) {		
			$(target).html(html);
		}

		this.user = user;
	},

	updateLinksSinglePage:function() {
		$('a[href*=".nytimes.com/"]').each(function(i, el) {

			var h = el.href;
			var y = h.indexOf(".html") + 5;
			var r = h.match(/\/(\d{4})\/(\d{1,2})\/(\d{1,2})/);

			if (y>10 && r) {
				var url = h.slice(0, y);
				el.href = url + "?pagewanted=all";
			}
		});
	},

/*	Navigation Bar */

	drawNavBar: function() {

		function getLink(item, section) {
			if (item.link=="") return item.display;
			return "<a href='" + ((item.link.indexOf("http")==0) ? item.link : "http://www.nytimes.com/pages/" + ((section=="") ? "" : section + "/") + item.link + "/index.html") +"'>" + item.display + "</a>";
		}

		var navList = [];
		var navHTML = "";

		var navLen  = Nav.visible.regular.length;
		var counter = 0;

		if (localStorage["configNavItems"]) {
			Nav.visible.regular = localStorage["configNavItems"].split(",");			
		}

		$.each(Nav.parents, function(index, parent) { 
			if (Nav.visible.regular.indexOf(parent.id)>-1) {

				var subNav  = Nav.children[parent.id] || false;
				var subHTML = "";
				counter++;

				if (subNav) {

					var klass = (counter>4) ? ((counter>8) ? "keepRight" : "keepCenter") : "";
					subHTML  += "<div class='" + klass + "'><ul>";

					$.each(subNav, function(index, item) { 
						subHTML += "<li>" +getLink(item, parent.link) + "</li>";
					});

					subHTML += "</ul></div>";
				}

				navHTML += "<li" + ((subNav) ? " class='hasSubNav'" : "") +">" +getLink(parent, "") + subHTML + "</li>";
			}
		});

		navHTML += "<li id='ochsBtnMenu'><img src='" + chrome.extension.getURL("img/menu.png") + "'/></li>";

	//	Insert Nav into DOM

		if ($("#ochsHPNavBar").length==1) {
			$('#ochsHPNavBar').html('<ul class="tabs">' + navHTML + '</ul>');
		} else {
			
			switch (Ochs.pageType){
				case "homepage":
					$('<div id="ochsHPNavBar"><ul class="tabs">' + navHTML + '</ul></div>').insertAfter('#toolbar');
					break;
				case "article":
				case "section":
					$('<div id="ochsHPNavBar"><ul class="tabs">' + navHTML + '</ul></div>').insertAfter('#masthead');
					break;
			}

		}

	//	Adjust Padding
		var space   = (970 - parseInt($("#ochsHPNavBar ul.tabs")[0].offsetWidth, 10) - 20);
		var padding = parseInt((space/(Nav.visible.regular.length)) / 2, 10) +'px !important';
		
		$('#ochsHPNavBar ul.tabs').css('width', '970px');
		$('#ochsHPNavBar ul.tabs > li').css('padding-left', padding).css('padding-right', padding);
		$('#ochsBtnMenu').css('padding', '7px !important').css('border-width', '1px !important');

	//	Set width for centered SubNav items
		$("#ochsHPNavBar ul.tabs div.keepCenter ul").each(function(i, ul){
			var w = $(ul).width();
			$(ul).css({'left': '0', 'right': '0', 'width': w});
		});

		$('#ochsBtnMenu').click(function() {
			$('#ochsSiteList').fadeToggle('slow');
		});
	},

	updateNavBar: function(){

		var spans = $('#ochsSiteList li span.isSelected');
		var list  = [];

		$('#ochsSiteList li span.isSelected').each(function(index, parent) { 
			list.push($(parent).attr("data-row-id"));
		});

		var text = $.stringify(list);

		localStorage["configNavItems"] = text;
		Nav.visible.regular = list;
		
		this.drawNavBar();
	},

	addSiteNav: function() {

		function getLink(item, section) {
			var klass = (Nav.visible.regular.indexOf(item.id)>-1) ? "isSelected" : "";
			var span  = "<span data-row-id='" + item.id + "' class='" + klass + "'> </span>";

			if (item.link=="") return (span + item.display);
			return span + "<a href='" + ((item.link.indexOf("http")==0) ? item.link : "http://www.nytimes.com/pages/" + ((section=="") ? "" : section + "/") + item.link + "/index.html") +"'>" + item.display + "</a>";
		}

		var siteList = [];
		var siteHTML = "";

		var siteLen  = Nav.visible.regular.length;
		var self     = this;

		switch (Ochs.pageType){
			case "homepage":
				$('<ul id="ochsSiteList"></ul>').insertAfter('#toolbar');
				break;
			case "article":
			case "section":
				$('<ul id="ochsSiteList"></ul>').insertAfter('#masthead');
				break;
		}

		$.each(Nav.parents, function(index, parent) { 
			var chosen = false;
			if (Nav.visible.regular.indexOf(parent.id)>-1) {
				chosen = true;
			}
			siteHTML += "<li>" +getLink(parent, "") + "</li>";
		});

		$('#ochsSiteList').html(siteHTML);
		$('#ochsSiteList li span').click(function(ev) {
			$(ev.target).toggleClass("isSelected");
			self.updateNavBar();
		});

		var fb = '<iframe src="http://www.facebook.com/plugins/like.php?href=https://chrome.google.com/webstore/detail/lejiflopkadmkjajbalpkglfhmkjchol&amp;layout=standard&amp;show_faces=false&amp;width=450&amp;action=like&amp;font=verdana&amp;colorscheme=light&amp;height=25" scrolling="no" frameborder="0" style="border:none; padding:7px 0 0 7px; overflow:hidden; width:450px; height:25px;" allowTransparency="true"></iframe>';
		$('#ochsSiteList').append(fb);
	},

	showOverlay: function() {
		window.scrollTo(0, 0);
		
		var htMast  = $("#masthead").height() + 6;
		
		var htAlert = $("#alertsRegion").height() || 0;
		if (htAlert>0) { htAlert += 5 };

		var ofMain  = $("#main").offset().top;
		var htMenu  = ofMain - htMast + htAlert + 21; // Add 24px for NavBar
		
		$("body").append("<span id='ochsOverlay'><div id='ochsOverlayTop' class='ochsOverlay' style='height: " + htMast + "px !important'></div><div id='ochsOverlaySearch' class='ochsOverlay' style='margin-top: " + htMast + "px !important; height: " + htMenu + "px !important;'></div><span><div id='ochsOverlayContentAB' class='ochsOverlay'></div><div id='ochsOverlayContentC' class='ochsOverlay'></div></span></span>");
		$("a[name='top']").css("display", "none !important");
	},

	hideOverlay: function(){
		$('#ochsOverlayTop').fadeTo('slow', 0, function() {
			$('#ochsOverlaySearch').fadeTo('slow', 0, function() {
				$('#ochsOverlayContentAB').fadeTo('slow', 0, function() {
					$('#ochsOverlayContentC').fadeTo('fast', 0, function() {
						$("#ochsOverlay").remove();
					});
				});
			});
		});
	}
};

Ochs.init();