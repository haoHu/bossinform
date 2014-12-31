;(function ($) {
	$.fn.smileyValidator.i18n = $.extend(true, $.fn.smileyValidator.i18n, {
		notEmpty : {
			'default' : '栏位不能为空'
		},
		stringLength : {
			'default' : '请输入符合长度限制的值',
			'less' : '请输入小于 %s 个字符',
			'more' : '请输入大于 %s 个字符',
			'between' : '请输入介于 %s 至 %s 个字符'
		},
		loginName : {
			'default' : '请输入有效的登录名'
		},
		mobile : {
			'default' : '请输入有效地手机号码'
		}
	});
})(jQuery);