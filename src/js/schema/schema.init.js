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
		bindEvent : function () {
			this.on({
				load : function (params) {
					var self = this;
					self.init(params);
					setTimeout(function () {
						self.model.load(function (res) {
							self.view.emit('render');
						}, function (res) {
							// TODO fail handle
						});
					}, 500);
					
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
					self.model.updateQueryParams(IX.inherit(params, {
						cycleType : self.view.curCycleType
					}));
					self.model.load(function (res) {
						self.view.emit('render');
					}, function (res) {

					});
				}
			}, this);
		},
		bindModelEvent : function () {
			
		}
	});

	HB.BrandListController = BrandListController;
})(jQuery, window);