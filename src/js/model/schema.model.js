(function ($, window) {
	IX.ns("Hualala.Model");
	var HG = Hualala.Global,
		HM = Hualala.Model,
		HT = Hualala.TypeDef,
		HC = Hualala.Constants;

	var getAllGroupIDs = function () {
		var sessionData = Hualala.getSessionData();
		var groupIDs = _.map(sessionData, function (grp) {
			return $XP(grp, 'groupID');
		});
		return groupIDs.join(',');
	};

	// 品牌数据模型

	var BrandListModel = Stapes.subclass({
		/**
		 * 构造品牌列表数据模型
		 * @param  {Obj} cfg 
		 * @return {Obj}     品牌列表数据模型
		 */
		constructor : function (cfg) {
			this.queryKeys = "groupIDLst,shopIDLst,cityIDLst,pageNo,pageSize,cycleType,";
			this.callServer = HG.getGroupStatistic;
		}
	});

	BrandListModel.proto({
		init : function (params) {
			this.set({
				ds_curBiz : new IX.IListManager(),
				ds_hisBiz : new IX.IListManager()
			});
			this.updateQueryParams(params);
			// this.set({
			// 	groupIDLst : $XP(params, 'groupIDLst', getAllGroupIDs()),
			// 	shopIDLst : $XP(params, 'shopIDLst', ''),
			// 	pageNo : $XP(params, 'pageNo', 0),
			// 	pageSize : $XP(params, 'pageSize', HT.MaxBrandHistoryCount),
			// 	cycleType : $XP(params, 'cycleType', HT.CycleTypes[0]['value']),
				
			// });
		},
		updateQueryParams : function (params) {
			var self = this;
			_.each(params, function (v, k, l) {
				if (self.queryKeys.indexOf((k + ',')) > -1) {
					var val = v;
					switch(k) {
						case 'cycleType':
							val = v || HT.CycleTypes[0]['value'];
							break;
						case 'groupIDLst':
							val = IX.isEmpty(val) ? getAllGroupIDs() : val;
							break;
						case 'pageNo':
							val = v || 0;
							break;
						case 'pageSize':
							val = v || HT.MaxBrandHistoryCount;
							break;
						default:
							val = v;
							break;
					}
					self.set(k, val);
				}
			});
		},
		getQueryParams : function () {
			var self = this;
			return self.get.apply(self, (self.queryKeys.slice(0, -1)).split(','));
		},
		load : function (successFn, failFn) {
			var self = this;
			var params = self.getQueryParams();
			self.callServer(params, function (res) {
				if ($XP(res, 'resultcode') == "000") {
					self.updateDataStore($XP(res, 'data', null));
					successFn.call(self, res);
				} else {
					self.clear();
					failFn.call(self, res);
				}
			});
		},
		clear : function () {
			this.get('ds_curBiz').clear();
			this.get('ds_hisBiz').clear();
		},
		updateDataStore : function (data) {
			var self = this,
				curBizHT = self.get('ds_curBiz'),
				hisBizHT = self.get('ds_hisBiz');
			var curBizData = $XP(data, 'currBizData', []),
				hisBizData = $XP(data, 'hisBizData', []);
			this.clear();
			_.each(curBizData, function (bizData) {
				var groupID = $XP(bizData, 'groupID');
				var bm = new BrandModel(bizData);
				curBizHT.register(groupID, bm);
			});

			_.each(hisBizData, function (bizData) {
				var groupID = $XP(bizData, 'groupID');
				var bm = new BrandModel(bizData);
				if (!hisBizHT.get(groupID)) {
					hisBizHT.register(groupID, {
						groupID : groupID,
						data : []
					});
				}
				hisBizHT.get(groupID).data.push(bm);
			});
		},
		getCurrentData : function (groupIDs) {
			var self = this;
			var _groupIDs = IX.isEmpty(groupIDs) ? null : IX.isArray(groupIDs) ? groupIDs : groupIDs.split(',');
			var curBizHT = self.get('ds_curBiz');
			var curBizModels = null;
			if (_groupIDs === null) {
				curBizModels = curBizHT.getAll();
			} else {
				curBizModels = curBizHT.getByKeys(_groupIDs);
			}
			return _.map(curBizModels, function (m) {
				return IX.inherit(m.getAll(), {
					_model : m
				});
			});
		},
		getHistoryData : function (groupIDs) {
			var self = this;
			var _groupIDs = IX.isEmpty(groupIDs) ? null : IX.isArray(groupIDs) ? groupIDs : groupIDs.split(',');
			var hisBizHT = self.get('ds_hisBiz');
			var hisBizModels = null;
			if (_groupIDs === null) {
				hisBizModels = hisBizHT.getAll();
			} else {
				hisBizModels = hisBizHT.getByKeys(_groupIDs);
			}
			return _.map(hisBizModels, function (d) {
				// d.data = _.map(d.data, function (m) {
				// 	return IX.inherit(m.getAll(), {
				// 		_model : m
				// 	});
				// });
				var data = _.map(d.data, function (m) {
					return IX.inherit(m.getAll(), {
						_model : m
					});
				})
				return IX.inherit(d, {
					data : data
				});
			});
		}
	});

	HM.BrandListModel = BrandListModel;

	var BrandModel = Stapes.subclass({
		/**
		 * 构造集团品牌的数据模型
		 * @param  {Obj} data 品牌统计数据的原始数据
		 * @return {[type]}      品牌统计数据模型
		 */
		constructor : function (data) {
			this.set(data);
		}
	});
	BrandModel.proto({
		getSchemaData : function () {
			var self = this;
			var keys = "groupID,groupName,groupLogoImageUrl,personTotal,orderCountTotal,orderAomoutTotal";
			var data = self.get.apply(self, keys.split(','));
			return IX.inherit(data, {
				personUnit : HC.PersonUnit,
				cashUnit : HC.CashUnit,
				orderUnit : HC.OrderUnit
			});
		},
		getDetailData : function () {
			var self = this;
			var keys = "groupID,groupName,groupLogoImageUrl,personTotal,orderCountTotal,orderAomoutTotal,waitCheckoutOrderAmountTotal,paidAmountTotal,promotionAmountTotal,personAvg,orderAvg,unvipOrderAmountTotal,vipOrderAmountTotal,untakeawayOrderAmountTotal,takeawayOrderAmountTotal,paidAmountPayLst,reportDate";
			var data = self.get.apply(self, keys.split(','));
			return IX.inherit(data, {
				personUnit : HC.PersonUnit,
				cashUnit : HC.CashUnit,
				orderUnit : HC.OrderUnit
			});
		}
	});

	HM.BrandModel = BrandModel;


	// 城市店铺数据模型
	var ShopModel = Stapes.subclass({
		constructor : function () {
			this.groupHT = new IX.IListManager();
			this.citySet = {};
			this.shopSet = {};
			this.callServer = HG.getShopQuerySchema;
			this.init();
		}
	});

	ShopModel.proto({
		init : function () {
			var self = this;
			var groups = Hualala.getSessionData();
			_.each(groups, function (group) {
				var groupID = $XP(group, 'groupID');
				self.groupHT.register(groupID, group);
				self.citySet[groupID] = new IX.IListManager();
				self.shopSet[groupID] = new IX.IListManager();
			});
		},
		load : function (params, cbFn) {
			var self = this;
			var groupID = $XP(params, 'groupID', null);
			if (!groupID) return;
			self.callServer(params, function (res) {
				if (res.resultcode == '000') {
					// TODO run cbFn
					var cities = $XP(res, 'data.cities', []),
						shops = $XP(res, 'data.shops', []);
					var _cityHT = self.citySet[groupID],
						_shopHT = self.shopSet[groupID];
					_.each(cities, function (city) {
						var cityID = $XP(city, 'cityID'),
							items = _.filter(shops, function (shop) {
								return $XP(shop, 'cityID') === cityID;
							});
						_cityHT.register(cityID, IX.inherit(city, {
							items : _.map(items, function (shop) {
								return $XP(shop, 'shopID');
							})
						}));
					});
					_.each(shops, function (shop) {
						_shopHT.register($XP(shop, 'shopID'), shop);
					});
					cbFn();
				} else {
					Hualala.UI.TopTip({
						msg : $XP(res, 'resultmsg', '') || "数据请求失败",
						type : "danger"
					});
				}
			});
		},
		getCitySet : function (groupID, cbFn) {
			var self = this;
			var _cityHT = self.citySet[groupID];
			if (!_cityHT.isEmpty()) {
				cbFn.apply(self, [_cityHT.getAll()]);
			} else {
				self.load({
					groupID : groupID
				}, function () {
					cbFn.apply(self, [_cityHT.getAll()]);
				});
			}
		},
		getShopSet : function (groupID, cbFn) {
			var self = this;
			var _shopHT = self.shopSet[groupID];
			if (!_shopHT.isEmpty()) {
				cbFn.apply(self, [_shopHT.getAll()]);
			} else {
				self.load({
					groupID : groupID
				}, function () {
					cbFn.apply(self, [_shopHT.getAll()]);
				});
			}
		},
		getShopDataSetByGroupID : function (groupID, cbFn) {
			var self = this;
			var _shopHT = self.shopSet[groupID],
				_cityHT = self.citySet[groupID];
			var cities = null, data = null;
			if (!_cityHT.isEmpty()) {
				cities = _cityHT.getAll();
				data = _.map(cities, function (city) {
					var cityID = $XP(city, 'cityID'),
						items = $XP(city, 'items', []);
					return IX.inherit(city, {
						shops : _shopHT.getByKeys(items)
					});
				});
				cbFn.call(self, data);
			} else {
				self.load({
					groupID : groupID
				}, function () {
					cities = _cityHT.getAll();
					data = _.map(cities, function (city) {
						var cityID = $XP(city, 'cityID'),
							items = $XP(city, 'items', []);
						return IX.inherit(city, {
							shops : _shopHT.getByKeys(items)
						});
					});
					cbFn.call(self, data);
				});
			}
		},
		getGroupSet : function () {
			return this.groupHT.getAll();
		}
	});

	HM.ShopModel = ShopModel;
	
})(jQuery, window);