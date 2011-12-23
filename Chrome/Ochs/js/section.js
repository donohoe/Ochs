console.log("Section front");

Ochs.Section = {
	init: function() {
		Ochs.pageType = "section";

		Ochs.showOverlay();
		Ochs.drawNavBar();
		Ochs.addSiteNav();
		Ochs.hideOverlay();
	}
};

Ochs.Section.init();

