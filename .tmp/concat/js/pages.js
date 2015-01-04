(function ($, window) {
	IX.ns("Hualala");
	var TemplateList = new IX.IListManager();
	// APP Layout Template
	var tpl_site_layout = [
		'<div id="ix_wrapper">',
		'</div>'
	].join('');
	TemplateList.register("tpl_site_layout", tpl_site_layout);

	// Site top tip template
	var tpl_site_toptip = [
		'<div id="site_toptip_{{id}}" class="site-toptip alert alert-{{type}} fade in ">',
			// '<button type="button" class="close" data-dismiss="alert" aria-hidden="true">',
			// 	'<span aria-hidden="true">&times;</span>',
			// '</button>',
			'<p>{{msg}}</p>',
		'</div>'
	].join('');
	TemplateList.register("tpl_site_toptip", tpl_site_toptip);

	// APP顶部栏位模板
	var tpl_app_bar = [
		'<header class="bar bar-nav bi-bar {{clz}}">',
			// 顶部按钮
			'{{#with iconBtn}}',
				'{{#each items}}',
					'{{> iconBtn}}',
				'{{/each}}',
			'{{/with}}',
			'{{#with commonBtn}}',
				'{{#each items}}',
					'{{> commonBtn}}',
				'{{/each}}',
			'{{/with}}',
			'<h1 class="title">{{{title}}}</h1>',
		'</header>'
	].join('');
	TemplateList.register("tpl_app_bar", tpl_app_bar);

	// 通用button
	var tpl_common_btn = [
		'<button class="btn {{clz}}">',
			'{{#if isIconBtn}}',
				'<span class="icon {{iconClz}}"></span>',
			'{{/if}}',
			'{{label}}',
		'</button>'
	].join('');

	TemplateList.register("tpl_common_btn", tpl_common_btn);

	// 通用icon button
	var tpl_icon_btn = [
		'<a class="icon {{clz}}" href="{{href}}" data-label="{{label}}">',
		'</a>'
	].join('');
	TemplateList.register("tpl_icon_btn", tpl_icon_btn);



	// APP Login Template
	var tpl_site_login = [
		// '<header class="bar bar-nav bi-bar">',
		// 	'<h1 class="title">登录</h1>',
		// '</header>',
		'{{#with appBar}}',
			'{{> appBar}}',
		'{{/with}}',
		'<div class="content">',
			'<div class="segmented-control bi-login-tab">',
				'{{#each segHeads}}',
					'<a class="control-item {{active}} {{clz}}" data-href="segmented" href="#{{id}}">',
						'{{{label}}}',
					'</a>',
				'{{/each}}',
			'</div>',
			'{{#each segContents}}',
				'<div class="control-content {{active}} {{clz}}" id="{{id}}">',
					'<div class="card">',
						'<form class="input-group">',
							'{{#each items}}',
								'<div class="{{clz}}">',
									'<label>{{label}}</label>',
									'<input type="{{type}}" placeholder="{{placeholder}}" name="{{name}}" data-key="{{key}}" id="{{id}}" />',
								'</div>',
							'{{/each}}',
							'<button class="btn btn-positive btn-block subBtn" >',
								'<span class="icon icon-check"></span>',
							'</button>',
						'</form>',
					'</div>',
					'<div class="card info">',
						'{{{desc}}}',
					'</div>',
				'</div>',
			'{{/each}}',
			

		'</div>'
	].join('');
	TemplateList.register("tpl_site_login", tpl_site_login);

	// 动态验证码模板
	var tpl_auth_code = [
		'<div class="bi-authcode">',
			'<img alt="动态验证码" class="auth-img" src="" />',
		'</div>'
	].join('');
	TemplateList.register("tpl_auth_code", tpl_auth_code);

	// 手机动态密码按钮
	var tpl_dynamic_pwd = [
		'<button class="btn btn-warning bi-dynamicpwd" data-loading-text="{{loadingText}}">',
			'{{{label}}}',
		'</button>'
	].join('');
	TemplateList.register("tpl_dynamic_pwd", tpl_dynamic_pwd);

	// 品牌概览列表
	var tpl_brand_list = [
		'<ul class="table-view brand-list {{clz}}">',
			'{{#each items}}',
				'<li class="table-view-cell brand-item {{clz}}">',
					'<a class="navigate-right" href="{{href}}" data-transition="slide-in" data-href="push" data-item-id="{{groupID}}">',
						'<div class="row">',
							'<div class="col-xs-3">',
								'<img src="{{logo}}" alt="{{groupName}}" class="brand-logo" />',
							'</div>',
							'<div class="col-xs-3">',
								'<span class="price">{{personTotal}}</span>',
								'<span class="unit">{{personUnit}}</span>',
							'</div>',
							'<div class="col-xs-3">',
								'<span class="price">{{orderCountTotal}}</span>',
								'<span class="unit">{{orderUnit}}</span>',
							'</div>',
							'<div class="col-xs-3">',
								'<span class="price">{{orderAomoutTotal}}</span>',
								'<span class="unit">{{cashUnit}}</span>',
							'</div>',
						'</div>',
					'</a>',
				'</li>',
			'{{/each}}',
		'</ul>'
	].join('');
	TemplateList.register("tpl_brand_list", tpl_brand_list);

	// common segmented control
	var tpl_segment_bar = [
		'<div class="segmented-control {{clz}}">',
			'{{#each segments}}',
				'<a class="control-item {{active}} {{clz}}" href="{{href}}" data-href="segmented">',
					'{{{label}}}',
				'</a>',
			'{{/each}}',
		'</div>',
		'{{#each segments}}',
			'<div id="{{id}}" class="control-content {{active}}">',
			'</div>',
		'{{/each}}'
	].join('');
	TemplateList.register("tpl_segment_bar", tpl_segment_bar);

	// common page layout
	var tpl_page_layout = [
		'{{#with appBar}}',
			'{{> appBar}}',
		'{{/with}}',
		'<div class="content">',
		'</div>'
	].join('');
	TemplateList.register("tpl_page_layout", tpl_page_layout);

	// 过滤工具栏
	var tpl_filter_toolbar = [
		'<div class="bi-toolbar">',
			'<div class="bi-filter">',
				'{{#each items}}',
					'<div class="filter-item" data-toggle="dropdown" id="dropdown_{{key}}" data-key="{{key}}"', 
					'{{#if isShopFilter }}',
						' data-shopid="{{value}}" data-cityid="{{cityID}}"',
					'{{else}}',
						' data-value="{{value}}" ',
					'{{/if}}',
					'>',
						'<div class="item-label">',
							'<span class="label {{clz}}">',
								'{{{label}}}',
							'</span>',
							'<span class="icon icon-down "></span>',
						'</div>',
					'</div>',
				'{{/each}}',
			'</div>',
		'</div>'
		
	].join('');
	TemplateList.register("tpl_filter_toolbar", tpl_filter_toolbar);

	// 统计图表
	var tpl_brand_chart = [
		'<div class="brand-chart {{clz}}">',
			'<div class="chart-list clearfix">',
				// '{{#each charts}}',
				// 	'<canvas class="chart-canvas pull-left" ></canvas>',
				// '{{/each}}',
			'</div>',
			// '<canvas class="chart-canvas" width="{{width}}" height="auto"></canvas>',
			// '<div class="chart-footer">',
			// 	'<span class="btn btn-link zoom-out">',
			// 		'缩小',
			// 	'</span>',
			// 	'<span class="btn btn-link zoom-in">',
			// 		'放大',
			// 	'</span>',
			// '</div>',
		'</div>'
	].join('');
	TemplateList.register("tpl_brand_chart", tpl_brand_chart);

	// 统计数据报表
	var tpl_statistic_table = [
		'<div class="bi-table">',
			'<div class="table-header">',
				'{{#each header}}',
					'<div class="table-cell {{clz}}">',
						'{{#if isHistory}}',
							'{{#with iconBtn}}',
								'{{#each items}}',
									'{{> iconBtn}}',
								'{{/each}}',
							'{{/with}}',
						'{{/if}}',
						'<span class="date">',
							'{{{dateStr}}}',
						'</span>',
					'</div>',
				'{{/each}}',
			'</div>',
			'<div class="table-body">',
				'{{#each rows}}',
					'<a class="table-row {{clz}}"  data-charttype="{{chartType}}" href="{{href}}" data-transition="slide-in" data-href="push">',
						'{{#chkRowType type type="common"}}',
							'{{#each cols}}',
								'<div class="table-cell {{clz}} {{hidden}}">',
									'{{> commonCol}}',
								'</div>',
							'{{/each}}',
						'{{/chkRowType}}',
						'{{#chkRowType type type="chart"}}',
							'{{#each cols}}',
								'<div class="table-cell {{clz}} {{hidden}}">',
									'{{> chartCol}}',
								'</div>',
							'{{/each}}',
						'{{/chkRowType}}',
						'{{#chkRowType type type="list"}}',
							'{{#each cols}}',
								'<div class="table-cell {{clz}} {{hidden}}">',
									'{{> listCol}}',
								'</div>',
							'{{/each}}',
						'{{/chkRowType}}',
					'</a>',
				'{{/each}}',
			'</div>',
		'</div>'
	].join('');
	TemplateList.register("tpl_statistic_table", tpl_statistic_table);

	var tpl_tblcell_common = [
		'<div class="table-row ">',
			'<span class="table-cell label">{{label}}</span>',
			'<span class="table-cell num">{{{value}}}</span>',
			'<span class="table-cell unit">{{{unit}}}</span>',
		'</div>',
		'{{#if hasUncheckout }}',
			'<div class="table-row uncheckout {{clz}}">',
				'<span class="table-cell label">{{unCheckoutLabel}}</span>',
				'<span class="table-cell num">{{{waitCheckoutOrderAmountTotal}}}</span>',
				'<span class="table-cell unit">{{{unit}}}</span>',
			'</div>',
		'{{/if}}'
	].join('');
	TemplateList.register("tpl_tblcell_common", tpl_tblcell_common);

	var tpl_tblcell_chart = [	
		'<div class="">',
			'<h5 class="">{{label}}</h5>',
			'<div class="chart-canvas">',
			'</div>',
			'{{#each items}}',
			'<div class="table-row chart-legend {{clz}}">',
				'<span class="table-cell label">',
					'<span class="legend-icon {{iconClz}}"></span>',
					'<span>{{{label}}}</span>',
				'</span>',
				'<span class="table-cell num">{{{value}}}</span>',
				'<span class="table-cell unit">{{{unit}}}</span>',
			'</div>',
			'{{/each}}',
		'</div>'
	].join('');
	TemplateList.register("tpl_tblcell_chart", tpl_tblcell_chart);

	var tpl_tblcell_list = [
		'<div class="">',
			'<h5 class="">{{label}}</h5>',
			'<ul>',
			'{{#each items}}',
				'<li>',
					'<span class="label">',
						'{{{payName}}}',
					'</span>',
					'<span class="percent">',
						'{{{payPercent}}}',
					'</span>',
					'<span class="num">',
						'{{{payAmount}}}',
					'</span>',
					'<span class="unit">',
						'{{{../cashUnit}}}',
					'</span>',
				'</li>',
			'{{/each}}',
			'</ul>',
		'</div>'
	].join('');
	TemplateList.register("tpl_tblcell_list", tpl_tblcell_list);

	var tpl_group_droplist = [
		'{{#if isEmpty }}',
			'<div class="text-center text-muted">无数据</div>',
		'{{else}}',
			'<ul class="drop-list {{clz}}">',
				'{{#each items}}',
					'<li class="list-item {{active}}" data-value="{{value}}">',
						'<span class="label">',
							'<img class="brand-logo" src="{{logo}}"/>',
							'{{label}}',
						'</span>',
					'</li>',
				'{{/each}}',
			'</ul>',
		'{{/if}}'
	].join('');
	TemplateList.register("tpl_group_droplist", tpl_group_droplist);

	var tpl_shop_droplist = [
		'{{#if isEmpty }}',
			'<div class="text-center text-muted">无数据</div>',
		'{{else}}',
			'<div class="drop-list {{clz}}">',
				'<div class="menu-city pull-left">',
					'<ul class="">',
						'<li class="city-item" data-cityid="" >',
							'<span class="label">全部店铺</span>',
							'<span class="num">{{total}}</span>',
						'</li>',
						'{{#each cities}}',
							'<li class="city-item" data-cityid="{{cityID}}">',
								'<span class="label">{{cityName}}</span>',
								'<span class="num">({{cityCount}})</span>',
							'</li>',
						'{{/each}}',
					'</ul>',
				'</div>',
				'<div class="menu-shop">',
					'{{#each cities}}',
						'<ul class="" data-cityID="{{cityID}}">',
							'<li class="shop-item" data-cityid="{{cityID}}" data-shopID="">',
								'<span class="label">{{cityName}}全部店铺</span>',
							'</li>',
							'{{#each shops}}',
								'<li class="shop-item" data-cityid="{{cityID}}" data-shopid="{{shopID}}">',
									'<span class="label">{{shopName}}</span>',
								'</li>',
							'{{/each}}',
						'</ul>',
					'{{/each}}',
				'</div>',
			'</div>',
		'{{/if}}'
	].join('');
	TemplateList.register("tpl_shop_droplist", tpl_shop_droplist);

	var tpl_cycle_droplist = [
		'{{#if isEmpty }}',
			'<div class="text-center text-muted">无数据</div>',
		'{{else}}',
			'<ul class="drop-list {{clz}}">',
				'{{#each items}}',
					'<li class="list-item {{active}}" data-value="{{value}}">',
						'<span class="label">',
							'{{label}}',
						'</span>',
					'</li>',
				'{{/each}}',
			'</ul>',
		'{{/if}}'
	].join('');
	TemplateList.register("tpl_cycle_droplist", tpl_cycle_droplist);

	var tpl_indicator_droplist = [
		'{{#if isEmpty }}',
			'<div class="text-center text-muted">无数据</div>',
		'{{else}}',
			'<ul class="drop-list {{clz}}">',
				'{{#each items}}',
					'<li class="list-item {{active}}" data-value="{{value}}">',
						'<span class="label">',
							'{{label}}',
						'</span>',
					'</li>',
				'{{/each}}',
			'</ul>',
		'{{/if}}'
	].join('');
	TemplateList.register('tpl_indicator_droplist', tpl_indicator_droplist);


	var TplLib = function () {
		return {
			register : function (key, tpl) {
				if (!TemplateList.hasKey(key)) {
					TemplateList.register(key, tpl);
				} else {
					throw("This key has registed!!!");
				}
			},
			get : function (key) {
				if (!TemplateList.hasKey(key)) {
					throw("There are no template that is named " + key);
				} else {
					return TemplateList.getByKeys([key])[0];
				}
			}
		};
	};

	Hualala.TplLib = new TplLib();
})(jQuery, window);
/* ========================================================================
 * Bootstrap: alert.js v3.2.0
 * http://getbootstrap.com/javascript/#alerts
 * ========================================================================
 * Copyright 2011-2014 Twitter, Inc.
 * Licensed under MIT (https://github.com/twbs/bootstrap/blob/master/LICENSE)
 * ======================================================================== */


+function ($) {
  'use strict';

  // ALERT CLASS DEFINITION
  // ======================

  var dismiss = '[data-dismiss="alert"]'
  var Alert   = function (el) {
    $(el).on('click', dismiss, this.close)
  }

  Alert.VERSION = '3.2.0'

  Alert.prototype.close = function (e) {
    var $this    = $(this)
    var selector = $this.attr('data-target')

    if (!selector) {
      selector = $this.attr('href')
      selector = selector && selector.replace(/.*(?=#[^\s]*$)/, '') // strip for ie7
    }

    var $parent = $(selector)

    if (e) e.preventDefault()

    if (!$parent.length) {
      $parent = $this.hasClass('alert') ? $this : $this.parent()
    }

    $parent.trigger(e = $.Event('close.bs.alert'))

    if (e.isDefaultPrevented()) return

    $parent.removeClass('in')

    function removeElement() {
      // detach from parent, fire event then clean up data
      $parent.detach().trigger('closed.bs.alert').remove()
    }

    $.support.transition && $parent.hasClass('fade') ?
      $parent
        .one('bsTransitionEnd', removeElement)
        .emulateTransitionEnd(150) :
      removeElement()
  }


  // ALERT PLUGIN DEFINITION
  // =======================

  function Plugin(option) {
    return this.each(function () {
      var $this = $(this)
      var data  = $this.data('bs.alert')

      if (!data) $this.data('bs.alert', (data = new Alert(this)))
      if (typeof option == 'string') data[option].call($this)
    })
  }

  var old = $.fn.alert

  $.fn.alert             = Plugin
  $.fn.alert.Constructor = Alert


  // ALERT NO CONFLICT
  // =================

  $.fn.alert.noConflict = function () {
    $.fn.alert = old
    return this
  }


  // ALERT DATA-API
  // ==============

  $(document).on('click.bs.alert.data-api', dismiss, Alert.prototype.close)

}(jQuery);

;(function ($, undefined) {
	var backdrop = '.dropdown-backdrop';
	var toggle = '[data-toggle="dropdown"]'
	var DropDown = function DropDown (tarEl, options) {
		this.$trigger = $(tarEl);
		this.options = $.extend({}, $.fn.dropdown.DEFAULT_OPTIONS, options);

		this.$parentEl = null;
		this.$backdrop = null;

		this.$trigger.on('click.ra.dropdown', {ctx : this}, this.toggle);
	};
	DropDown.prototype = {
		toggle : function (e) {
			var $this = $(this),
				that = e.data.ctx;
			if ($this.is('.disabled, :disabled')) return;
			var isSwitch = false;
			that.$parentEl = that.getParent($this);

			if (that.$parentEl.data('cur.toggle') && that.$parentEl.data('cur.toggle').attr('id') != $this.attr('id')) {
				isSwitch = true;
			}

			that.$parentEl.data('cur.toggle', $this);
			var isActive = that.$parentEl.hasClass('open');

			that.clearMenus(e);

			

			if (!isActive || isSwitch) {
				if ('ontouchstart' in document.documentElement) {
					// $('<div class="dropdown-backdrop"></div>').css({
					// 	'width' : $('body').width() + 'px',
					// 	'height' : document.body.scrollHeight + 'px'
					// }).insertAfter($this).on('click', {ctx : that}, function (e) {
					// 	that.clearMenus(e);
					// });
					$('<div class="dropdown-backdrop"></div>').css({
						'width' : $('body').width() + 'px',
						'height' : document.body.scrollHeight + 'px'
					}).appendTo(that.$parentEl).on('click', {ctx : that}, function (e) {
						that.clearMenus(e);
					});
				}
				var relatedTarget = {relatedTarget : this};
				

				if (e.isDefaultPrevented()) return;
				$this.trigger('focus');
				if (!that.$parentEl.find('.dropdown-menu').length) {
					$('<div class="dropdown-menu"></div>').appendTo(that.$parentEl);
				}
				that.$parentEl.trigger(e = $.Event('show.ra.dropdown', relatedTarget));
				that.$parentEl.toggleClass('open').trigger('shown.ra.dropdown', relatedTarget);
				if ('ontouchstart' in document.documentElement) {
					$(backdrop).css({
						top : $('.dropdown-menu').offset().top + 'px'
					});
				}
			}
			return false;
		},
		clearMenus : function (e) {
			var that = this;
			if (e && e.which === 3) return;
			$(backdrop).remove();
			$(toggle).each(function () {
				var $parent = that.getParent($(this));
				var relatedTarget = {relatedTarget : this};
				if (!$parent.hasClass('open')) return;
				$parent.trigger(e = $.Event('hide.ra.dropdown', relatedTarget));
				if (e.isDefaultPrevented()) return;
				$parent.removeClass('open').trigger('hidden.ra.dropdown', relatedTarget);
				if ($parent.find('.dropdown-menu').length) {
					$parent.find('.dropdown-menu').remove();
				}
			});
		},
		getParent : function ($this) {
			var selector = $this.attr('data-target');

			if (!selector) {
				selector = $this.attr('href');
				selector = selector && /#[A-Za-z]/.test(selector) && selector.replace(/.*(?=#[^\s]*$)/, '');
			}
			selector = !selector ? this.options.parentSelector : selector;

			var $parent = selector && $(selector);
			return $parent && $parent.length ? $parent : $this.parent();
		}
	};

	

	$.fn.dropdown = function (option) {
		return this.each(function () {
			var $this = $(this);
			var data = $this.data('ra.dropdown'),
				options = 'object' === typeof option && option;
			if (!data) 
				$this.data('ra.dropdown', (data = new DropDown(this, options)));
			if (typeof option == 'string') data[option].call($this);
		});
	};
	$.fn.dropdown.Constructor = DropDown;

	$.fn.dropdown.DEFAULT_OPTIONS = {
		parentSelector : null
	};

	$(document)
		.on('click.ra.dropdown.data-api', function (e) {
			var $toggles = $(toggle);
			$toggles.each(function (i, el) {
				var o = $(el).data('ra.dropdown');
				o.clearMenus(e);
			});
			return true;
		});
})(jQuery);
(function ($, window) {
	IX.ns("Hualala.UI");
	var HG = Hualala.Global;
	var hbr = Handlebars,
		TplLib = Hualala.TplLib;
	/**
	 * show tip message for window
	 * 
	 * @param {[Obj]} cfg 
	 *        msg : "string",
	 *        type : "danger|warning|success",
	 *        afterClosed : function
	 *        afterClose : function
	 * @return {jQuery Obj} tip obj
	 */
	var TopTip = function (cfg) {
		var tpl = hbr.compile(TplLib.get('tpl_site_toptip'));
		var tipEl = $(tpl({
			id : IX.id(),
			type : $XP(cfg, 'type', 'warning'),
			msg : $XP(cfg, 'msg', '')
		}));
		tipEl.appendTo('body');
		tipEl.bind({
			'close.bs.alert' : function (e) {
				$XF(cfg, 'afterClose')(e);
			},
			'close.bs.alert' : function (e) {
				$XF(cfg, 'afterClosed')(e);
			}
		});
		tipEl.addClass('popup');
		tipEl.alert();
		var timmer = null, count = 0;
		setTimeout(function () {
			if (count <= 1) {
				setTimeout(arguments.callee, count == 0 ? $XP(cfg, 'interval', 1500) : 500);
				count == 1 && tipEl.removeClass('popup').addClass('bubbleover');
				count++;
			} else {
				count == 2 && tipEl.alert('close');
			}
		}, 500);
	};
	Hualala.UI.TopTip = TopTip;

	var GroupDropList = function (cfg) {
		var tpl = hbr.compile(TplLib.get('tpl_group_droplist'));
		var container = $XP(cfg, 'container'),
			targetEl = $XP(cfg, 'targetEl'),
			selectFn = $XF(cfg, 'selectFn');
		if (!container || !targetEl) return;

		var curVal = targetEl.attr('data-value');
		var $dropList = null;

		var data = Hualala.ShopManager.getGroupSet();
		var mapRenderData = function (data) {
			var isEmpty = (!data || data.length == 0) ? true : false;
			var items = _.map(data, function (el) {
				var value = $XP(el, 'groupID'),
					active = value == curVal ? 'active' : '',
					groupLogoImageUrl = $XP(el, 'groupLogoImageUrl', ''),
					logo = IX.isEmpty(groupLogoImageUrl) ? 
						Hualala.Global.getDefaultImage("blank") :
						Hualala.Common.getSourceImage(groupLogoImageUrl, {
							width : 40,
							height : 40,
							quality : 50
						});

				return {
					value : value,
					active : active,
					logo : logo,
					label : $XP(el, 'groupLoginName', '')
				};
			});
			return {
				clz : 'droplist-group',
				isEmpty : isEmpty,
				items : items
			};
		};
		$dropList = $(tpl(mapRenderData(data)));
		container.empty().append($dropList);
		$dropList.off('click').on('click', '.list-item', function (e) {
			var $li = $(this);
			$dropList.find('.list-item.active').removeClass('active');
			$li.addClass('active');
			// e.stopPropagation();
			targetEl.attr('data-value', $li.attr('data-value'));
			targetEl.find('.brand-logo').attr('src', $li.find('.brand-logo').attr('src'));
			selectFn(targetEl);
			// return false;
		});
	};
	Hualala.UI.GroupDropList = GroupDropList;

	var ShopDropList = function (cfg) {
		var tpl = hbr.compile(TplLib.get('tpl_shop_droplist'));
		var container = $XP(cfg, 'container'),
			targetEl = $XP(cfg, 'targetEl'),
			groupID = $XP(cfg, 'groupID'),
			selectFn = $XF(cfg, 'selectFn');
		if (!container || !targetEl) return;
		var curCityID = targetEl.attr('data-cityid') || '',
			curShopID = targetEl.attr('data-shopid') || '';
		var $dropList = null;

		var mapRenderData = function (data) {
			var isEmpty = !data || data.length == 0 ? true : false;
			var total = 0;
			_.each(data, function (city) {
				total += parseInt($XP(city, 'cityCount', 0) || 0);
			});
			return {
				isEmpty : isEmpty,
				cities : data,
				clz : 'droplist-shop',
				total : total == 0 ? '' : ('(' + total + ')')
			};
		};

		var resetLayout = function () {
			var $cityMenu = $dropList.find('.menu-city'),
				$shopMenu = $dropList.find('.menu-shop');
			if (IX.isEmpty(curCityID) && IX.isEmpty(curShopID)) {
				$cityMenu.find('li:first-child').addClass('active');
			} else if (!IX.isEmpty(curCityID) && IX.isEmpty(curShopID)) {
				$cityMenu.find('li[data-cityid=' + curCityID + ']').addClass('active');
				$shopMenu.find('ul[data-cityid=' + curCityID + ']').addClass('active').find('li:first-child').addClass('active');
			} else {
				$cityMenu.find('li[data-cityid=' + curCityID + ']').addClass('active');
				$shopMenu.find('ul[data-cityid=' + curCityID + ']').addClass('active').find('li[data-shopid=' + curShopID + ']').addClass('active');
			}
		};

		Hualala.ShopManager.getShopDataSetByGroupID(groupID, function (data) {
			var renderData = mapRenderData(data);
			$dropList = $(tpl(renderData));
			container.empty().append($dropList);
			resetLayout();
			var $cityMenu = $dropList.find('.menu-city'),
				$shopMenu = $dropList.find('.menu-shop');
			$cityMenu.off('click').on('click', '.city-item', function (e) {
				var $li = $(this);
				var cityID = $li.attr('data-cityid');
				$cityMenu.find('.city-item.active').removeClass('active');
				$li.addClass('active');
				$shopMenu.find('>ul').removeClass('active');
				if (IX.isEmpty(cityID)) {
					targetEl.attr('data-shopid', '');
					targetEl.attr('data-cityid', '');
					targetEl.find('.label').html($li.find('.label').html());
					selectFn(targetEl);
				} else {
					$shopMenu.find('>ul[data-cityid=' + cityID + ']').addClass('active');
					return false;	
				}
				
				// e.stopPropagation();
				return true;

			});
			$shopMenu.off('click').on('click', '.shop-item', function (e) {
				var $li = $(this);
				$shopMenu.find('.shop-item').removeClass('active');
				$li.addClass('active');
				targetEl.attr('data-cityid', $li.attr('data-cityid'));
				targetEl.attr('data-shopid', $li.attr('data-shopid'));
				targetEl.find('.label').html($li.find('.label').html());
				selectFn(targetEl);
				// e.stopPropagation();
				return true;
			});
		});
	};
	Hualala.UI.ShopDropList = ShopDropList;

	var CycleDropList = function (cfg) {
		var tpl = hbr.compile(TplLib.get('tpl_cycle_droplist'));
		var container = $XP(cfg, 'container'),
			targetEl = $XP(cfg, 'targetEl'),
			selectFn = $XF(cfg, 'selectFn');
		if (!container || !targetEl) return;

		var curVal = targetEl.attr('data-value');
		var $dropList = null;

		var data = Hualala.TypeDef.CycleTypes;
		var mapRenderData = function (data) {
			var isEmpty = (!data || data.length == 0) ? true : false;
			var items = _.map(data, function (el) {
				var value = $XP(el, 'value'),
					label = $XP(el, 'label'),
					active = value == curVal ? 'active' : '';

				return {
					value : value,
					active : active,
					label : label
				};
			});
			return {
				clz : 'droplist-cycle',
				isEmpty : isEmpty,
				items : items
			};
		};
		$dropList = $(tpl(mapRenderData(data)));
		container.empty().append($dropList);
		$dropList.off('click').on('click', '.list-item', function (e) {
			var $li = $(this);
			$dropList.find('.list-item.active').removeClass('active');
			$li.addClass('active');
			// e.stopPropagation();
			targetEl.attr('data-value', $li.attr('data-value'));
			targetEl.find('.label').html($li.find('.label').html());
			selectFn(targetEl);
			// return false;
		});
	};
	Hualala.UI.CycleDropList = CycleDropList;

	var ChartDropList = function (cfg) {
		var tpl = hbr.compile(TplLib.get('tpl_indicator_droplist'));
		var container = $XP(cfg, 'container'),
			targetEl = $XP(cfg, 'targetEl'),
			selectFn = $XF(cfg, 'selectFn');
		if (!container || !targetEl) return;
		var curVal = targetEl.attr('data-value');
		var $dropList = null;
		var data = _.filter(Hualala.TypeDef.BrandDetailRows, function (el) {return el.type !== 'list';});
		var mapRenderData = function (data) {
			var isEmpty = (!data || data.length == 0) ? true : false;
			var items = _.map(data, function (el) {
				var value = $XP(el, 'chartType'),
					label = $XP(el, 'label'),
					active = value == curVal ? 'active' : '';
				return {
					value : value,
					active : active,
					label : label
				};
			});
			return {
				clz : 'droplist-cycle',
				isEmpty : isEmpty,
				items : items
			};
		};
		$dropList = $(tpl(mapRenderData(data)));
		container.empty().append($dropList);
		$dropList.off('click').on('click', '.list-item', function (e) {
			var $li = $(this);
			$dropList.find('.list-item.active').removeClass('active');
			$li.addClass('active');
			// e.stopPropagation();
			targetEl.attr('data-value', $li.attr('data-value'));
			// targetEl.find('.label').html($li.find('.label').html());
			selectFn(targetEl);
			// return false;
		});
	};
	Hualala.UI.ChartDropList = ChartDropList;
})(jQuery, window);
(function ($, window) {
	IX.ns("Hualala.Common");
	var HC = Hualala.Common;
	// 默认根目录
	HC.IndexInit = function () {
		document.location.href = Hualala.PageRoute.createPath("main", ["day"]);
		return ;
	};

	// 页面整体DOM框架加载
	HC.initPageLayout = function () {
		var session = Hualala.getSessionData(),
			layoutTpl = Handlebars.compile(Hualala.TplLib.get('tpl_site_layout'));
		var $wrapper = $(layoutTpl());
		$('body > #ix_wrapper').remove();
		$wrapper.appendTo('body');
	};

	HC.LoginInit = function (pageName, pageParams) {
		Hualala.Common.initPageLayout({}, pageName);
		var $wrapper = $('body > #ix_wrapper');
		var panel = new Hualala.Entry.LoginInit({
			container : $wrapper
		});
		return panel;
	};

	// 多品牌列表首页
	HC.SchemaPageInit = function (pageName, pageParams) {
		console.info("Schema Page ");
		HC.initPageLayout({}, pageName);
		var $wrapper = $('body > #ix_wrapper');
		var panel = new Hualala.Brand.BrandListController({
			container : $wrapper,
			view : new Hualala.Brand.BrandListView(),
			model : new Hualala.Model.BrandListModel()
		});
		return panel;
		
	};

	// 单品牌统计页面
	HC.BrandPageInit = function (pageName, pageParams) {
		HC.initPageLayout({}, pageName);
		var $wrapper = $('body > #ix_wrapper');
		var panel = new Hualala.Brand.BrandDetailController({
			container : $wrapper,
			view : new Hualala.Brand.BrandDetailView(),
			model : new Hualala.Model.BrandListModel()
		});
		return panel;
		
	};

	// 品牌业务统计图
	HC.BrandChartPageInit = function (pageName, pageParams) {
		HC.initPageLayout({}, pageName);
		var $wrapper = $('body > #ix_wrapper');
		var panel = new Hualala.Brand.BrandChartController({
			container : $wrapper,
			view : new Hualala.Brand.BrandChartView(),
			model : new Hualala.Model.BrandListModel()
		});
		return panel;
		
	};

	// 个人信息页面
	HC.AboutMePageInit = function (pageName, pageParams) {
		HC.initPageLayout({}, pageName);
		var $wrapper = $('body > #ix_wrapper');
		$wrapper.html([
			'<header class="bar bar-nav">',
				'<a class="icon icon-person pull-right" href="/#login" data-transition="slide-in" data-href="push"></a>',
				'<h1 class="title">老板通</h1>',
			'</header>',
			'<div class="content">',
				'<h1 class="title">个人信息</h1>',
			'</div>'
		].join(''));
	};
})(jQuery, window);
(function ($, window) {
	IX.ns("Hualala.PageRoute");
	var Router = Hualala.Router;
	var isInitialized = false,
		PageConfigurations = {},
		Path2NameMapping = {};

	function mappingRoute (_path, _name, _reg) {
		var match = _path.match(_reg);
		if (!match) return;
		var s = match.shift(),
			arr = s.split('/');
		arr = _.map(arr, function (v, i, l) {
			var bingo = _.indexOf(s, v);
			if (bingo > -1) {
				return '_';
			}
			return v;
		});
		arr.push(""); arr.unshift("");
		var _pattern = arr.join("_");
		Path2NameMapping[_pattern] = _name;
	}

	var detectPageInitializor = (function () {
		var ht = new IX.I1ToNManager();
		var fnames = [];
		function _checkItem(fname) {
			if (!IX.isFn(IX.getNS(fname)))
				return false;
			var _list = ht.get(fname),
				_fn = IX.getNS(fname);
			for (var j = 0; j < _list.length; j++)
				PageConfigurations[_list[j]].init = _fn;
			ht.remove(fname);
			return true;
		}

		function _checking() {
			fnames = IX.loop(fnames, [], function (acc, fname) {
				if (!_checkItem(fname))
					acc.push(fname);
				return acc;
			});
			return fnames.length == 0;
		}

		function _check () {
			fnames = IX.Array.toSet(fnames);
			IX.checkReady(_checking, IX.emptyFn, 40, {
				maxAge : 15000,
				expire : function () {
					alert("Can't find page inializor : \n" + fnames.join("\n"));
				}
			});
		}
		
		function _detect(name, fname) {
			var _fn = null;
			if (IX.isFn(fname)) {
				_fn = fname;
			} else if (!IX.isString(fname)) {
				throw("Configuration failed : Invalid Page Initialized for " + name);
				return false;
			} else if (IX.nsExisted(fname)) {
				_fn = IX.getNS(fname);
			}
			if (IX.isFn(_fn)) {
				return PageConfigurations[name].init = _fn;
			}
			ht.put(fname, name);
			fnames.push(fname);
		}
		return {
			start : function () {setTimeout(_check, 1);},
			detect : _detect
		}
	})();

	/**
	 * 获取路由路径
	 * @param  {String} name   路由配置的名称
	 * @param  {Array|NULL} params 组装路由需要的参数，按照路由规则按顺序给出参数
	 * @return {String}        返回生成的路由
	 */
	function getPathByName (name, params) {
		var cfg = PageConfigurations[name];
		if (!cfg) 
			return console.err("Can't find route : " + name);
		var path = $XP(cfg, 'path'), reg = $XP(cfg, 'reg'),
			match = path.match(reg);
		var genPath = function (p) {
			return Hualala.Global.HOME + p;
			// return Hualala.Global.HOME + p.slice(1);
		};
		if (!match || match.length < 1) {
			return console.err("The Path of Route (" + name + ") is wrong!!");
		} else if (match.length == 1) {
			return genPath(path);
		} else if (match.length > 1 && IX.isArray(params) && (match.length - 1) == params.length) {
			match.shift();
			_.each(match, function (v, i, m) {
				path = path.replace(v, params[i]);
			});
			return genPath(path);
		}
	}
	/**
	 * pageConfig : {
	 * 		name : "",
	 * 		path : "",
	 * 		reg : RegExp,
	 * 		bodyClz : "", default ""
	 * 		PageInitiator : "Hualala.User.init" or function (cfg) {}
	 * }
	 * @param  {[type]} cbFn [description]
	 * @return {[type]}      [description]
	 */
	var pageConfigs = [
		// APP Login View
		// 登录
		{
			name : "login", path : "/#login", reg : /login$/, bodyClz : "",
			PageInitiator : "Hualala.Common.LoginInit", label : "登录"
		},
		// APP Brand Schema List View 
		// 多品牌概览列表页
		/*
			cy : cycle 周期条件[day|week|month|quarter]
		 */
		{
			name : "main", path : "/#schema/cy{cycle}", bodyClz : "",
			reg : /schema\/cy(.*)$/, 
			PageInitiator : "Hualala.Common.SchemaPageInit", label : "老板通"
		},
		// APP Brand Statistical Schema View
		// 单品牌统计
		/*
			cy : cycle 周期条件[day|week|month|quarter]
			g : groupID 品牌ID
			c : cityID 城市ID
			s : shopID 店铺ID
			//b : begin date 开始日期(SecondTick)
			//e : end date 结束日期(SecondTick)
		 */
		{
			name : "brand", path : "/#brand/cy{cycle}/g{groupID}/c{cityID}/s{shopID}",
			reg : /brand\/cy(.*)\/g(.*)\/c(.*)\/s(.*)$/,
			PageInitiator : "Hualala.Common.BrandPageInit", label : "品牌详情",
			parentName : "main"
		},
		// APP Brand Business Item Statistical Chart
		// 品牌业务项统计图表页
		/*
			cy : cycle 周期条件[day|week|month|quarter]
			g : groupID 品牌ID
			c : cityID 城市ID
			s : shopID 店铺ID
			oi : operational indicator 业务指标ID[]
			d : density 图表密度 
		 */
		{
			name : "chart", path : "/#brand/chart/cy{cycle}/g{groupID}/c{cityID}/s{shopID}/oi{opID}/d{density}",
			reg : /brand\/chart\/cy(.*)\/g(.*)\/c(.*)\/s(.*)\/oi(.*)\/d(.*)$/,
			PageInitiator : "Hualala.Common.BrandChartPageInit", label : "指标统计图表",
			parentName : "brand"
		},
		// About me page
		// 个人信息页面
		{
			name : "aboutme", path : "/#aboutme",
			reg : /aboutme$/,
			PageInitiator : "Hualala.Common.AboutMePageInit", label : "个人信息",
			parentName : "main"
		},
		// 上面的path都匹配不到，需要自动跳转home
		{
			name : "index", path : "", reg : /(.*)$/, bodyClz : "",
			PageInitiator : "Hualala.Common.IndexInit"
		}
	];
	IX.iterate(pageConfigs, function (cfg) {
		var _cfg = IX.inherit({
			bodyClz : "ix-minor",
			path : ""
		}, cfg);
		var _name = $XP(cfg, 'name'), _path = $XP(cfg, 'path'), _reg = $XP(cfg, 'reg');
		mappingRoute(_path, _name, _reg);
		PageConfigurations[_name] = {
			name : _name, bodyClz : $XP(_cfg, 'bodyClz', ''), path : _path, reg : $XP(_cfg, 'reg', null),
			parentName : $XP(cfg, 'parentName', null), label : $XP(cfg, 'label', '')
		};
		var _pageInit = "PageInitiator" in _cfg ? _cfg.PageInitiator : null;
		if (!IX.isString(_pageInit) && !IX.isFn(_pageInit))
			_pageInit = IX.emptyFn;
		detectPageInitializor.detect(_name, _pageInit);
	});
	detectPageInitializor.start();


	Hualala.PageRoute.start = function (cbFn) {
		isInitialized = true;
		Router.flush().config({mode : 'history', root : Hualala.Global.HOME});
		// Router.flush().config({mode : 'history'});
		// IE Browser can not support this method ??
		_.each(PageConfigurations, function (route, name, l) {
			var re = $XP(route, 'reg'), initFn = $XF(route, 'init'), handler = null;
			
			handler = function (params) {
				IX.Debug.info("INFO: Init Page : [" + name + "]");
				IX.Debug.info("INFO: Page Arguments : [" + params + "]");
				IX.isFn(cbFn) && cbFn(name, params, initFn);
				
				// initFn && initFn.apply(null, [name, params]);
			};
			
			Router.add(re, handler);
		});
		Router.listen().check();
	};

	Hualala.PageRoute.createPath = getPathByName;

	Hualala.PageRoute.getCurrentPath = function () {
		return location.hash;
	};

	Hualala.PageRoute.getPageContextByPath = function (path) {
		var fragment = path || Hualala.Router.getFragment();
		var match = _.filter(PageConfigurations, function (el, k, l) {
			return !!fragment.match(el.reg);
		});
		var params = null;
		if (match.length == 0) return null;
		if (match.length == 1) {
			params = fragment.match(match[0]['reg']);
			params.shift();
			return IX.inherit({params : params}, match[0]);
		}
		match = _.filter(match, function (el, k, l) {
			return el.name != 'index';
		});
		params = fragment.match(match[match.length - 1]['reg']);
		params.shift();
		return IX.inherit({params : params}, match[match.length - 1]);
	};

	Hualala.PageRoute.getParentNamesByPath = function (path) {
		var curContext = Hualala.PageRoute.getPageContextByPath(path);
		var curName = $XP(curContext, 'name', null);
		var ret = [];
		while(!IX.isEmpty(curName)) {
			ret.unshift({
				name : curName,
				label : $XP(curContext, 'label', ''),
                path: Hualala.PageRoute.createPath(curName, curContext.params)
			});
			var parentName = $XP(curContext, 'parentName', null);
			curContext = IX.isEmpty(parentName) ? null : $XP(PageConfigurations, parentName, null);
			curName = $XP(curContext, 'name', null);
		}
        ret[ret.length - 1].isLastNode = true;
		return ret;
	};
    
    Hualala.PageRoute.getPageLabelByName = function (name) {
        if(!name) return null;
        var cfg = PageConfigurations[name];
        if(!cfg) return null;
        return cfg.label;
    };
    
    Hualala.PageRoute.jumpPage = function (path) {
    	document.location.href = path;
    };
})(jQuery, window);
(function ($, window) {
	IX.ns("Hualala.Entry");
	var HG = Hualala.Global;
	var HU = Hualala.UI;
	var hbr = Handlebars,
		TplLib = Hualala.TplLib;
	var formFields = [
		{
			name : "group_name", type : "text", placeholder : "", clz : "form-control input-row",
			key : "groupName", label : "集团主账号",
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
			key : "childName", label : "集团子账号",
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
			hbr.registerPartial("appBar", TplLib.get('tpl_app_bar'));
			hbr.registerPartial("iconBtn", TplLib.get('tpl_icon_btn'));
			hbr.registerPartial("commonBtn", TplLib.get('tpl_common_btn'));

			self.$container.html(tpl(renderData));
			self.initAuthCode();
			self.initDynamicPWD();
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
				self.mode = $(e.target).attr('href').slice(1);
				self.callServer = self.mode == 'login' ? HG.loginCallServer : HG.dynamicLoginCallServer;
			});
			self.$container.on('click', '.subBtn', function (e) {
				// TODO Submit form
				e.preventDefault();
				var bv = $('#' + self.mode).find('form').data('smileyValidator');
				bv.validate();
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
					self.callServer(params, function (res) {
						if ($XP(res, 'resultcode') == "000") {
							Hualala.PageRoute.jumpPage(Hualala.PageRoute.createPath("main", [""]));
						} else {
							HU.TopTip({
								type : 'danger',
								msg : $XP(res, 'resultmsg', '') || "登录失败"
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
(function ($, window) {
	IX.ns("Hualala.Brand");
	var HB = Hualala.Brand;
	var HP = Hualala.PageRoute;
	var HU = Hualala.UI;
	var hbr = Handlebars,
		TplLib = Hualala.TplLib;
	var CycleTypes = Hualala.TypeDef.CycleTypes;
	
	var BrandListView = Stapes.subclass({
		/**
		 * 品牌列表页View层
		 * @return {Obj}     品牌列表View层实例
		 * 
		 */
		constructor : function () {
			this.container = null;
			this.model = null;
			this.loadTemplates();
			this.curCycleType = CycleTypes[0].value;
			this.$curCnt = null;
		}
	});

	BrandListView.proto({
		/**
		 * 品牌列表页View层
		 * @param  {Obj} cfg 
		 *         {
		 *         		container, model
		 *         }
		 *         
		 * @return {Obj}     品牌列表View层实例
		 * 
		 */
		init : function (cfg) {
			this.container = $XP(cfg, 'container', null);
			this.model = $XP(cfg, 'model', null);
			var _p = this.model.getQueryParams();
			if (!this.container || !this.model) {
				throw("Brand list view init failed!!");
			}
			this.curCycleType = $XP(_p, 'cycleType', 'day');
			this.initLayout();
		},
		mapAppBarData : function () {
			var self = this;
			return {
				clz : '',
				iconBtn : {
					items : [
						{
							clz : 'icon-person pull-right',
							label : '个人信息',
							href : HP.createPath('aboutme')
						}
					]
				},
				title : "老板通"
			};
		},
		mapSegmentsData : function () {
			var self = this;
			var segments = _.map(CycleTypes, function (el) {
				var cycleType = el.value;
				return IX.inherit(el, {
					active : self.curCycleType == cycleType ? 'active' : '',
					clz : '',
					href : '#' + cycleType,
					id : cycleType
				});
			});
			return {
				clz : '',
				segments : segments
			};
		},
		initLayout : function () {
			var layoutTpl = this.get('layoutTpl');
			var segmentsTpl = this.get('segmentsTpl');
			var htm = layoutTpl({
				appBar : this.mapAppBarData()
			});
			this.container.html(htm);
			htm = segmentsTpl(this.mapSegmentsData());
			this.container.find('.content').html(htm);
			this.bindEvent();
		},
		// 加载View层所需模板
		loadTemplates : function () {
			var layoutTpl = hbr.compile(TplLib.get('tpl_page_layout'));
			var segmentsTpl = hbr.compile(TplLib.get('tpl_segment_bar'));
			var listTpl = hbr.compile(TplLib.get('tpl_brand_list'));
			hbr.registerPartial("appBar", TplLib.get('tpl_app_bar'));
			hbr.registerPartial("iconBtn", TplLib.get('tpl_icon_btn'));
			hbr.registerPartial("commonBtn", TplLib.get('tpl_common_btn'));
			this.set({
				layoutTpl : layoutTpl,
				segmentsTpl : segmentsTpl,
				listTpl : listTpl
			});

		},
		mapContentData : function (data) {
			var self = this;
			var listClz = '';
			var items = _.map(data, function (d) {
				var _m = $XP(d, '_model');
				var schemaData = _m.getSchemaData();
				var groupLogoImageUrl = $XP(schemaData, 'groupLogoImageUrl', '');
				return IX.inherit(schemaData, {
					clz : '',
					href : HP.createPath('brand', [self.curCycleType, $XP(schemaData, 'groupID'), '', '']),
					logo : IX.isEmpty(groupLogoImageUrl) ? 
						Hualala.Global.getDefaultImage("blank") :
						Hualala.Common.getSourceImage(groupLogoImageUrl, {
							width : 40,
							height : 40,
							quality : 50
						})
				});
			});
			return {
				clz : listClz,
				items : items
			}
		},
		render : function () {
			var self = this;
			var listTpl = self.get('listTpl');
			var renderData = self.mapContentData(self.model.getCurrentData());
			var htm = listTpl(renderData);
			self.$curCnt = self.container.find('#' + self.curCycleType);
			self.$curCnt.empty().html(htm);
		},
		bindEvent : function () {
			var self = this;
			self.container.on('click', '.segmented-control .control-item', function (e) {
				var $btn = $(this),
					cycleType = $btn.attr('href').slice(1);
				self.curCycleType = cycleType;
				self.emit('switchCycle');
			});
		}
	});

	HB.BrandListView = BrandListView;
})(jQuery, window);
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
					self.model.load(function (res) {
						self.view.emit('render');
					}, function (res) {
						// TODO fail handle
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
(function ($, window) {
	IX.ns("Hualala.Brand");
	var HB = Hualala.Brand;
	var HP = Hualala.PageRoute;
	var HT = Hualala.TypeDef;
	var HU = Hualala.UI;
	var HC = Hualala.Constants;
	var HCOM = Hualala.Common;
	var hbr = Handlebars,
		TplLib = Hualala.TplLib;
	var CycleTypes = HT.CycleTypes;
	
	var BrandDetailView = Stapes.subclass({
		constructor : function (cfg) {
			this.container = null;
			this.model = null;
			this.loadTemplates();
			this.curCycleType = null;
			this.curGroupIDLst = null;
			this.curShopIDLst = null;
			this.curCityIDLst = null;
			this.curDateList = null;
			this.$curCnt = null;
		}
	});
	BrandDetailView.proto({
		init : function (cfg) {
			this.container = $XP(cfg, 'container', null);
			this.model = $XP(cfg, 'model', null);
			var _p = this.model.getQueryParams();
			var pageCtx = HP.getPageContextByPath();
			if (!this.container || !this.model) {
				throw("Brand Detail view init failed!!");
			}

			this.curCycleType = pageCtx.params[0] || $XP(_p, 'cycleType', 'day');
			this.curGroupIDLst = pageCtx.params[1] || $XP(_p, 'groupIDLst', '');
			this.curCityIDLst = pageCtx.params[2] || '';
			this.curShopIDLst = pageCtx.params[3] || $XP(_p, 'shopIDLst', '');

			// this.curCycleType = $XP(_p, 'cycleType', 'day');
			// this.curGroupIDLst = $XP(_p, 'groupIDLst', '');
			// this.curShopIDLst = $XP(_p, 'shopIDLst', '');
			// this.curCityIDLst = $XP(_p, 'cityIDLst', '');
			this.initLayout();
		},
		loadTemplates : function () {
			var layoutTpl = hbr.compile(TplLib.get('tpl_page_layout'));
			var filterBarTpl = hbr.compile(TplLib.get('tpl_filter_toolbar'));
			var cntTpl = hbr.compile(TplLib.get('tpl_statistic_table'));

			hbr.registerPartial("appBar", TplLib.get('tpl_app_bar'));
			hbr.registerPartial("iconBtn", TplLib.get('tpl_icon_btn'));
			hbr.registerPartial("commonBtn", TplLib.get('tpl_common_btn'));

			hbr.registerPartial("commonCol", TplLib.get('tpl_tblcell_common'));
			hbr.registerPartial("chartCol", TplLib.get('tpl_tblcell_chart'));
			hbr.registerPartial("listCol", TplLib.get('tpl_tblcell_list'));

			hbr.registerHelper('chkRowType', function (conditional, options) {
				return (conditional == options.hash.type) ? options.fn(this) : options.inverse(this);
			});

			this.set({
				layoutTpl : layoutTpl,
				filterBarTpl : filterBarTpl,
				cntTpl : cntTpl
			});
		},
		mapAppBarData : function () {
			var self = this;
			var parentNames = HP.getParentNamesByPath();
			return {
				clz : '',
				iconBtn : {
					items : [
						{
							clz : 'icon-person pull-right',
							label : '个人信息',
							href : HP.createPath('aboutme')
						},
						{
							clz : 'icon-left-nav pull-left',
							label : '返回',
							href : HP.createPath($XP(parentNames[0], 'name', 'main'), [self.curCycleType])
						}
					]
				},
				title : "老板通"
			};
		},
		mapFilterBarData : function (cities) {
			var self = this;
			var fields = HT.FilterFields;
			var items = _.map(fields, function (el) {
				var k = $XP(el, 'key'), clz = $XP(el, 'clz');
				var label = '', value = '', isShopFilter = false, cityID = '';
				switch(k) {
					case 'groupIDLst':
						value = self.curGroupIDLst || '';
						label = '<img src="' + self.getGroupLogoUrl(value) + '" alt="brand-logo" class="brand-logo" />';
						break;
					case 'shopIDLst':
						cityID = self.curCityIDLst || '';
						value = self.curShopIDLst || '';
						if (IX.isEmpty(cityID) && IX.isEmpty(value)) {
							label = '全部店铺';
						} else if (!IX.isEmpty(cityID) && IX.isEmpty(value)) {
							label = '全部店铺';
							_.each(cities, function (c) {
								var cid = $XP(c, 'cityID'),
									cityName = $XP(c, 'cityName');
								if (cid == cityID) {
									label = cityName + label;
								}
							});
						} else {
							label = '';
							_.each(cities, function (c) {
								var cid = $XP(c, 'cityID'),
									cityName = $XP(c, 'cityName'),
									shops = $XP(c, 'shops', []);
								_.each(shops, function (s) {
									var sid = $XP(s, 'shopID'),
										shopName = $XP(s, 'shopName');
									if (sid == value) {
										label = shopName;
										cityID = cid;
									}
								});
							});
						}
						isShopFilter = true;
						break;
					case 'cycleType':
						value = self.curCycleType || 'day';
						label = $XP(self.getCycleTypeData(self.curCycleType), 'label');
						break;
				}
				return IX.inherit(el, {
					value : value,
					label : label,
					cityID : cityID,
					isShopFilter : isShopFilter
				})
			});
			return {
				items : items
			};
		},
		getCycleTypeData : function (cycleType) {
			var cycles = CycleTypes;
			return _.find(cycles, function (el) {
				return $XP(el, 'value') === cycleType;
			});
		},
		getGroupLogoUrl : function (groupID) {
			var sessionData = Hualala.getSessionData();
			var group = _.find(sessionData, function (g) {
				return $XP(g, 'groupID') === groupID;
			});
			var url = $XP(group, 'groupLogoImageUrl', '');
			url = IX.isEmpty(url) ? Hualala.Global.getDefaultImage("blank") :
				Hualala.Common.getSourceImage(groupLogoImageUrl, {
					width : 40,
					height : 40,
					quality : 50
				});
			return url;
		},
		initLayout : function () {
			var self = this;
			var layoutTpl = this.get('layoutTpl');
			var toolbarTpl = this.get('filterBarTpl');
			var htm = layoutTpl({
				appBar : this.mapAppBarData()
			});
			this.container.html(htm);
			Hualala.ShopManager.getShopDataSetByGroupID(this.curGroupIDLst, function (cities) {
				var htm = toolbarTpl(self.mapFilterBarData(cities));
				self.container.find('.content').html(htm);
				self.bindToolbarEvent();
				self.bindCntEvent();
			});
			
		},
		bindCntEvent : function () {
			var self = this;
			self.container.on('click', '.bi-table > .table-header > .hisdate > .icon', function (e) {
				var $btn = $(this);
				var $date = $btn.parent().find('.date');
				var hisDateList = self.curDateList.slice(1);
				var hisDateStr = '';
				var act = $btn.hasClass('icon-left') ? -1 : 1;
				e.preventDefault();
				var $firstRow = self.container.find('.bi-table > .table-body > a.table-row:first-child');
				var $rows = self.container.find('.bi-table > .table-body > a.table-row');
				var $hisCols = $firstRow.find('.table-cell.hisdate');
				var hisShowIdx = -1;
				var $hisShowCol = $hisCols.filter(function (i, el) {
					var ret = !$(el).hasClass('hidden');
					if (ret == true) {
						hisShowIdx = i;
					}
					return ret;
				});
				hisShowIdx = hisShowIdx + act;
				if (hisShowIdx < 0) {
					hisShowIdx = 0;
				} else if (hisShowIdx >= ($hisCols.length - 1)) {
					hisShowIdx = $hisCols.length - 1;
				}
				$rows.each(function (i, row) {
					var $row = $(row);
					var $hisCols = $row.find('.table-cell.hisdate');
					$hisCols.addClass('hidden');
					$hisCols.eq(hisShowIdx).removeClass('hidden');
				});
				hisDateStr = hisDateList[hisShowIdx] + '(' + hisShowIdx + ')';
				$date.html(hisDateStr);
			});
			
		},
		setNavBtnHref : function () {
			var self = this;
			var parentNames = HP.getParentNamesByPath();
			var curPageName = $XP(HP.getPageContextByPath(), 'name');
			var idx = -1;
			_.find(parentNames, function (el, i) {
				var isTrue = el.name == curPageName;
				if (isTrue) {
					idx = i;
				}
				return isTrue;
			});
			idx -= 1;
			var parentPageName = idx < 0 ? 'main' : $XP(parentNames[idx], 'name', '');
			var params = parentPageName == 'main' ? [self.curCycleType] :
				[self.curCycleType, self.curGroupIDLst, self.curCityIDLst, self.curShopIDLst];
			var href = HP.createPath(parentPageName, params);
			$('header.bi-bar').find('.icon-left-nav').attr('href', href);
		},
		resetShopFilter : function () {
			var self = this;
			var $filter = self.container.find('.filter-item[data-key="shopIDLst"]');
			$filter.attr('data-shopid', self.curShopIDLst).attr('data-cityid', self.curCityIDLst).find('.filter-shop').html('全部店铺');

		},
		bindToolbarEvent : function () {
			var self = this;
			
			self.container.find('.filter-item').dropdown({
				parentSelector : '.bi-toolbar'
			});
			self.container.find('.bi-toolbar').on('show.ra.dropdown', function (e) {
				var $tar = $(e.relatedTarget),
					key = $tar.attr('data-key'),
					val = $tar.attr('data-value') || '';
				var $this = $(this);
				var dropdownList = null;
				switch (key) {
					case "groupIDLst":
						dropdownList = new HU.GroupDropList({
							container : $this.find('.dropdown-menu'),
							targetEl : $tar,
							selectFn : function ($tar) {
								self.curGroupIDLst = $tar.attr('data-value');
								self.emit('switchBrand');
								self.setNavBtnHref();
							}
						});
						break;
					case "shopIDLst":
						dropdownList = new HU.ShopDropList({
							container : $this.find('.dropdown-menu'),
							groupID : self.curGroupIDLst,
							targetEl : $tar,
							selectFn : function ($tar) {
								self.emit('switchShop', {
									cityID : $tar.attr('data-cityid'),
									shopID : $tar.attr('data-shopid')
								});
								self.setNavBtnHref();
							}
						});
						break;
					case "cycleType":
						dropdownList = new HU.CycleDropList({
							container : $this.find('.dropdown-menu'),
							targetEl : $tar,
							selectFn : function ($tar) {
								self.curCycleType = $tar.attr('data-value') || 'day';
								self.emit('switchCycle');
								self.setNavBtnHref();
							}
						});
						break;
				}
			});
		},
		mapDateList : function (datas) {
			var self = this;
			var cycleType = self.curCycleType;
			return _.map(datas, function (d) {
				var reportDate = $XP(d, 'reportDate', '');
				switch (cycleType) {
					case 'day':
						reportDate = reportDate.split('-');
						reportDate = _.map(reportDate, function (v) {
							var _v = HCOM.formatDateTimeValue(v);
							var _w = HC.NameOfDay[new Date(_v).getDay()];
							return IX.Date.getDateByFormat(_v, 'MM.dd') + '(' + _w + ')';
						});
						reportDate = reportDate[0];
						break;
					case 'week':
						reportDate = reportDate.split('-');
						reportDate = _.map(reportDate, function (v) {
							var _v = HCOM.formatDateTimeValue(v);
							return IX.Date.getDateByFormat(_v, 'MM.dd');
						});
						reportDate = reportDate.join('-');
						break;
					case 'month':
						reportDate = reportDate.split('-');
						reportDate = _.map(reportDate, function (v) {
							var _v = HCOM.formatDateTimeValue(v);
							return IX.Date.getDateByFormat(_v, 'YYYY.MM');
						});
						reportDate = reportDate[0];
						break;
					case 'quarter':
						reportDate = reportDate.split('-');
						reportDate = _.map(reportDate, function (v) {
							var _v = HCOM.formatDateTimeValue(v);
							return IX.Date.getDateByFormat(_v, 'YYYY.MM');
						});
						reportDate = reportDate.join('-');
						break;
				}
				return reportDate;
			});
		},
		mapHeaderData : function (data) {
			var self = this;
			var cycleType = self.curCycleType;
			var dateList = [];
			var curData = $XP(data, 'curData', []),
				hisData = $XP(data, 'hisData', []);
			hisData = _.find(hisData, function (el) {
				return self.curGroupIDLst == $XP(el, 'groupID');
			});
			hisData = $XP(hisData, 'data', []);
			curData = _.map(curData, function (el) {
				var _m = $XP(el, '_model');
				return _m.getDetailData();
			});
			hisData = _.map(hisData, function (el) {
				var _m = $XP(el, '_model');
				return _m.getDetailData();
			});
			// dateList = _.map(curData.concat(hisData), function (d) {
			// 	var reportDate = $XP(d, 'reportDate', '');
			// 	switch (cycleType) {
			// 		case 'day':
			// 			reportDate = reportDate.split('-');
			// 			reportDate = _.map(reportDate, function (v) {
			// 				var _v = HCOM.formatDateTimeValue(v);
			// 				var _w = HC.NameOfDay[new Date(_v).getDay()];
			// 				return IX.Date.getDateByFormat(_v, 'MM.dd') + '(' + _w + ')';
			// 			});
			// 			reportDate = reportDate[0];
			// 			break;
			// 		case 'week':
			// 			reportDate = reportDate.split('-');
			// 			reportDate = _.map(reportDate, function (v) {
			// 				var _v = HCOM.formatDateTimeValue(v);
			// 				return IX.Date.getDateByFormat(_v, 'MM.dd');
			// 			});
			// 			reportDate = reportDate.join('-');
			// 			break;
			// 		case 'month':
			// 			reportDate = reportDate.split('-');
			// 			reportDate = _.map(reportDate, function (v) {
			// 				var _v = HCOM.formatDateTimeValue(v);
			// 				return IX.Date.getDateByFormat(_v, 'YYYY.MM');
			// 			});
			// 			reportDate = reportDate[0];
			// 			break;
			// 		case 'quarter':
			// 			reportDate = reportDate.split('-');
			// 			reportDate = _.map(reportDate, function (v) {
			// 				var _v = HCOM.formatDateTimeValue(v);
			// 				return IX.Date.getDateByFormat(_v, 'YYYY.MM');
			// 			});
			// 			reportDate = reportDate.join('-');
			// 			break;
			// 	}
			// 	return reportDate;
			// });
			dateList = self.mapDateList(curData.concat(hisData));

			self.curDateList = dateList;
			var header = _.map(dateList.slice(0, 2), function (v, i) {
				var isHistory = i == 0 ? false : true;
				var btns = null;
				return IX.inherit({
					dateStr : v,
					clz : isHistory ? 'hisdate' : 'curdate',
					isHistory : isHistory
				}, (isHistory ? {
					iconBtn : {
						items : [
							{clz : 'icon-left pull-left', href : '', label : '向前'},
							{clz : 'icon-right pull-right', href : '', label : '先后'}
						]
					}
				} : {}));
			});
			return header;
		},
		mapCommonColData : function (row, colData) {
			var self = this;
			var label = $XP(row, 'label', ''),
				type = $XP(row, 'type', ''),
				keys = $XP(row, 'keys', ''),
				chartType = $XP(row, 'chartType', ''),
				unCheckoutLabel = $XP(row, 'unCheckoutLabel', null);
			var hasUncheckout = IX.isEmpty(unCheckoutLabel) ? false : true;
			var cols = _.map(colData, function (col, i) {
				var isCurCol = i == 0 ? true : false;
				var hidden = i > 1 ? 'hidden' : '';
				
				var _col = IX.inherit({
					clz : (isCurCol ? 'curdate' : 'hisdate'),
					label : label,
					hasUncheckout : hasUncheckout,
					hidden : hidden
				}, (hasUncheckout ? {
					unCheckoutLabel : unCheckoutLabel
				} : {}));
				_.each(keys.split(','), function (key) {
					var val = $XP(col, key);
					switch(key) {
						case "groupID":
						case "waitCheckoutOrderAmountTotal":
							_col[key] = val;
							break;
						case "personUnit":
						case "orderUnit":
						case "cashUnit":
							_col['unit'] = val;
							break;
						default : 
							_col['value'] = val;
							break;
					}
				});
				return _col;
			});
			return cols;
		},
		mapChartColData : function (row, colData) {
			var self = this;
			var label = $XP(row, 'label', ''),
				type = $XP(row, 'type', ''),
				keys = $XP(row, 'keys', '').split(','),
				chartType = $XP(row, 'chartType', '');
			var legends = $XP(row, 'legends');
			var items = $XP(row, 'items', '').split(',');
			var cols = _.map(colData, function (col, i) {
				var isCurCol = i == 0 ? true : false;
				var hidden = i > 1 ? 'hidden' : '';
				var _col = {
					clz : (isCurCol ? 'curdate' : 'hisdate'),
					label : label,
					hidden : hidden,
					items : _.map(items, function (mainKey, j) {
						var o = {
							clz : 'legend',
							iconClz : j == 0 ? 'mainIcon' : 'subIcon'
						};
						var legend = _.find(legends, function (el) {
							return el.key === mainKey;
						});
						o['label'] = $XP(legend, 'label', '');
						_.each(keys.concat([mainKey]), function (k) {
							var val = $XP(col, k);
							switch(k) {
								case "cashUnit":
									o['unit'] = val;
									break;
								case "groupID":
									o[k] = val;
									break;
								default : 
									o['value'] = val;
									break;
							}
						});
						return o;
					})
				};
				return _col;
			});
			return cols;
		},
		mapListColData : function (row, colData) {
			var self = this;
			var label = $XP(row, 'label', ''),
				type = $XP(row, 'type', ''),
				keys = $XP(row, 'keys', ''),
				chartType = $XP(row, 'chartType', '');
			var cols = _.map(colData, function (col, i) {
				var isCurCol = i == 0 ? true : false;
				var hidden = i > 1 ? 'hidden' : '';
				var _col = {
					clz : (isCurCol ? 'curdate' : 'hisdate'),
					label : label,
					hidden : hidden
				};
				_.each(keys.split(','), function (key) {
					var val = $XP(col, key);
					switch(key) {
						case "groupID":
						case "cashUnit":
							_col[key] = val;
							break;
						case "paidAmountPayLst":
							_col['items'] = val;
							break;
					}
				});
				return _col;
			});
			return cols;
		},
		mapRowData : function (data) {
			var self = this;
			var cycleType = self.curCycleType;
			var brandDetailRows = HT.BrandDetailRows;
			var dateList = self.curDateList;
			var curData = $XP(data, 'curData', []),
				hisData = $XP(data, 'hisData', []);
			hisData = _.find(hisData, function (el) {
				return self.curGroupIDLst == $XP(el, 'groupID');
			});
			hisData = $XP(hisData, 'data', []);
			curData = _.map(curData, function (el) {
				var _m = $XP(el, '_model');
				return _m.getDetailData();
			});
			hisData = _.map(hisData, function (el) {
				var _m = $XP(el, '_model');
				return _m.getDetailData();
			});
			var allData = curData.concat(hisData);
			var rows = _.map(brandDetailRows, function (row) {
				var type = $XP(row, 'type');
				var chartType = $XP(row, 'chartType', '');
				var _row = null;
				switch(type) {
					case "common":
						_row = self.mapCommonColData(row, allData);
						break;
					case "chart":
						_row = self.mapChartColData(row, allData);
						break;
					case "list":
						_row = self.mapListColData(row, allData);
						break;
				}
				return {
					chartType : chartType,
					clz : type,
					href : self.getChartPagePath(chartType),
					type : type,
					cols : _row
				};
			});
			return rows;
		},
		mapContentData : function (data) {
			var self = this;
			var header = self.mapHeaderData(data);
			var rows = self.mapRowData(data);
			return {
				header : header,
				rows : rows
			};
		},
		render : function () {
			var self = this;
			var cntTpl = self.get('cntTpl');
			var renderData = self.mapContentData({
				curData : self.model.getCurrentData(self.curGroupIDLst),
				hisData : self.model.getHistoryData(self.curGroupIDLst)
			});
			var htm = cntTpl(renderData);
			self.$curCnt && self.$curCnt.remove();
			self.$curCnt = $(htm).appendTo(self.container.find('.content'));

		},
		getChartPagePath : function (chartType) {
			var self = this;
			return HP.createPath('chart', [self.curCycleType, self.curGroupIDLst, self.curCityIDLst, self.curShopIDLst, chartType, '']);
		}
	});

	HB.BrandDetailView = BrandDetailView;
})(jQuery, window);
(function ($, window) {
	IX.ns("Hualala.Brand");
	var HB = Hualala.Brand;
	var HP = Hualala.PageRoute;
	var HT = Hualala.TypeDef;
	var HU = Hualala.UI;
	var HC = Hualala.Constants;
	var HCOM = Hualala.Common;
	var hbr = Handlebars,
		TplLib = Hualala.TplLib;
	var CycleTypes = HT.CycleTypes;

	var BrandChartView = HB.BrandDetailView.subclass({
		constructor : HB.BrandDetailView.prototype.constructor
	});

	BrandChartView.proto({
		init : function (cfg) {
			this.container = $XP(cfg, 'container', null);
			this.model = $XP(cfg, 'model', null);
			var _p = this.model.getQueryParams();
			var pageCtx = HP.getPageContextByPath();
			if (!this.container || !this.model) {
				throw("Brand Detail view init failed!!");
			}
			this.curCycleType = pageCtx.params[0] || $XP(_p, 'cycleType', 'day');
			this.curGroupIDLst = pageCtx.params[1] || $XP(_p, 'groupIDLst', '');
			this.curCityIDLst = pageCtx.params[2] || '';
			this.curShopIDLst = pageCtx.params[3] || $XP(_p, 'shopIDLst', '');
			this.curIndicatorID = pageCtx.params[4];
			this.chartIndicatorList = _.filter(Hualala.TypeDef.BrandDetailRows, function (el) {
				return el.type != 'list';
			});
			this.initLayout();
		},
		loadTemplates : function () {
			var layoutTpl = hbr.compile(TplLib.get('tpl_page_layout'));
			var filterBarTpl = hbr.compile(TplLib.get('tpl_filter_toolbar'));
			var cntTpl = hbr.compile(TplLib.get('tpl_brand_chart'));

			hbr.registerPartial("appBar", TplLib.get('tpl_app_bar'));
			hbr.registerPartial("iconBtn", TplLib.get('tpl_icon_btn'));
			hbr.registerPartial("commonBtn", TplLib.get('tpl_common_btn'));

			this.set({
				layoutTpl : layoutTpl,
				filterBarTpl : filterBarTpl,
				cntTpl : cntTpl
			});
		},
		getCurIndicatorCfg : function (indicatorID) {
			var self = this,
				curIndicatorCfg = _.find(self.chartIndicatorList, function (el) {return el.chartType == indicatorID; });
			return curIndicatorCfg;
		},
		mapAppBarData : function () {
			var self = this;
			var parentNames = HP.getParentNamesByPath();
			var indicatorID = self.curIndicatorID,
				title = $XP(self.getCurIndicatorCfg(indicatorID), 'label', '');
			return {
				clz : '',
				commonBtn : {
					items : [
						{
							clz : 'btn-link pull-right chart-droplist',
							label : '其他数据'
						}
					]
				},
				iconBtn : {
					items : [
						{
							clz : 'icon-left-nav pull-left',
							label : '返回',
							href : HP.createPath($XP(parentNames[parentNames.length - 2], 'name', 'main'), [self.curCycleType, self.curGroupIDLst, self.curCityIDLst, self.curShopIDLst])
						}
					]
				},
				title : title + "分析图表"
			};
		},
		bindCntEvent : function () {
			// 绑定图表的事件
			var self = this;
			var $header = $('header.bi-bar');
			$header.find('.chart-droplist').attr('data-toggle', 'dropdown').attr('data-value', self.curIndicatorID).dropdown({
				parentSelector : '.bi-bar'
			});
			$header.on('show.ra.dropdown', function (e) {
				var $tar = $(e.relatedTarget);
				var $this = $(this);
				var dropdownList = new HU.ChartDropList({
					container : $this.find('.dropdown-menu'),
					targetEl : $tar,
					selectFn : function ($tar) {
						self.curIndicatorID = $tar.attr('data-value');
						var title = $XP(self.getCurIndicatorCfg(self.curIndicatorID), 'label', '');
						self.emit('switchIndicator');
						$tar.parents('header.bi-bar').find('.title').html(title + '分析图表');
					}
				});
			});
		},
		// 按照页码来转换每页图表的数据
		genChartDataByPage : function (data, indicatorID) {
			var self = this;
			var curChartPageSize = self.curChartPageSize;
			var curData = $XP(data, 'curData', []),
				hisData = $XP(data, 'hisData', []);
			hisData = _.find(hisData, function (el) {
				return self.curGroupIDLst == $XP(el, 'groupID');
			});
			hisData = $XP(hisData, 'data', []);
			var dataList = curData.concat(hisData);
			var labels = self.mapDateList(dataList);
			var indicatorCfg = _.find(self.chartIndicatorList, function (el) {
				return $XP(el, 'chartType') == indicatorID;
			});
			var items = $XP(indicatorCfg, 'items').split(',');
			var type = $XP(indicatorCfg, 'type');
			var total = labels.length,
				pageCount = Math.ceil(total / curChartPageSize);
			var labelList = [], seriesList = [];
			
			for (var i = 0; i < pageCount; i++) {
				var start = i * curChartPageSize, end = (i + 1) * curChartPageSize;
				var _segDataList = dataList.slice(start, end);
				var series = [];
				labelList.push(labels.slice(start, end));
				switch (indicatorID) {
					case "personTotal":
					case "orderCountTotal":
					case "orderAomoutTotal":
					case "paidAmountTotal":
					case "promotionAmountTotal":
					case "personAvg":
					case "orderAvg":
						series = _.map(items, function (c) {
							return {
								fillColor : "rgba(20, 185, 214, 1)",
								strokeColor : "rgba(20, 185, 214, 1)",
								pointColor : "rgba(255, 255, 255, 1)",
								pointStrokeColor : "rgba(255, 255, 255, 1)",
								data : _.map(_segDataList, function (el) {
									return $XP(el, c, 0);
								})
							};
						});
						break;
					case "customStructure":
						series = _.map(items, function (c) {
							var fillColor = c == 'vipOrderAmountTotal' ? 'rgba(31, 187, 166, .5)' : 'rgba(204, 204, 204, .5)';
							var label = c == 'vipOrderAmountTotal' ? '会员' : '非会员';
							return {
								label : label,
								fillColor : fillColor,
								strokeColor : fillColor,
								pointColor : fillColor,
								pointStrokeColor : "rgba(255, 255, 255, 1)",
								pointHighlightFill : "rgba(255, 255, 255, 1)",
								pointHighlightStroke : fillColor,
								data : _.map(_segDataList, function (el) {
									return $XP(el, c, 0)
								})
							};
						});
						break;
					case "orderStructure":
						series = _.map(items, function (c) {
							var fillColor = c == 'untakeawayOrderAmountTotal' ? 'rgba(31, 187, 166, .8)' : 'rgba(204, 204, 204, .8)';
							var label = c == 'untakeawayOrderAmountTotal' ? '堂食' : '外卖';
							return {
								label : label,
								fillColor : fillColor,
								strokeColor : fillColor,
								pointColor : fillColor,
								pointStrokeColor : "rgba(255, 255, 255, 1)",
								pointHighlightFill : "rgba(255, 255, 255, 1)",
								pointHighlightStroke : fillColor,
								data : _.map(_segDataList, function (el) {
									return $XP(el, c, 0)
								})
							};
						});
						break;
				}
				seriesList.push(series);
			}
			return {
				labelList : labelList,
				seriesList : seriesList
			};
		},
		
		mapChartDataByIndicatorID : function (data, indicatorID) {
			var self = this;
			var curData = $XP(data, 'curData', []),
				hisData = $XP(data, 'hisData', []);
			hisData = _.find(hisData, function (el) {
				return self.curGroupIDLst == $XP(el, 'groupID');
			});
			hisData = $XP(hisData, 'data', []);
			var dataList = curData.concat(hisData);
			var series = [];
			var indicatorCfg = _.find(self.chartIndicatorList, function (el) {
				return $XP(el, 'chartType') == indicatorID;
			});
			var items = $XP(indicatorCfg, 'items').split(',');
			var type = $XP(indicatorCfg, 'type');
			switch (indicatorID) {
				case "personTotal":
				case "orderCountTotal":
				case "orderAomoutTotal":
				case "paidAmountTotal":
				case "promotionAmountTotal":
				case "personAvg":
				case "orderAvg":
					series = _.map(items, function (c) {
						return {
							fillColor : "rgba(20, 185, 214, 1)",
							strokeColor : "rgba(20, 185, 214, 1)",
							pointColor : "rgba(255, 255, 255, 1)",
							pointStrokeColor : "rgba(255, 255, 255, 1)",
							data : _.map(dataList, function (el) {
								return $XP(el, c, 0);
							})
						};
					});
					break;
				case "customStructure":
					series = _.map(items, function (c) {
						var fillColor = c == 'vipOrderAmountTotal' ? 'rgba(31, 187, 166, .5)' : 'rgba(204, 204, 204, .5)';
						var label = c == 'vipOrderAmountTotal' ? '会员' : '非会员';
						return {
							label : label,
							fillColor : fillColor,
							strokeColor : fillColor,
							pointColor : fillColor,
							pointStrokeColor : "rgba(255, 255, 255, 1)",
							pointHighlightFill : "rgba(255, 255, 255, 1)",
							pointHighlightStroke : fillColor,
							data : _.map(dataList, function (el) {
								return $XP(el, c, 0)
							})
						};
					});
					break;
				case "orderStructure":
					series = _.map(items, function (c) {
						var fillColor = c == 'untakeawayOrderAmountTotal' ? 'rgba(31, 187, 166, .8)' : 'rgba(204, 204, 204, .8)';
						var label = c == 'untakeawayOrderAmountTotal' ? '堂食' : '外卖';
						return {
							label : label,
							fillColor : fillColor,
							strokeColor : fillColor,
							pointColor : fillColor,
							pointStrokeColor : "rgba(255, 255, 255, 1)",
							pointHighlightFill : "rgba(255, 255, 255, 1)",
							pointHighlightStroke : fillColor,
							data : _.map(dataList, function (el) {
								return $XP(el, c, 0)
							})
						};
					});
					break;
			}
			

			return {
				labels : _.map(self.mapDateList(curData.concat(hisData)), function (el, i) {
							return el;
						}),
				datasets : series
			};
		},
		mapContentData : function (data) {
			// TODO 组织图表所需要的数据点
			var self = this;
			self.curChartPage = 0;
			self.curChartPageSize = 7;
			// self.curChartData = self.mapChartDataByIndicatorID(data, self.curIndicatorID);
			self.curChartData = self.genChartDataByPage(data, self.curIndicatorID);
			
			return {
				clz : 'chart'
			};
		},
		getScaleCfg : function () {
			var self = this;
			var chartData = self.curChartData,
				labels = $XP(chartData, 'labels', []),
				datasets = $XP(chartData, 'datasets', []);
			var datalist = [];
			_.each(datasets, function (dataset) {
				datalist = datalist.concat(dataset.data);
			});
			var maxVal = _.max(datalist, function (el) {return parseFloat(el);}),
				minVal = _.max(datalist, function (el) {return parseFloat(el);});

			var scaleSteps = 10;
			var dlta = maxVal - minVal,
				avg = parseInt(dlta / 10);
			var scaleStepWidth = dlta == 0 ? minVal : avg;
			var scaleStartValue = dlta == 0 ? 0 : minVal;
			return {
				responsive : true,
				scaleOverlay : true,
				// scaleOverride : true,
				// scaleSteps : scaleSteps,
				// scaleStepWidth : scaleStepWidth,
				// scaleStartValue : scaleStartValue,
				scaleFontFamily : "'Microsoft Yahei'",
				scaleFontSize : 12,
				scaleFontColor : 'rgb(145,165,183)',
				scaleShowGridLines : true,
				scaleGridLinesColor : "rgba(103,112,124, 1)",
				pointDotRadius : 5,
				onAnimationComplete : function () {
					console.info(arguments);
				},
				tooltipTitleFontStyle : 'bold',
				multiTooltipTemplate : '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>',
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

			};
			
			 
		},
		drawChart : function () {
			var self = this;
			var $chartList = self.$curCnt.find('.chart-list');
			var curChartData = self.curChartData;
			var labelList = $XP(curChartData, 'labelList', []),
				seriesList = $XP(curChartData, 'seriesList', []);
			var viewWidth = self.$curCnt.width(),
				viewHeight = self.$curCnt.height() * 0.8;
			var pageCount = labelList.length;
			
			_.each(labelList, function (labels, pIdx) {
				var series = seriesList[pIdx];
				var $canvas = $('<canvas class="chart-canvas pull-left"></canvas>');
				$canvas.attr('width', viewWidth);
				$canvas.attr('height', viewHeight);
				$canvas.css({
					'width' : viewWidth + 'px',
					'height' : viewHeight + 'px',
					'left' : (pIdx * 100) + '%'
				});

				$canvas.appendTo($chartList);
				var ctx = $canvas[0].getContext("2d");
				var chart = new Chart(ctx).Line({
					// labels : labels,
					labels : _.map(labels, function (el) { return el + '(' + pIdx + ')'}),
					datasets : series
				}, {
					responsive : true,
					scaleOverlay : true,
					scaleFontFamily : "'Microsoft Yahei'",
					scaleFontSize : 12,
					scaleFontColor : 'rgb(145,165,183)',
					scaleShowGridLines : true,
					scaleGridLinesColor : "rgba(103,112,124, 1)",
					pointDotRadius : 5,
					onAnimationComplete : function () {
						console.info(arguments);
					},
					tooltipTitleFontStyle : 'bold',
					multiTooltipTemplate : '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>',
					legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
				});
				$canvas.data('data.chart', chart);

			});
			$chartList.css({
				width : pageCount * viewWidth + 'px',
				height : viewHeight + 'px'
			});

			var startPercent = 0,
				movePercent = 0,
				preventSlide = false,
				$pages = $chartList.find('.chart-canvas');

			$chartList.find('.chart-canvas').unbind('touchy-drag').bind('touchy-drag', function (e, phase, $target, data) {
				if (!preventSlide) {
					var bodyWidth = self.$curCnt.width(),
						xDelta = data.movePoint.x - data.lastMovePoint.x,
						newMovePercent = movePercent + (xDelta / bodyWidth);
					if (phase === 'move') {
						if (newMovePercent < 0 && newMovePercent > (1 - $pages.length)) {
							movePercent = newMovePercent;
							$chartList.css({
								'WebkitTransition' : 'none',
								'WebkitTransform' : 'translate3d(' + (movePercent * 100) + '%, 0, 0'
							});
						}
					} else if (phase === 'end' && movePercent !== startPercent) {
						if (data.velocity > 1.7) {
							movePercent = movePercent > startPercent ? startPercent + 1 : startPercent - 1
							slide();
						} else {
							movePercent = Math.round(movePercent);
							slide();
						}
					}
				}
			})
			

			var slide = function () {
				preventSlide = true;
				setTimeout(function () {preventSlide = false}, 400);
				$chartList.css({
					'WebkitTransition':'-webkit-transform 0.4s cubic-bezier(1.0, 0.0, 1.0, 1.0)',
					'WebkitTransform':'translate3d(' + (movePercent * 100) + '%,0,0)'
				});
				startPercent = movePercent;
			};
		}
	});

	HB.BrandChartView = BrandChartView;
})(jQuery, window);
(function ($, window) {
	IX.ns("Hualala.Brand");
	var HB = Hualala.Brand,
		HP = Hualala.PageRoute;

	var BrandDetailController = HB.BrandListController.subclass({
		constructor : function (cfg) {
			this.container = $XP(cfg, 'container', null);
			this.view = $XP(cfg, 'view', null);
			this.model = $XP(cfg, 'model', null);
			if (!this.container || !this.view || !this.model) {
				throw("Brand Detail Controller build failed!");
			}
			
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
				},
				switchBrand : function () {
					var self = this;
					var params = self.model.getQueryParams();
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
					}, function (res) {

					});
				},
				switchShop : function (opts) {
					var self = this;
					var params = self.model.getQueryParams();
					var cityID = $XP(opts, 'cityID'),
						shopID = $XP(opts, 'shopID');
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
					
					self.model.load(function (res) {
						self.view.emit('render');
					}, function (res) {

					});

				},
				resetShopFilter : function () {
					var self = this;

				}
			}, this);
		},
		bindModelEvent : function () {

		}
	});
	
	HB.BrandDetailController = BrandDetailController;

	var BrandChartController = HB.BrandDetailController.subclass({
		constructor : HB.BrandDetailController.prototype.constructor
	});
	BrandChartController.proto({
		bindViewEvent : function () {
			this.view.on({
				render : function () {
					var self = this;
					self.view.render();
					self.view.drawChart();
					self.view.setNavBtnHref();
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
				},
				switchBrand : function () {
					var self = this;
					var params = self.model.getQueryParams();
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
					}, function (res) {

					});
				},
				switchShop : function (opts) {
					var self = this;
					var params = self.model.getQueryParams();
					var cityID = $XP(opts, 'cityID'),
						shopID = $XP(opts, 'shopID');
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
					}, function (res) {

					});

				},
				switchIndicator : function () {
					var self = this;
					self.view.emit('render');
				}
			}, this);
		}
	});

	HB.BrandChartController = BrandChartController;

})(jQuery, window);
(function ($, window) {
	IX.ns("Hualala");

	var sessionData = null;
	// 获取Session Data
	Hualala.getSessionData = function () {return sessionData;};
	// 判断指定用户是否为当前登录用户
	Hualala.isSessionUser = function (groupLoginName, loginName) {
		return _.find(sessionData, function (grp) {
			return ($XP(grp, 'groupLoginName') === groupLoginName) && $XP(grp, 'loginName') === loginName;
		});
	};

	function loadSession(appData, cbFn) {
		sessionData = appData;
		cbFn();
	}

	function initMainPage(cbFn) {
		var tick = IX.getTimeInMS();
		var HPR = Hualala.PageRoute;
		log("BI Sys Init : " + tick);
		Hualala.Global.loadAppData({}, function (appData) {
			log("Load BI APP Data in (ms): " + (IX.getTimeInMS() - tick));
			if ($XP(appData, 'resultcode') != 0) {
				HPR.jumpPage(HPR.createPath('login'));
				log("Session Data Load Faild!! resultcode = " + $XP(appData, "resultcode", "") + "; resultMsg = " + $XP(appData, 'resultmsg', ''));
			}
			loadSession($XP(appData, 'data', {}), function () {
				log("Merchant Sys INIT DONE in (ms): " + (IX.getTimeInMS() - tick));
				cbFn();
			});
		}, function () {
			HPR.jumpPage(HPR.createPath('login'));
		});
	}

	function initRouteEngine () {
		if (!IX.nsExisted("Hualala.ajaxEngine.init")) return;
		$.ajaxSetup({
			beforeSend : function (xhr) {
				xhr.setRequestHeader('X-CSRF-Token', $('meta[name="csrf-token"]').attr('content'));
			}
		});
		Hualala.ajaxEngine.init({
			ajaxFn : $.ajax,
			baseUrl : Hualala.Global.HOME,
			commonUrl : Hualala.Global.CommonSite,
			imgUrl : Hualala.Global.IMAGE_ROOT
		});
	};

	/**
	 * 老板通APP加载入口
	 * 
	 * @return {NULL}
	 */
	var APPInitialized = false, currentType = null;
	Hualala.init = function () {
		if (!APPInitialized) {
			initRouteEngine();
			Hualala.PageRoute.start(function (pageName, pageParams, pageInitFn) {
				initMainPage(function () {
					// Hualala.Common.initPageLayout({}, pageName);
					if (!Hualala.ShopManager) {
						Hualala.ShopManager = new Hualala.Model.ShopModel();
					}
					pageInitFn && pageInitFn.apply(null, [pageName, pageParams]);
				});
			});
			APPInitialized = true;
		}
	};

	window.addEventListener('push', function () {
		console.info("run push event callback");
	});
})(jQuery, window);