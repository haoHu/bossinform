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