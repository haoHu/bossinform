;(function ($, undefined) {
	var hbr = Handlebars,
		TplLib = Hualala.TplLib;
	var elementClass = 'has-mask',
		animationActive = 'active';
	var Mask = function Mask (target, options) {
		this.$target = $(target);
		this.$mask = null;
		this.options = $.extend({}, $.fn.mask.DEFAULT_OPTIONS, options);
		this.hasMask = false;
		this.maskShown = false;
		this._init();
	};
	Mask.prototype = {
		constructor : Mask,
		_init : function () {
			var that = this;
			
			this.maskShown = this.$target.attr('data-maskShown') || false;
			this.$target.addClass(elementClass);
			var tpl = hbr.compile(TplLib.get('tpl_site_loadingmask'));
			this.$mask = $(tpl({
				id : 'mask_' + IX.id(),
				clz : this.options.maskClass + ' ' + this.options.messageType,
				msg : this.options.message
			})).hide();
			this.$target.append(this.$mask);
			this.hasMask = true;
			this.$target.attr('data-hasMask', this.hasMask);
			
		},
		show : function (afterShown) {
			this.$mask.show();
			this.$mask.find('.animate-loading').addClass(animationActive);
			this.maskShown = true;
			this.$target.attr('data-maskShown', this.maskShown);
			$.isFunction(afterShown) && afterShown();
		},
		hide : function (afterHidden) {
			this.$mask.find('.animate-loading').removeClass(animationActive);
			this.$mask.hide();
			this.maskShown = false;
			this.$target.attr('data-maskShown', this.maskShown);
			$.isFunction(afterHidden) && afterHidden();
		},
		destory : function () {
			this.$mask.remove();
			this.$target.data('mask', undefined);

		}
	};
	/**
	 * 简单的蒙版工具
	 * @param  {Object|String} options 插件配置|执行方法名
	 * @return {jQuery}         自身对象
	 */
	$.fn.mask = function mask (options) {
		var params = arguments;
		return this.each(function () {
			var $this = $(this),
				data = $this.data('mask'),
				option = 'object' === typeof options && options;
			if (!data) {
				data = new Mask(this, option);
				$this.data('mask', data);
			}
			// Call plugin method
			if ('string' === typeof(options)) {
				data[options].apply(data, Array.prototype.slice.call(params, 1));
			}
		});
	};

	$.fn.mask.DEFAULT_OPTIONS = {
		message : '努力加载中...',
		maskClass : 'mask-dark',
		messageType : 'normal'
	};
})(jQuery);