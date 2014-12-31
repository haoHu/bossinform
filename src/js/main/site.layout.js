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
		// $wrapper.html([
		// 	'<header class="bar bar-nav bi-bar">',
		// 		'<a class="icon icon-person pull-right" href="/#login" data-transition="slide-in" data-href="push"></a>',
		// 		'<h1 class="title">老板通</h1>',
		// 	'</header>',
		// 	'<div class="content">',
		// 		'<div class="segmented-control">',
		// 			'<a class="control-item active" href="#day" data-href="segmented">',
		// 				'日',
		// 			'</a>',
		// 			'<a class="control-item " href="#week" data-href="segmented">',
		// 				'周',
		// 			'</a>',
		// 			'<a class="control-item " href="#month" data-href="segmented">',
		// 				'月',
		// 			'</a>',
		// 			'<a class="control-item " href="#quarter" data-href="segmented">',
		// 				'季',
		// 			'</a>',
		// 		'</div>',
		// 		'<div id="day" class="control-content active">',
		// 			'<ul class="table-view brand-list">',
		// 				'<li class="table-view-cell brand-item">',
		// 					'<a class="navigate-right" href="/#brand/chart/cy/g/c/s/oi/d" data-transition="slide-in" data-href="push">',
		// 						'<div class="row">',
		// 							'<div class="col-xs-3">',
		// 								'<img src="" alt="brand-logo" class="brand-logo" />',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">80000</span>',
		// 								'<span class="unit">人</span>',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">50000</span>',
		// 								'<span class="unit">单</span>',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">9000</span>',
		// 								'<span class="unit">元</span>',
		// 							'</div>',
		// 						'</div>',
		// 					'</a>',
		// 				'</li>',
		// 			'</ul>',
		// 		'</div>',
		// 		'<div id="week" class="control-content ">',
		// 			'<ul class="table-view brand-list">',
		// 				'<li class="table-view-cell brand-item">',
		// 					'<a class="navigate-right" href="/#brand/chart/cy/g/c/s/oi/d" data-transition="slide-in" data-href="push">',
		// 						'<div class="row">',
		// 							'<div class="col-xs-3">',
		// 								'<img src="" alt="brand-logo" class="brand-logo" />',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">80000</span>',
		// 								'<span class="unit">人</span>',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">50000</span>',
		// 								'<span class="unit">单</span>',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">800006</span>',
		// 								'<span class="unit">元</span>',
		// 							'</div>',
		// 						'</div>',
		// 					'</a>',
		// 				'</li>',
		// 			'</ul>',
		// 		'</div>',
		// 		'<div id="month" class="control-content ">',
		// 			'<ul class="table-view brand-list">',
		// 				'<li class="table-view-cell brand-item">',
		// 					'<a class="navigate-right" href="/#brand/chart/cy/g/c/s/oi/d" data-transition="slide-in" data-href="push">',
		// 						'<div class="row">',
		// 							'<div class="col-xs-3">',
		// 								'<img src="" alt="brand-logo" class="brand-logo" />',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">80000</span>',
		// 								'<span class="unit">人</span>',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">50000</span>',
		// 								'<span class="unit">单</span>',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">800007</span>',
		// 								'<span class="unit">元</span>',
		// 							'</div>',
		// 						'</div>',
		// 					'</a>',
		// 				'</li>',
		// 			'</ul>',
		// 		'</div>',
		// 		'<div id="quarter" class="control-content ">',
		// 			'<ul class="table-view brand-list">',
		// 				'<li class="table-view-cell brand-item">',
		// 					'<a class="navigate-right" href="/#brand/chart/cy/g/c/s/oi/d" data-transition="slide-in" data-href="push">',
		// 						'<div class="row">',
		// 							'<div class="col-xs-3">',
		// 								'<img src="" alt="brand-logo" class="brand-logo" />',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">80000</span>',
		// 								'<span class="unit">人</span>',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">50000</span>',
		// 								'<span class="unit">单</span>',
		// 							'</div>',
		// 							'<div class="col-xs-3">',
		// 								'<span class="price">800008</span>',
		// 								'<span class="unit">元</span>',
		// 							'</div>',
		// 						'</div>',
		// 					'</a>',
		// 				'</li>',
		// 			'</ul>',
		// 		'</div>',
		// 	'</div>'
		// ].join(''));
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
		// $wrapper.html([
		// 	'<header class="bar bar-nav bi-nav">',
		// 		'<a class="icon icon-person pull-right" href="/#login" data-transition="slide-in" data-href="push"></a>',
		// 		'<a class="icon icon-left-nav pull-left" href="/#schema/cy" data-transition="slide-out" data-href="push"></a>',
		// 		'<h1 class="title">老板通</h1>',
		// 	'</header>',
		// 	'<div class="content">',
		// 		'<div class="segmented-control">',
		// 			'<a class="control-item active" href="#brand" data-href="segmented">',
		// 				'品牌',
		// 				'<span class="icon icon-down pull-right"></span>',
		// 			'</a>',
		// 			'<a class="control-item " href="#shop" data-href="segmented">',
		// 				'全部店铺',
		// 				'<span class="icon icon-down pull-right"></span>',
		// 			'</a>',
		// 			'<a class="control-item " href="#cycle" data-href="segmented">',
		// 				'周期',
		// 				'<span class="icon icon-down pull-right"></span>',
		// 			'</a>',
		// 		'</div>',
		// 		'<div id="brand" class="control-content popover">',
		// 			'<header class="bar bar-nav">',
		// 				'<h1 class="title">请选择品牌</h1>',
		// 			'</header>',
		// 		'</div>',
		// 		'<div id="shop" class="control-content popover">',
		// 			'<header class="bar bar-nav">',
		// 				'<h1 class="title">请选择城市|店铺</h1>',
		// 			'</header>',
		// 		'</div>',
		// 		'<div id="cycle" class="control-content popover">',
		// 			'<header class="bar bar-nav">',
		// 				'<h1 class="title">请选择周期</h1>',
		// 			'</header>',
		// 		'</div>',
		// 	'</div>'
		// ].join(''));
		// $wrapper.html([
		// 	'<header class="bar bar-nav bi-bar">',
		// 		'<a class="icon icon-person pull-right" href="/#login" data-transition="slide-in" data-href="push"></a>',
		// 		'<a class="icon icon-left-nav pull-left" href="/#schema/cy" data-transition="slide-out" data-href="push"></a>',
		// 		'<h1 class="title">老板通</h1>',
		// 	'</header>',
		// 	'<div class="content">',
		// 		'<div class="bi-filter">',
		// 			'<a class="filter-item active" href="#brand" data-href="">',
		// 				'<div class="item-label">',
		// 					'<span class="label pull-left"><img src="" class="brand-logo" /></span>',
		// 					'<span class="icon icon-down pull-right"></span>',
		// 				'</div>',
						
		// 			'</a>',
		// 			'<a class="filter-item active" href="#brand" data-href="">',
		// 				'<div class="item-label">',
		// 					'<span class="label">全部店铺</span>',
		// 					'<span class="icon icon-down pull-right"></span>',
		// 				'</div>',
						
		// 			'</a>',
		// 			'<a class="filter-item active" href="#brand" data-href="">',
		// 				'<div class="item-label">',
		// 					'<span class="label">日</span>',
		// 					'<span class="icon icon-down pull-right"></span>',
		// 				'</div>',
						
		// 			'</a>',
		// 		'</div>',
		// 		'<div class="bi-table">',
		// 			'<div class="table-header">',
		// 				'<div class="table-cell curdate">',
		// 					'<span class="date">',
		// 						'11.4(周二)',
		// 					'</span>',
		// 				'</div>',
		// 				'<div class="table-cell hisdate">',
		// 					'<span class="icon icon-left pull-left"></span>',
		// 					'<span class="icon icon-right pull-right"></span>',
		// 					'<span class="date">',
		// 						'11.4(周二)',
		// 					'</span>',
		// 				'</div>',
		// 			'</div>',
		// 			'<div class="table-body">',
		// 				'<div class="table-row">',
		// 					'<div class="table-cell">',
		// 						'<span class="label pull-left">客流</span>',
		// 						'<span class="num">9000</span>',
		// 						'<span class="unit">人</span>',
		// 					'</div>',
		// 					'<div class="table-cell">',
		// 						'<span class="num">9000</span>',
		// 						'<span class="unit">人</span>',
		// 					'</div>',
		// 				'</div>',
		// 				'<div class="table-row">',
		// 					'<div class="table-cell">',
		// 						'<span class="label pull-left">订单</span>',
		// 						'<span class="num">9000</span>',
		// 						'<span class="unit">单</span>',
		// 					'</div>',
		// 					'<div class="table-cell">',
		// 						'<span class="num">9000</span>',
		// 						'<span class="unit">单</span>',
		// 					'</div>',
		// 				'</div>',
		// 			'</div>',
		// 		'</div>',
		// 	'</div>'
		// ].join(''));
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
		// $wrapper.html([
		// 	'<header class="bar bar-nav">',
		// 		'<a class="icon icon-person pull-right" href="/#login" data-transition="slide-in" data-href="push"></a>',
		// 		'<h1 class="title">老板通</h1>',
		// 	'</header>',
		// 	'<div class="content">',
		// 		'<h1 class="title">品牌业务指标图表页面</h1>',
		// 	'</div>'
		// ].join(''));
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