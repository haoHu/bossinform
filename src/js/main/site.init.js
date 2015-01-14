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
	// 根据groupID获取集团数据
	Hualala.getGroupByGroupID = function (groupID) {
		return _.find(sessionData, function (el) {return $XP(el, 'groupID') == groupID;});
	};

	function loadSession(appData, cbFn) {
		sessionData = appData;
		cbFn();
	}

	function initMainPage(cbFn) {
		var tick = IX.getTimeInMS();
		var HPR = Hualala.PageRoute;
		IX.Debug.info("DEBUG: BI Sys Init : " + tick);
		Hualala.Global.loadAppData({}, function (appData) {
			IX.Debug.info("DEBUG: Load BI APP Data in (ms): " + (IX.getTimeInMS() - tick));
			if ($XP(appData, 'resultcode') != 0) {
				HPR.jumpPage(HPR.createPath('login'));
				IX.Debug.info("DEBUG: Session Data Load Faild!! resultcode = " + $XP(appData, "resultcode", "") + "; resultMsg = " + $XP(appData, 'resultmsg', ''));
			}
			loadSession($XP(appData, 'data.records', []), function () {
				IX.Debug.info("DEBUG: Merchant Sys INIT DONE in (ms): " + (IX.getTimeInMS() - tick));
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
			baseUrl : Hualala.Global.CommonSite,
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
		IX.Debug.info("run push event callback");
	});
})(jQuery, window);