(function () {
	IX.ns("Hualala.Global");
	var urlEngine = Hualala.urlEngine;
	urlEngine.reset({imgUrl : Hualala.Global.IMAGE_ROOT});
	Hualala.ajaxEngine.reset({
		siteUrl : Hualala.Global.HOME
	});
	urlEngine.mappingUrls([
		["img_logo", "/logo.png", "img"],
		["img_photo", "/common_photo.png", "img"],
		["img_blank", "/blank.png", "img"],

		["logout", "/logout"]
	]);

	// get logout url
	Hualala.Global.getLogoutJumpToUrl = function () {
		return urlEngine.genUrl("logout");
	};

	// get common default image url
	Hualala.Global.getDefaultImage = function (type) {
		return urlEngine.genUrl("img_" + type);
	};

	// check is current page
	Hualala.Global.isCurrentPage = function (pageType, params) {
		var curHref = document.location.href,
			link = Hualala.PageRoute.createPath(pageType, params);
		return curHref.indexOf(link.replace(Hualala.Global.Home, '') >= 0);
	};
})();