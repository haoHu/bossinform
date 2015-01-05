(function ($, window) {
	IX.ns("Hualala.Profile");
	var HP = Hualala.PageRoute;

	var ProfileController = Stapes.subclass({
		constructor : function (cfg) {
			this.container = $XP(cfg, 'container', null);
			this.view = $XP(cfg, 'view', null);
			this.model = $XP(cfg, 'model', null);
			this.profileType = null;
			this.profileData = Hualala.getSessionData();
			if (!this.container || !this.view || !this.model) {
				throw("Brand Detail Controller build failed!");
			}
			
			var pageCtx = HP.getPageContextByPath(),
				pageParams = $XP(pageCtx, 'params', []);
			
			this.bindEvent();
			this.bindViewEvent();
			this.bindModelEvent();
			this.init();
		}
	});

	ProfileController.proto({
		init : function () {
			if (this.profileData.length > 1) {
				// 多品牌账户
				this.profileType = "multi";
			} else {
				// 单品牌账户
				this.profileType = "single";
			}
			this.model.init({
				profileType : this.profileType,
				profileData : this.profileData
			});
			this.view.init({
				model : this.model,
				container : this.container,
				profileType : this.profileType
			});
			this.view.emit('render');
		},
		bindEvent : function () {

		},
		bindViewEvent : function () {
			this.view.on({
				render : function () {
					this.view.render();
				}
			}, this);
		},
		bindModelEvent : function () {

		}
	});

	Hualala.Profile.ProfileController = ProfileController;
})(jQuery, window);