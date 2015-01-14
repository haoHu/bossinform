(function () {
	IX.ns("Hualala.Global");
	var HG = Hualala.Global;
	// 接口引擎
	var ajaxEngine = Hualala.ajaxEngine;
	// 接口设置
	var MappingURLs = [
		// Login Moudle
		["loginCallServer", "/login.ajax", "", "POST"],
		// Dynamic Login
		["dynamicLoginCallServer", "/dynamicLogin.ajax", "", "POST"],
		// 获取短信动态密码
		["getMobileDynamicPWD", "/getDynamicCode.ajax", "", "GET"],
		// 获取动态验证码
		["genAuthCode", "/getCheckCode.ajax", "", "GET"],
		// Session Data
		["loadAppData", "/getUserInfo.ajax", "", "GET"],
		// 获取城市店铺数据
		["getShopQuerySchema", "/shop/schema.ajax", "", "GET"],
		// 获取集团统计数据
		["getGroupStatistic", "/getGroupLst.ajax", "", "GET"]
	];
	HG.APIMappingUrls = MappingURLs;
	// 接口注册
	ajaxEngine.mappingUrls(MappingURLs);
	// 接口装载
	HG.commonCallServer = ajaxEngine.createCaller(_.map(MappingURLs, function (urlCfg) {
		var cName = urlCfg[0];
		if (cName == 'loadAppData') {
			return {
				name : cName,
				onfail : function (data, cbFn, params) {
					IX.isFn(cbFn) && cbFn();
				}
			};
		}
		return cName;
	}));

	// 接口同步
	_.each(MappingURLs, function (urlCfg) {
		var cName = urlCfg[0];
		// HG[cName] = function (params, cbFn) {
		// 	HG.commonCallServer(cName, params, cbFn);
		// };
		HG[cName] = (function (n) {
			return function (params, cbFn) {
				Hualala.Global.commonCallServer(n, params, cbFn);
			};
		})(cName);
	});


})();