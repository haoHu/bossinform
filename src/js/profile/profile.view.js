(function ($, window) {
	IX.ns("Hualala.Profile");
	var HP = Hualala.PageRoute;
	var HU = Hualala.UI;
	var hbr = Handlebars,
		TplLib = Hualala.TplLib;

	var SingleBrandProfileKeys = 'loginName,userName,userMobile,loginPWD'.split(','),
		MultiBrandProfileKeys = 'userMobile'.split(','),
		SuperAdminProfileKeys = 'isSuperAdmin'.split(',');

	var ProfileView = Stapes.subclass({
		/**
		 * 品牌列表页View层
		 * @return {Obj}     品牌列表View层实例
		 * 
		 */
		constructor : function () {
			this.container = null;
			this.model = null;
			this.loadTemplates();
			this.$curCnt = null;
		}
	});

	ProfileView.proto({
		init : function (cfg) {
			this.container = $XP(cfg, 'container', null);
			this.model = $XP(cfg, 'model', null);
			this.profileType = $XP(cfg, 'profileType');

			if (!this.container || !this.model) {
				throw("Profile list view init failed!!");
			}
			this.initLayout();
		},
		initLayout : function () {
			var layoutTpl = this.get('layoutTpl');
			var htm = layoutTpl({
				appBar : this.mapAppBarData()
			});
			this.container.html(htm);
			this.$curCnt = this.container.find('.content').addClass('bi-profile');
			this.bindEvent();
		},
		loadTemplates : function () {
			var layoutTpl = hbr.compile(TplLib.get('tpl_page_layout'));
			var formTpl = hbr.compile(TplLib.get('tpl_profile_form'));

			hbr.registerPartial("appBar", TplLib.get('tpl_app_bar'));
			hbr.registerPartial("iconBtn", TplLib.get('tpl_icon_btn'));
			hbr.registerPartial("commonBtn", TplLib.get('tpl_common_btn'));

			hbr.registerHelper('chkFormElementType', function (conditional, options) {
				return (conditional == options.hash.type) ? options.fn(this) : options.inverse(this);
			});

			this.set({
				layoutTpl : layoutTpl,
				formTpl : formTpl
			});
		},
		mapAppBarData : function () {
			var self = this;
			var parentNames = HP.getParentNamesByPath();
			return {
				clz : '',
				// commonBtn : {
				// 	items : [
				// 		{
				// 			clz : 'btn-link pull-right btn-logout',
				// 			label : '退出'
				// 		}
				// 	]
				// },
				iconBtn : {
					items : [
						{
							clz : 'icon-left-nav pull-left',
							label : '返回',
							href : HP.createPath($XP(parentNames[0], 'name', 'main'), ['day'])
						}
					]
				},
				title : "我的"
			};

		},
		mapProfileRenderData : function () {
			var self = this;
			var profile = self.model.getProfileInfo();
			var isSuperAdmin = $XP(profile, 'loginName', '') == 'admin';
			var items = [];
			if (self.profileType == 'single') {
				if (!isSuperAdmin) {
					_.each(SingleBrandProfileKeys, function (k) {
						var v = $XP(profile, k, ''),
							dispVal = '', label = '';
						// loginName,userMobile
						switch (k) {
							case 'userMobile' :
								label = '手机号';
								dispVal = $XP(Hualala.Common.codeMask(v, 3, -4), 'val', '');
								break;
							case 'userName':
								label = '姓名';
								dispVal = v;
								break;
							case 'loginName':
								label = '子账号';
								dispVal = v;
								break;
							case 'loginPWD':
								label = '登录密码';
								if (IX.isEmpty(v)) {
									dispVal = $XP(Hualala.Common.codeMask('123456', 0), 'val', '');
								} else {
									dispVal = $XP(Hualala.Common.codeMask(v, 0), 'val', '');
								}
								
								break;
							default :
								break;
						};
						items.push({
							type : 'static',
							label : label,
							value : v,
							dispVal : dispVal,
							name : k,
							id : k + '_' + IX.id(),
							key : k
						});
					});
				} else {
					items.push({
						type : 'static',
						label : '账号',
						value : $XP(profile, 'loginName', ''),
						dispVal : '系统管理员',
						name : 'isSuperAdmin',
						id : 'loginName_' + IX.id(),
						key : 'loginName'
					});
				}
			} else {
				_.each(MultiBrandProfileKeys, function (k) {
					var v = $XP(profile, k, '');
					v = Hualala.Common.codeMask(v, 3, -4);
					items.push({
						type : 'static',
						label : '手机号',
						value : v.orig,
						dispVal : v.val,
						name : 'user_mobile',
						id : 'user_mobile' + '_' + IX.id(),
						key : k
					});
				});
			}
			return {
				clz : '',
				items : items,
				btn : {
					clz : 'btn-positive btn-logout btn-lg ',
					act : 'logout',
					disabled : '',
					label : '退出'
				}
			};
		},
		render : function () {
			var self = this;
			var formTpl = self.get('formTpl');
			var renderData = self.mapProfileRenderData();
			var htm = formTpl(renderData);
			self.$curCnt.empty().html(htm);
		},
		bindEvent : function () {
			var self = this;
			self.container.on('click', '.btn-logout', function (e) {
				Hualala.UI.Confirm({
					title : '退出登录',
					msg : '需要退出登录吗？',
					okFn : function () {
						Hualala.ShopManager.destroy();
						Hualala.destroySession();
						Hualala.Shopmanager = null;
						HP.jumpPage(HP.createPath('login'));
					},
					cancelFn : function () {

					}
				});	
				
			});
			
		}
	});

	Hualala.Profile.ProfileView = ProfileView;

})(jQuery, window);