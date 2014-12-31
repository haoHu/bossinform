(function () {
	IX.ns("Test");
	var cityCount = 10;
	var shopCount = 10;
	var cityTpl = {
		cityCount : shopCount,
		cityID : '',
		cityName : '',
		py : 'cheng;shi;'
	};
	var shopTpl = {
		cityID : '',
		cityName : '',
		py : 'dian;pu;',
		shopID : '',
		shopName : ''
	};
	var getCities = function () {
		var ret = [];
		for (var i = 0; i < cityCount; i++) {
			var id = i + 1;
			ret.push(IX.inherit(cityTpl, {
				cityID : parseInt(id * 1000000),
				cityName : '城市' + id,
				py : cityTpl.py + (id + '')
			}));
		}
		return ret;
	};

	Test.getShopQuerySchema = function () {
		var cities = getCities();
		var shops = [];
		_.each(cities, function (city) {
			var count = $XP(city, 'cityCount');
			var cityID = parseInt($XP(city, 'cityID')),
				cityName = $XP(city, 'cityName');
			for (var i = 1; i <= count; i++) {
				shops.push(IX.inherit(shopTpl, {
					cityID : cityID,
					cityName : cityName,
					py : shopTpl.py + i,
					shopID : cityID + (i * 100),
					shopName : '店铺' + i
				}));
			}
		});
		return {
			cities : cities,
			shops : shops
		};
	};
})();