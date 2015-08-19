(function ($, window) {
	IX.ns("Hualala.Brand");
	var HB = Hualala.Brand,
		HP = Hualala.PageRoute;
	
	var BrandListController = Stapes.subclass({
		/**
		 * 品牌列表页控制器
		 * @param  {Obj} cfg 
		 *         {
		 *         		container, view, model
		 *         }
		 *         
		 * @return {Obj}     控制器实例
		 */
		constructor : function (cfg) {
			this.container = $XP(cfg, 'container', null);
			this.view = $XP(cfg, 'view', null);
			this.model = $XP(cfg, 'model', null);
			this.refreshTimer = null;
			if (!this.container || !this.view || !this.model) {
				throw("BrandList Controller build failed!");
			}
			this.bindEvent();
			this.bindViewEvent();
			this.bindModelEvent();
			var pageCtx = HP.getPageContextByPath(),
				pageParams = $XP(pageCtx, 'params', []);
			this.emit('load', {
				cycleType : pageParams[0] || 'day',
				groupIDLst : '',
				shopIDLst : '',
				pageNo : '0'
			});
		}
	});

	BrandListController.proto({
		init : function (params) {
			this.model.init(params);
			this.view.init({
				model : this.model,
				container : this.container
			});
		},
		clearRefreshTimer : function () {
			this.refreshTimer && clearInterval(this.refreshTimer);
		},
		bindEvent : function () {
			this.on({
				load : function (params) {
					var self = this;
					var $body = $('body');
					this.clearRefreshTimer();
					self.init(params);
					// $body.mask && $body.mask('show');
					// self.model.load(function (res) {
					// 	self.view.emit('render');
					// 	$body.mask && $body.mask('hide', function () {
					// 		Hualala.UI.TopTip({
					// 			msg : '加载成功',
					// 			type : 'success'
					// 		});
					// 	});
					// }, function (res) {
					// 	// TODO fail handle
					// 	$body.mask && $body.mask('hide', function () {
					// 		Hualala.UI.TopTip({
					// 			msg : $XP(res, 'resultmsg', '加载失败'),
					// 			type : 'danger'
					// 		});
					// 	});
					// });
					self.emit('loadData');
				},
				loadData : function () {
					var self = this;
					var $body = $('body');
					$body.mask && $body.mask('show');
					self.model.load(function (res) {
						self.view.emit('render');
						$body.mask && $body.mask('hide', function () {
							Hualala.UI.TopTip({
								msg : '加载成功',
								type : 'success'
							});
						});
						if (!this.refreshTimer) {
							this.refreshTimer = setInterval(function () {
								self.emit('loadData');
							}, (Hualala.TypeDef.AutoRefreshDataSeconds * 1000));
						}
						
					}, function (res) {
						$body.mask && $body.mask('hide', function () {
							Hualala.UI.TopTip({
								msg : $XP(res, 'resultmsg', '加载失败'),
								type : 'danger'
							});
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
					var $body = $('body');
					// $body.mask && $body.mask('show');
					self.model.updateQueryParams(IX.inherit(params, {
						cycleType : self.view.curCycleType
					}));
					// self.model.load(function (res) {
					// 	self.view.emit('render');
					// 	$body.mask && $body.mask('hide', function () {
					// 		Hualala.UI.TopTip({
					// 			msg : '加载成功',
					// 			type : 'success'
					// 		});
					// 	});
					// }, function (res) {
					// 	$body.mask && $body.mask('hide', function () {
					// 		Hualala.UI.TopTip({
					// 			msg : $XP(res, 'resultmsg', '加载失败'),
					// 			type : 'danger'
					// 		});
					// 	});
					// });
					self.emit('loadData');
				}
			}, this);
		},
		bindModelEvent : function () {
			
		}
	});

	HB.BrandListController = BrandListController;
})(jQuery, window);