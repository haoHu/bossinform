(function ($, window) {
	IX.ns("Hualala");

	var sessionData = null;
	// 获取Session Data
	Hualala.getSessionData = function () {return sessionData;};
	// 判断指定用户是否为当前登录用户
	Hualala.isSessionUser = function (groupLoginName, loginName) {
		return _.find(sessionData, function (grp) {
			return ($XP(grp, 'groupLoginName') === groupLoginName) && $XP(grp, 'loginName') === loginName;
		});
	};

	function loadSession(appData, cbFn) {
		sessionData = appData;
		cbFn();
	}

	function initMainPage(cbFn) {
		var tick = IX.getTimeInMS();
		var HPR = Hualala.PageRoute;
		log("BI Sys Init : " + tick);
		Hualala.Global.loadAppData({}, function (appData) {
			log("Load BI APP Data in (ms): " + (IX.getTimeInMS() - tick));
			if ($XP(appData, 'resultcode') != 0) {
				HPR.jumpPage(HPR.createPath('login'));
				log("Session Data Load Faild!! resultcode = " + $XP(appData, "resultcode", "") + "; resultMsg = " + $XP(appData, 'resultmsg', ''));
			}
			loadSession($XP(appData, 'data.records', []), function () {
				log("Merchant Sys INIT DONE in (ms): " + (IX.getTimeInMS() - tick));
				cbFn();
			});
		}, function () {
			HPR.jumpPage(HPR.createPath('login'));
		});
	}

	function initRouteEngine () {
		if (!IX.nsExisted("Hualala.ajaxEngine.init")) return;
		$.ajaxSetup({
			beforeSend : function (xhr) {
				xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
			}
		});
		Hualala.ajaxEngine.init({
			ajaxFn : $.ajax,
			baseUrl : Hualala.Global.HOME,
			commonUrl : Hualala.Global.CommonSite,
			imgUrl : Hualala.Global.IMAGE_ROOT
		});
	};

	/**
	 * 老板通APP加载入口
	 * 
	 * @return {NULL}
	 */
	var APPInitialized = false, currentType = null;
	Hualala.init = function () {
		if (!APPInitialized) {
			initRouteEngine();
			Hualala.PageRoute.start(function (pageName, pageParams, pageInitFn) {
				initMainPage(function () {
					// Hualala.Common.initPageLayout({}, pageName);
					if (!Hualala.ShopManager) {
						Hualala.ShopManager = new Hualala.Model.ShopModel();
					}
					pageInitFn && pageInitFn.apply(null, [pageName, pageParams]);
				});
			});
			APPInitialized = true;
		}
	};

	window.addEventListener('push', function () {
		console.info("run push event callback");
	});
})(jQuery, window);