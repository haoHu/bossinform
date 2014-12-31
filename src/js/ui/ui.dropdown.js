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