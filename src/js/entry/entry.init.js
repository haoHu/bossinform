(function ($, window) {
	IX.ns("Hualala.Entry");
	var HG = Hualala.Global;
	var HU = Hualala.UI;
	var hbr = Handlebars,
		TplLib = Hualala.TplLib;
	var formFields = [
		{
			name : "group_name", type : "text", placeholder : "", clz : "form-control input-row",
			key : "groupName", label : "主账号",
			field : {
				validators : {
					notEmpty : {
						message : "请输入主账号"
					}
				}
			}
		},
		{
			name : "group_subname", type : "text", placeholder : "", clz : "form-control input-row",
			key : "childName", label : "子账号",
			field : {
				validators : {
					notEmpty : {
						message : "请输入子账号"
					},
					stringLength : {
						min : 3,
						max : 50,
						message : "账号名称长度在3-50个字符之间"
					},
					loginName : {
						message : "账号名称只能包含数字、英文字母和下划线(_)"
					}
				}
			}
		},
		{
			name : "login_pwd", type : "password", placeholder : "", clz : "form-control input-row",
			key : 'password', label : "登录密码",
			field : {
				validators : {
					notEmpty : {
						message : "请输入登录密码"
					},
					stringLength : {
						min : 6,
						max : 32,
						message : "密码长度必须在6位到32位之间"
					}
				}
			}
		},
		{
			name : "login_auth", type : "text", placeholder : "", clz : "form-control input-row",
			key : "authCode", label : "验证码",
			field : {
				validators : {
					notEmpty : {
						message : "请输入验证码"
					}
				}
			}
		},
		{
			name : "group_mobile", type : "text", placeholder : "", clz : "form-control input-row",
			key : "userMobile", label : "手机号",
			field : {
				validators : {
					notEmpty : {
						message : "请输入账号绑定的手机号"
					},
					mobile : {
						message : "请输入中国地区正确的手机号"
					}
				}
			}
		},
		{
			name : "mobile_pwd", type : "password", placeholder : "", clz : "form-control input-row",
			key : "dynamicPwd", label : "验证码",
			field : {
				validators : {
					notEmpty : {
						message : "请输入短信动态验证码"
					}
				}
			}
		}
	];
	var FormFieldHT = new IX.IListManager();
	_.each(formFields, function (el) {
		var name = $XP(el, 'name');
		FormFieldHT.register(name, el);
	});
	var CommonLoginFormEls = 'group_name,group_subname,login_pwd,login_auth'.split(','),
		MobileLoginFormEls = 'group_mobile,mobile_pwd'.split(',');
	var SegmentedCfg = [
		{id : "login", label : "账号登录"},
		{id : "mbilogin", label : "手机号登录"}
	];

	var AuthCode = function (cfg) {
		var $container = $XP(cfg, 'container');
		var callServer = HG.genAuthCode;
		var tpl = hbr.compile(TplLib.get('tpl_auth_code'));
		var $img = null;
		var getAuthCode = function (cbFn) {
			callServer({}, function (res) {
				var code = null;
				if ($XP(res, 'resultcode') == "000") {
					code = $XP(res, 'data.code', null);
				} else {
					HU.TopTip({
						type : 'warning',
						msg : "获取验证码失败"
					});
				}
				cbFn(code);
			});
		};
		var setAuthCode = function (code) {
			if (!code) {
				setTimeout(function () {
					getAuthCode(setAuthCode);
				}, 1000);
				return ;
			}
			$img.attr('src', Hualala.Global.AJAX_DOMAIN + code);

		};
		var init = function () {
			$container.find('.bi-authcode').remove();
			$container.append(tpl());
			$img = $container.find('.auth-img');
			getAuthCode(setAuthCode);
			bindEvent();
		};
		var bindEvent = function () {
			$container.find('.auth-img').unbind('click').on('click', function (e) {
				$img = $(e.target);
				getAuthCode(setAuthCode);
			});
		};
		init();
		return {
			genCode : function () {
				getAuthCode(setAuthCode);
			}
		};
	};

	var DynamicPWD = function (cfg) {
		var $container = $XP(cfg, 'container');
		var getParams = $XF(cfg, 'getParams');
		var waitingTime = $XP(cfg, 'waiting', 60);
		var callServer = HG.getMobileDynamicPWD;
		var tpl = hbr.compile(TplLib.get('tpl_dynamic_pwd'));
		var $btn = null;
		var label = "获取验证码", loadingText = "发送中...";
		var init = function () {
			$container.find('.bi-dynamicpwd').remove();
			$container.append(tpl({
				label : label,
				loadingText : loadingText
			}));
			$btn = $container.find('.bi-dynamicpwd');
			bindEvent();
		};
		var getDynamicPWD = function (cbFn) {
			var params = getParams();
			if (!params) {
				$btn.text(label);
				$btn.removeClass('disabled');
				return;
			}
			callServer(params, function (res) {
				if ($XP(res, 'resultcode') === "000") {
					HU.TopTip({
						type : "success",
						msg : $XP(res, 'resultmsg', '') || "短信发送成功"
					});
					cbFn();
				} else {
					HU.TopTip({
						type : "danger",
						msg : $XP(res, 'resultmsg', '') || "发送动态密码失败"
					});
					$btn.text(label);
				}
			});
		};
		var waiting = function () {
			var count = waitingTime;
			timmer = setInterval(function () {
				count--;
				if (count == 0) {
					clearInterval(timmer);
					$btn.text(label);
					$btn.removeClass('disabled');
					return;
				}
				var s = '{time}秒后重试',
					str = s.replaceAll('{time}', count);
				$btn.text(str);
			}, 1000);
		};
		var bindEvent = function () {
			$btn.unbind('click').on('click', function (e) {
				e.preventDefault();
				if ($btn.hasClass('disabled')) return;
				$btn.addClass('disabled');
				$btn.text($btn.attr('data-loading-text'));
				getDynamicPWD(waiting);
				return;
			});
		};
		init();
	};

	Hualala.Entry.LoginInit = Stapes.subclass({
		constructor : function (cfg) {
			this.$container = $XP(cfg, 'container');
			this.mode = $XP(cfg, 'mode', 'login');
			this.callServer = this.mode == 'login' ? HG.loginCallServer : HG.dynamicLoginCallServer;
			this.formKeys = [];
			this.formFieldHT = FormFieldHT;
			this.formFields = [];
			this.$subBtn = null;
			this.authCode = null;
			this.dinamicPWD = null;
			this.init();
		}
	});
	Hualala.Entry.LoginInit.proto({
		init : function () {
			var self = this;
			self.renderLayout();
			self.bindEvent();
		},
		mapFormElsData : function (id) {
			var self = this,
				formEls = id == "login" ? CommonLoginFormEls : MobileLoginFormEls;
			return _.map(formEls, function (k) {
				var el = self.formFieldHT.get(k);
				return IX.inherit(el, {
					id : $XP(el, 'name', '')
				});
			});
		},
		mapRenderData : function () {
			var self = this;
			var loginDesc = '<p>忘记账号密码，请联系您的系统管理员</p>',
				mobiLoginDesc = [
					'<h5>长时间收不到验证码？</h5>',
					'<p>',
						'请检查手机号是否正确，如果正确但长时间没有收到验证码短信，可能是因为短信运营商网络不太给力，请拨打客服电话获取验证码&mdash;&mdash;',
						'<a href="tel:4006527557" class="bi-contact">4006527557</a>',
					'</p>',
				].join('');
			var segHeads = _.map(SegmentedCfg, function (el) {
					var id = $XP(el, 'id');
					return IX.inherit(el, {
						active : self.mode == id ? 'active' : ''
					});
				}),
				segContents = _.map(SegmentedCfg, function (el) {
					var id = $XP(el, 'id');
					return IX.inherit(el, {
						clz : "bi-login",
						active : self.mode == id ? 'active' : '',
						items : self.mapFormElsData(id),
						desc : id == 'login' ? loginDesc : mobiLoginDesc
					});
				});
			return {
				appBar : {
					title : "登录"
				},
				segHeads : segHeads,
				segContents : segContents
			};

		},
		renderLayout : function () {
			var self = this;
			var tpl = hbr.compile(TplLib.get('tpl_site_login'));
			var renderData = self.mapRenderData();
			var $body = $('body');
			hbr.registerPartial("appBar", TplLib.get('tpl_app_bar'));
			hbr.registerPartial("iconBtn", TplLib.get('tpl_icon_btn'));
			hbr.registerPartial("commonBtn", TplLib.get('tpl_common_btn'));

			self.$container.html(tpl(renderData));
			self.initAuthCode();
			self.initDynamicPWD();
			$body.mask && $body.mask('hide');
		},
		initAuthCode : function () {
			var self = this,
				$el = self.$container.find('[name=login_auth]').parent();
			self.authCode = new AuthCode({
				container : $el
			});

		},
		initDynamicPWD : function () {
			var self = this,
				$el = self.$container.find('[name=group_mobile]').parent();
			self.dinamicPWD = new DynamicPWD({
				container : $el,
				getParams : function () {
					var $mbi = self.$container.find('#group_mobile');
					var els = self.getFormData();
					var $form = $mbi.parents('.sv-form');
					var sv = $form.data('smileyValidator');
					var $userMobile = $form.find('[name=group_mobile]');
					var ret = {};
					_.each(els, function (v, k) {
						if (k == 'userMobile') {
							ret[k] = v;
						}
					});
					if (!sv.isValidField('group_mobile')) {
						HU.TopTip({
							type : "danger",
							msg : "请检查手机号是否正确"
						});
						return null;
					}
					return ret;
				}
			});
		},
		bindEvent : function () {
			var self = this;
			
			self.$container.on('click', '.bi-login-tab .control-item', function (e) {
				self.mode = $(e.target).attr('data-tag').slice(1);
				self.callServer = self.mode == 'login' ? HG.loginCallServer : HG.dynamicLoginCallServer;
			});
			self.$container.on('click', '.subBtn', function (e) {
				// TODO Submit form
				e.preventDefault();
				var bv = $('#' + self.mode).find('form').data('smileyValidator');
				bv.validate();

				// for test
				// var params = self.getFormData();
				// self.callServer(params, function (res) {
				// 	if ($XP(res, 'resultcode') == "000") {
				// 		Hualala.PageRoute.jumpPage(Hualala.PageRoute.createPath("main", [""]));
				// 	} else {
				// 		HU.TopTip({
				// 			type : 'danger',
				// 			msg : $XP(res, 'resultmsg', '') || "登录失败"
				// 		});
				// 	}
				// });
				
			});
			_.each(SegmentedCfg, function (el) {
				var id = $XP(el, 'id');
				var $form = $('#' + id).find('form');
				var fvOpts = self.initValidFieldOpts(id);
				$form.smileyValidator({
					fields : fvOpts,
					when : 'blur',
					submitButton : '.subBtn'
				}).on('error.field.sv', function (e, data) {
					// console.info(data);
				}).on('success.field.sv', function (e, data) {
					// console.info(data);
				}).on('error.form.sv', function (e, data) {
					var message = $XP(data, 'message', '');
					HU.TopTip({
						type : "danger",
						msg : message
					});
				}).on('success.form.sv', function (e, data) {
					var params = self.getFormData();
					var $body = $('body');
					$body.mask && $body.mask('show');
					self.callServer(params, function (res) {
						if ($XP(res, 'resultcode') == "000") {
							$body.mask && $body.mask('hide');
							Hualala.PageRoute.jumpPage(Hualala.PageRoute.createPath("main", [""]));
						} else {
							$body.mask && $body.mask('hide', function () {
								HU.TopTip({
									type : 'danger',
									msg : $XP(res, 'resultmsg', '') || "登录失败"
								});
								if (self.mode == 'login') {
									self.authCode.genCode();
								}
							});
						}
					});
				});
			});
		},
		getFormData : function () {
			var self = this;
			var formEls = self.mode == "login" ? CommonLoginFormEls : MobileLoginFormEls;
			var params = {};
			_.each(formEls, function (n, i, l) {
				var f = self.formFieldHT.get(n);
				var name = $XP(f, 'name'), key = $XP(f, 'key'),
					val = $('[name=' + name + ']', self.$container).val();
				params[key] = val;
			});
			IX.Debug.info("DEBUG:" + (self.mode == 'login' ? "Login" : "Mobile Login") + " Form Data: ");
			IX.Debug.info(params);
			return params;
		},
		initValidFieldOpts : function (m) {
			var self = this;
			var formEls = (m || self.mode) == "login" ? CommonLoginFormEls : MobileLoginFormEls;
			var ret = {};
			_.each(formEls, function (key) {
				var f = self.formFieldHT.get(key);
				var validCfg = $XP(f, 'field', {});
				ret[key] = validCfg;
			});
			return ret;
		}
	});

	
})(jQuery, window);