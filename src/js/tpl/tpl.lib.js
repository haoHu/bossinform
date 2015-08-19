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

	// Site confirm template
	var tpl_site_confirm = [
		'<div class="site-mask {{clz}}">',
			'<div id="site_confirm_{{id}}" class="site-confirm alert fade in ">',
				'<header class="">',
					'<h4>{{{title}}}</h4>',
				'</header>',
				'<div class="">',
					'<p>{{{msg}}}</p>',
				'</div>',
				'<footer class="row">',
					'<div class="col-xs-6">',
						'<button class="btn btn-default btn-block" act="cancel">{{{cancelLabel}}}</button>',
					'</div>',
					'<div class="col-xs-6">',
						'<button class="btn btn-success btn-block" act="ok">{{{okLabel}}}</button>',
					'</div>',
				'</footer>',
			'</div>',
		'</div>'
	].join('');
	TemplateList.register("tpl_site_confirm", tpl_site_confirm);

	// Site Loading Mask template
	var tpl_site_loadingmask = [
		'<div id="site_mask_{{id}}" class="site-mask {{clz}}">',
			'<div class="mask-box">',
				'<div class="animate-loading">',
				'</div>',
				'<p class="mask-msg">{{{msg}}}</p>',
			'</div>',
		'</div>'
	].join('');
	TemplateList.register("tpl_site_loadingmask", tpl_site_loadingmask);

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
			'{{#if leftIconClz}}',
				'<span class="icon {{leftIconClz}}"></span>',
			'{{/if}}',
			'{{label}}',
			'{{#if rightIconClz}}',
				'<span class="icon {{rightIconClz}}"></span>',
			'{{/if}}',
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
					'<a class="control-item {{active}} {{clz}}" data-href="segmented" data-tag="#{{id}}" href="#{{id}}">',
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
									'<label for="{{id}}">{{label}}</label>',
									'<input type="{{type}}" placeholder="{{placeholder}}" name="{{name}}" data-key="{{key}}" id="{{id}}" />',
								'</div>',
							'{{/each}}',
							'<button class="btn btn-positive btn-block subBtn " >',
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
					'<a class="navigate-right" href="{{href}}" data-transition="fade" data-href="push" data-item-id="{{groupID}}">',
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

	var tpl_statistic_header = [
		'<div class="table-header">',
			'{{#each header}}',
				'<div class="table-cell {{clz}}">',
					'<div class="flex">',
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
				'</div>',
			'{{/each}}',
		'</div>',
	].join('');
	TemplateList.register("tpl_statistic_header", tpl_statistic_header);

	// 统计数据报表
	var tpl_statistic_table = [
		'<div class="bi-table">',
			// '<div class="table-header">',
			// 	'{{#each header}}',
			// 		'<div class="table-cell {{clz}}">',
			// 			'<div class="flex">',
			// 				'{{#if isHistory}}',
			// 					'{{#with iconBtn}}',
			// 						'{{#each items}}',
			// 							'{{> iconBtn}}',
			// 						'{{/each}}',
			// 					'{{/with}}',
			// 				'{{/if}}',
			// 				'<span class="date">',
			// 					'{{{dateStr}}}',
			// 				'</span>',
			// 			'</div>',
			// 		'</div>',
			// 	'{{/each}}',
			// '</div>',
			'<div class="table-body">',
				'{{#each rows}}',
					'<a class="table-row {{clz}}"  data-charttype="{{chartType}}" href="{{href}}" data-transition="fade" data-href="push">',
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
				'<span class="table-cell unit">{{{waitCheckoutOrderUnit}}}</span>',
			'</div>',
		'{{/if}}'
	].join('');
	TemplateList.register("tpl_tblcell_common", tpl_tblcell_common);

	var tpl_tblcell_chart = [	
		'<div class="">',
			'<h5 class="label">{{label}}</h5>',
			'<div class="chart-canvas">',
			'</div>',
			'{{#each items}}',
			'<div class="table-row chart-legend {{clz}}" data-label="{{label}}" data-value="{{value}}" data-bg="{{bgColor}}">',
				'<span class="table-cell label">',
					'<span class="legend-icon {{iconClz}}"></span>',
					'<span>{{{label}}}</span>',
				'</span>',
				'<span class="table-cell num">{{{shortyValue}}}</span>',
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
					'<span class="num" data-value="{{payAmount}}">',
						'{{{value}}}',
					'</span>',
					'<span class="unit" data-unit="{{../cashUnit}}">',
						'{{{unit}}}',
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

	var tpl_profile_form = [
		'<div class="card">',
			'<form class="input-group {{clz}}">',
			'{{#each items}}',
				'{{#chkFormElementType type type="text"}}',
				'<div class="form-control input-row">',
					'<label>{{{label}}}</label>',
					'<input type="{{type}}" name="{{name}}" readonly="{{readonly}}" data-key="{{key}}" id="{{id}}" value="{{value}}" />',
				'</div>',
				'{{/chkFormElementType}}',
				'{{#chkFormElementType type type="password"}}',
				'<div class="form-control input-row">',
					'<label>{{{label}}}</label>',
					'<input type="{{type}}" name="{{name}}" readonly="{{readonly}}" data-key="{{key}}" id="{{id}}" value="{{value}}" />',
				'</div>',
				'{{/chkFormElementType}}',
				'{{#chkFormElementType type type="static"}}',
				'<div class="form-control input-row">',
					'<label>{{{label}}}</label>',
					'<span type="{{type}}" name="{{name}}" readonly="{{readonly}}" data-key="{{key}}" id="{{id}}" data-value="{{value}}" >{{{dispVal}}}</span>',
				'</div>',
				'{{/chkFormElementType}}',
			'{{/each}}',
			'</form>',
			'{{#with btn}}',
				'<button class="btn btn-block {{clz}}" {{disabled}} data-act="{{act}}">{{{label}}}</button>',
			'{{/with}}',
		'</div>'
	].join('');
	TemplateList.register('tpl_profile_form', tpl_profile_form);


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