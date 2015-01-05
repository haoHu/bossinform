(function () {
	IX.ns("Hualala.Global");
	var HG = Hualala.Global;
	var MappingURLs = HG.APIMappingUrls;
	
	_.each(MappingURLs, function (urlCfg) {
		var cName = urlCfg[0];
		HG[cName] = (function (n) {
			return function (params, cbFn) {
				var fn = IX.isFn(cbFn) ? cbFn : IX.emptyFn();
				setTimeout(function () {
					switch(n) {
						case "loadAppData":
							fn({
								resultcode : '000', resultmsg : '',
								data : {
									records : Test.GroupList
								}
							});
							break;
						case "genAuthCode":
							fn({
								resultcode : '000', resultmsg : '',
								data : {
									code : 'http://mu.shop.hualala.com/randomImage.jsp?Rand=' + (Math.random() * 10000)
								}
							});
							break;
						case "getShopQuerySchema":
							fn({
								resultcode : '000', resultmsg : '',
								data : Test.getShopQuerySchema()
							});
							break;
						case "getGroupStatistic":
							fn({
								resultcode : '000', resultmsg : '',
								data : Test.getGroupStatistic(params)
							});
							break;
						default :
							fn({
								resultcode : '000', resultmsg : null
							});
							break;
					}
				}, 200);
			};
		})(cName);
	});
})();