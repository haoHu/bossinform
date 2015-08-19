(function ($, window) {
	IX.ns("Hualala.Brand");
	var HB = Hualala.Brand,
		HP = Hualala.PageRoute;

	var BrandDetailController = HB.BrandListController.subclass({
		constructor : function (cfg) {
			this.container = $XP(cfg, 'container', null);
			this.view = $XP(cfg, 'view', null);
			this.model = $XP(cfg, 'model', null);
			this.refreshTimer = null;

			if (!this.container || !this.view || !this.model) {
				throw("Brand Detail Controller build failed!");
			}
			this.container.addClass('statistic-view');
			var pageCtx = HP.getPageContextByPath(),
				pageParams = $XP(pageCtx, 'params', []);

			
			this.bindEvent();
			this.bindViewEvent();
			this.bindModelEvent();
			this.emit('load', {
				cycleType : pageParams[0] || 'day',
				groupIDLst : pageParams[1] || '',
				shopIDLst : '',
				pageNo : 1
			});
		}
	});

	BrandDetailController.proto({
		bindEvent : function () {
			this.on({
				load : function (params) {
					var self = this;
					self.init(params);
					this.clearRefreshTimer();
					self.emit('toggleMask', {
						act : 'show'
					});
					// self.model.load(function (res) {
					// 	self.view.initToolbar(function () {
					// 		self.view.emit('render');
					// 		self.emit('toggleMask', {
					// 			act : 'hide',
					// 			cbFn : function () {
					// 				Hualala.UI.TopTip({
					// 					msg : '加载成功',
					// 					type : 'success'
					// 				});
					// 			}
					// 		});
					// 		this.refreshTimer = setTimeout(function () {
					// 			self.emit('loadData');
					// 		}, (Hualala.TypeDef.AutoRefreshDataSeconds * 1000));
					// 	});
					// }, function (res) {
					// 	// TODO fail handle
					// 	self.emit('toggleMask', {
					// 		act : 'hide',
					// 		cbFn : function () {
					// 			Hualala.UI.TopTip({
					// 				msg : $XP(res, 'resultmsg', '加载失败'),
					// 				type : 'danger'
					// 			});
					// 		}
					// 	});
					// });
					self.emit('loadData', function () {
						self.view.initToolbar(function () {
							// self.view.emit('render');
							// self.emit('toggleMask', {
							// 	act : 'hide',
							// 	cbFn : function () {
							// 		Hualala.UI.TopTip({
							// 			msg : '加载成功',
							// 			type : 'success'
							// 		});
							// 	}
							// });
						});
					});
				},
				toggleMask : function (opts) {
					var self = this;
					var $body = $('body');
					var act = $XP(opts, 'act', 'hide'),
						cbFn = $XF(opts, 'cbFn');
					$body.mask && $body.mask(act, cbFn);
				},
				loadData : function (cbFn) {
					var self = this;
					self.emit('toggleMask', {
						act : 'show'
					});
					self.model.load(function (res) {
						self.view.emit('render');
						self.emit('toggleMask', {
							act : 'hide',
							cbFn : function () {
								Hualala.UI.TopTip({
									msg : '加载成功',
									type : 'success'
								});
							}
						});
						cbFn && cbFn();
						if (!this.refreshTimer) {
							this.refreshTimer = setInterval(function () {
								self.emit('loadData');
							}, (Hualala.TypeDef.AutoRefreshDataSeconds * 1000));
						}
					}, function (res) {
						self.emit('toggleMask', {
							act : 'hide',
							cbFn : function () {
								Hualala.UI.TopTip({
									msg : $XP(res, 'resultmsg', '加载失败'),
									type : 'danger'
								});
							}
						});
					});
				}
			}, this);
			
		},
		bindViewEvent : function () {
			this.view.on({
				render : function () {
					var self = this;
					self.view.render();
				},
				switchCycle : function () {
					var self = this;
					var params = self.model.getQueryParams();
					self.emit('toggleMask', {
						act : 'show'
					});
					self.model.updateQueryParams(IX.inherit(params, {
						cycleType : self.view.curCycleType
					}));
					// self.model.load(function (res) {
					// 	self.view.emit('render');
					// 	self.emit('toggleMask', {
					// 		act : 'hide',
					// 		cbFn : function () {
					// 			Hualala.UI.TopTip({
					// 				msg : '加载成功',
					// 				type : 'success'
					// 			});
					// 		}
					// 	});
					// }, function (res) {
					// 	self.emit('toggleMask', {
					// 		act : 'hide',
					// 		cbFn : function () {
					// 			Hualala.UI.TopTip({
					// 				msg : $XP(res, 'resultmsg', '加载失败'),
					// 				type : 'danger'
					// 			});
					// 		}
					// 	});
					// });
					self.emit('loadData');
				},
				switchBrand : function () {
					var self = this;
					var params = self.model.getQueryParams();
					self.emit('toggleMask', {act : 'show'});
					self.model.updateQueryParams(IX.inherit(params, {
						groupIDLst : self.view.curGroupIDLst,
						shopIDLst : '',
						cityIDLst : ''
					}));
					self.view.curShopIDLst = '';
					self.view.curCityIDLst = '';
					self.view.resetShopFilter();
					// self.model.load(function (res) {
					// 	self.view.emit('render');
					// 	self.emit('toggleMask', {
					// 		act : 'hide',
					// 		cbFn : function () {
					// 			Hualala.UI.TopTip({
					// 				msg : '加载成功',
					// 				type : 'success'
					// 			});
					// 		}
					// 	});
					// }, function (res) {
					// 	self.emit('toggleMask', {
					// 		act : 'hide',
					// 		cbFn : function () {
					// 			Hualala.UI.TopTip({
					// 				msg : $XP(res, 'resultmsg', '加载失败'),
					// 				type : 'danger'
					// 			});
					// 		}
					// 	});
					// });
					
					self.emit('loadData');
				},
				switchShop : function (opts) {
					var self = this;
					var params = self.model.getQueryParams();
					var cityID = $XP(opts, 'cityID'),
						shopID = $XP(opts, 'shopID');
					self.emit('toggleMask', {act : 'show'});
					if (IX.isEmpty(shopID) && IX.isEmpty(cityID)) {
						self.model.updateQueryParams(IX.inherit(params, {
							shopIDLst : '',
							cityIDLst : ''
						}));
						self.view.curCityIDLst = '';
						self.view.curShopIDLst = '';
					} else if (IX.isEmpty(shopID) && !IX.isEmpty(cityID)) {
						Hualala.ShopManager.getCitySet($XP(params, 'groupIDLst'), function (cities) {
							var c = _.find(cities, function (city) {
								return city.cityID === cityID;
							});
							var shopIDLst = $XP(c, 'items', []).join(',');
							self.model.updateQueryParams(IX.inherit(params, {
								shopIDLst : shopIDLst,
								cityIDLst : cityID
							}));
							self.view.curCityIDLst = cityID;
							self.view.curShopIDLst = '';
						});
						
					} else {
						self.model.updateQueryParams(IX.inherit(params, {
							shopIDLst : shopID,
							cityIDLst : cityID
						}));
						self.view.curCityIDLst = cityID;
						self.view.curShopIDLst = shopID;
					}
					
					// self.model.load(function (res) {
					// 	self.view.emit('render');
					// 	self.emit('toggleMask', {
					// 		act : 'hide',
					// 		cbFn : function () {
					// 			Hualala.UI.TopTip({
					// 				msg : '加载成功',
					// 				type : 'success'
					// 			});
					// 		}
					// 	});
					// }, function (res) {
					// 	self.emit('toggleMask', {
					// 		act : 'hide',
					// 		cbFn : function () {
					// 			Hualala.UI.TopTip({
					// 				msg : $XP(res, 'resultmsg', '加载失败'),
					// 				type : 'danger'
					// 			});
					// 		}
					// 	});
					// });
					
					self.emit('loadData');

				},
				resetShopFilter : function () {
					var self = this;

				}
			}, this);
		},
		bindModelEvent : function () {

		},
		clearRefreshTimer : function () {
			this.refreshTimer && clearInterval(this.refreshTimer);
		}
	});
	
	HB.BrandDetailController = BrandDetailController;

	var BrandChartController = HB.BrandDetailController.subclass({
		constructor : HB.BrandDetailController.prototype.constructor
	});
	BrandChartController.proto({
		bindViewEvent : function () {
			this.view.on({
				render : function (cbFn) {
					var self = this;
					self.view.render();
					self.view.drawChart();
					self.view.setNavBtnHref();
					IX.isFn(cbFn) && cbFn();
				},
				switchCycle : function () {
					var self = this;
					var params = self.model.getQueryParams();
					self.emit('toggleMask', {act : 'show'});
					self.model.updateQueryParams(IX.inherit(params, {
						cycleType : self.view.curCycleType
					}));
					self.model.load(function (res) {
						self.view.emit('render');
						self.emit('toggleMask', {
							act : 'hide',
							cbFn : function () {
								Hualala.UI.TopTip({
									msg : '加载成功',
									type : 'success'
								});
							}
						});
					}, function (res) {
						self.emit('toggleMask', {
							act : 'hide',
							cbFn : function () {
								Hualala.UI.TopTip({
									msg : $XP(res, 'resultmsg', '加载失败'),
									type : 'danger'
								});
							}
						});
					});
				},
				switchBrand : function () {
					var self = this;
					var params = self.model.getQueryParams();
					self.emit('toggleMask', {act : 'show'});
					self.model.updateQueryParams(IX.inherit(params, {
						groupIDLst : self.view.curGroupIDLst,
						shopIDLst : '',
						cityIDLst : ''
					}));
					self.view.curShopIDLst = '';
					self.view.curCityIDLst = '';
					self.view.resetShopFilter();
					self.model.load(function (res) {
						self.view.emit('render');
						self.emit('toggleMask', {
							act : 'hide',
							cbFn : function () {
								Hualala.UI.TopTip({
									msg : '加载成功',
									type : 'success'
								});
							}
						});
					}, function (res) {
						self.emit('toggleMask', {
							act : 'hide',
							cbFn : function () {
								Hualala.UI.TopTip({
									msg : $XP(res, 'resultmsg', '加载失败'),
									type : 'danger'
								});
							}
						});
					});
				},
				switchShop : function (opts) {
					var self = this;
					var params = self.model.getQueryParams();
					var cityID = $XP(opts, 'cityID'),
						shopID = $XP(opts, 'shopID');
					self.emit('toggleMask', {act : 'show'});
					if (IX.isEmpty(shopID) && IX.isEmpty(cityID)) {
						self.model.updateQueryParams(IX.inherit(params, {
							shopIDLst : ''
						}));
						self.view.curCityIDLst = '';
						self.view.curShopIDLst = '';
					} else if (IX.isEmpty(shopID) && !IX.isEmpty(cityID)) {
						Hualala.ShopManager.getCitySet($XP(params, 'groupIDLst'), function (cities) {
							var c = _.find(cities, function (city) {
								return city.cityID === cityID;
							});
							var shopIDLst = $XP(c, 'items', []).join(',');
							self.model.updateQueryParams(IX.inherit(params, {
								shopIDLst : shopIDLst,
								cityIDLst : cityID
							}));
							self.view.curCityIDLst = cityID;
							self.view.curShopIDLst = '';
						});
					} else {
						self.model.updateQueryParams(IX.inherit(params, {
							shopIDLst : shopID,
							cityIDLst : cityID
						}));
						self.view.curCityIDLst = cityID;
						self.view.curShopIDLst = shopID;
					}
					self.model.load(function (res) {
						self.view.emit('render');
						self.emit('toggleMask', {
							act : 'hide',
							cbFn : function () {
								Hualala.UI.TopTip({
									msg : '加载成功',
									type : 'success'
								});
							}
						});
					}, function (res) {
						self.emit('toggleMask', {
							act : 'hide',
							cbFn : function () {
								Hualala.UI.TopTip({
									msg : $XP(res, 'resultmsg', '加载失败'),
									type : 'danger'
								});
							}
						});
					});

				},
				switchIndicator : function () {
					var self = this;
					// self.emit('toggleMask', {act : 'show'});
					self.emit('toggleMask', {
						act : 'show',
						cbFn : function () {
							setTimeout(function () {
								self.view.emit('render', function () {
									self.emit('toggleMask', {act : 'hide'});
								});
							}, 200);
							
						}
					});
					// self.view.emit('render', function () {
					// 	self.emit('toggleMask', {act : 'hide'});	
					// });
					
				}
			}, this);
		}
	});

	HB.BrandChartController = BrandChartController;

})(jQuery, window);