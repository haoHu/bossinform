;(function ($, _) {
	function trim (el) {
		return (''.trim) ? el.val().trim() : $.trim(el.val());
	}
	var IsSmileyValidator = function IsSmileyValidator (form, options) {
		this.$form = $(form);
		this.options = $.extend({}, $.fn.smileyValidator.DEFAULT_OPTIONS, options);

		this.STATUS_NOT_VALIDATED = 'NOT_VALIDATED';
		this.STATUS_VALIDATING = 'VALIDATING';
		this.STATUS_INVALID = 'INVALID';
		this.STATUS_VALID = 'VALID';

		// The submit button which is clicked to submit form
		this.$submitButton = null;
		this._submitIfValid = null;

		this._cacheFields = {};
		// init form
		this._init();
	};
	IsSmileyValid.prototype = {
		constructor : IsSmileyValidator,
		// Init form
		_init : function () {
			var that = this,
				options = {
					message : this.$form.attr('data-sv-message'),
					submitButton : this.$form.attr('data-sv-submitbutton'),
					fields : {},
					unsmiley : this.$form.attr('data-sv-unsmiley'),
					smiley : this.$form.attr('data-sv-smiley'),
					elementClass : this.$form.attr('data-sv-elementclass'),
					when : this.$form.attr('data-sv-when'),
					excluded : this.$form.attr('data-sv-excluded')
				};
			this.$form
				// Disable client side validation in HTML5
				.attr('novalidate', 'novalidate')
				.addClass(this.options.elementClass)
				.on('submit.sv', function (e) {
					e.preventDefault();
				})
				.on('click.sv', this.options.submitButton, function () {
					that.$submitButton = $(this);
					that._submitIfValid = true;
				})
				.find('[name], [data-sv-field]')
					.each(function () {
						var $field = $(this),
							field = $field.attr('name') || $field.attr('data-sv-field'),
							opts = that._parseOptions($field);
						if (opts) {
							$field.attr('data-sv-field', field);
							options.fields[field] = $.extend({}, opts, options.fields[field]);
						}
					});

			this.options = $.extend(true, this.options, options);
			for (var field in this.options.fields) {
				this._initField(field);
			}

			this.$form.trigger($.Event('init.form.sv'), {
				bv : this,
				options : this.options
			});

			// Prepare the events
			if (this.options.onSuccess) {
				this.$form.on('success.form.sv', function (e) {

				});
			}
			if (this.options.onError) {
				this.$form.on('error.form.bv', function (e) {

				});
			}
		},
		/**
		 * Parse the validator options from HTML attributes
		 * @param  {jQuery} $field the field element
		 * @return {Object}        
		 */
		_parseOptions : function ($field) {
			// @TODO 未来可以根据HTML元素上的属性值设置校验参数
			return null;
		},
		/**
		 * Init field
		 * @param  {String|jQuery} field The field name or field element
		 * 
		 */
		_initField : function (field) {
			var fields = $([]);
			switch (typeof field) {
				case 'object':
					fields = field;
					field = field.attr('data-sv-field');
					break;
				case 'string':
					fields = this.getFieldElements(field);
					fields.attr('data-sv-field', field);
					break;
				default:
					break;
			}
			if (this.options.fields[field] === null || this.options.fields[field].validators === null) {
				return;
			}
			// We don't need to validate non-existing fields
			if (fields.length == 0) {
				delete this.options.fields[field];
				return;
			}
			var validatorName;
			for (validatorName in this.options.fields[field].validators) {
				if (!$.fn.smileyValidator.validators[validatorName]) {
					delete this.options.fields[field].validators[validatorName];
				}
			}
			if (this.options.fields[field].enabled === null) {
				this.options.fields[field].enabled = true;
			}

			var that = this,
				total = fields.length,
				type = fields.attr('type'),
				updateAll = (total === 1) || ('radio' === type) || ('checkbox' === type),
				event = ('radio' === type || 'checkbox' === type || 'file' === type || 'SELECT' === fields.eq(0).get(0).tagName) ? 'change' : 'keyup',
				trigger = (this.options.fields[field].trigger || this.options.trigger || event).split(' '),
				events = $.map(trigger, function (item) {
					return item + '.update.sv';
				}).join(' ');

			for (var i = 0; i < total; i++) {
				var $field = fields.eq(i);
				// Whenever the user change the field value, mark it as not validated yet
				$field.off(events).on(events, function () {
					that.updateStatus($(this), that.STATUS_NOT_VALIDATED);
				});
			}

			if (this.options.fields[field].onSuccess) {
				fields.on('success.field.sv', function (e, data) {

				});
			}
			if (this.options.fields[field].onError) {
				fields.on('error.field.sv', function (e, data) {

				});
			}
			if (this.options.fields[field].onStatus) {
				fields.on('status.field.sv', function (e, data) {

				});
			}
			// Set live mode
			events = $.map(trigger, function (item) {
				return item + '.live.sv';
			}).join(' ');

			fields.off(events).on(events, function () {
				if (that._exceedThreshold($(this))) {
					that.validateField($(this));
				}
			});

			fields.trigger($.Event('init.field.sv'), {
				bv : this,
				field : field,
				element : fields
			});
		},

		getFieldElements : function (field) {
			if (!this._cacheFields[field]) {
				this._cacheFields[field] = (this.options.fields[field] && this.options.fields[field].selector)
										? $(this.options.fields[field].selector)
										: this.$form.find('[name="' + field + '""]');
			}
			return this._cacheFields[field];
		}
	};

	$.fn.smileyValidator.DEFAULT_OPTIONS = {
		// The form CSS Class
		elementClass : "sv-form",
		// Default invalid message
		message : "This value is not valid",
		// The event name which form element is triggered validation
		when : "blur",
		// The submit button which is clicked to submit form
		submitButton : null,
		// Indicate fields which won't be validated
		// By default, the plugin will not validate the following kind of fields:
		// -disabled
		// -hidden
		// -invisible
		excluded : [":disabled", ":hidden", ":not(:visible)"],
		// The invalid form element class
		unsmiley : "unsmiley",
		// The valid form element class
		smiley : "smiley"
	};

	// Available validators
	$.fn.smileyValidator.validators = {};

	// i18n
	$.fn.smileyValidator.i18n = {};

	$.fn.smileyValidator.Constructor = IsSmileyValidator;

	// helper methods, which can be used in validator class
	$.fn.smileyValidator.helpers = {
		/**
		 * Format a string
		 * It's used to format the error message
		 * format('The field must between %s and %s', [10, 20]) ==> 'The field must between 10 and 20'
		 * 
		 * @param  {String} message    
		 * @param  {Array} parameters 
		 * @return {String}
		 */
		format : function (message, parameters) {
			if (!$.isArray(parameters)) {
				parameters = [parameters];
			}
			for (var i in parameters) {
				message = message.replace('%s', parameters[i]);
			}
			return message;
		}
	};


	$.fn.smileyValidator = function smileyValidator (options) {
		var params = arguments;
		return this.each(function () {
			var $this = $(this),
				data = $this.data('smiley'),
				options = 'object' === typeof options && options;
			if (!data) {
				data = new IsSmileyValidator(this, options);
				$this.data('smiley', data);
			}
			// Call plugin method
			if ('string' === typeof(options)) {
				data[options].apply(data, Array.prototype.slice.call(params, 1))
			}
		});
	};
})(jQuery, window._);
;(function ($) {
	$.fn.smileyValidator.i18n.stringLength = $.extend($.fn.smileyValidator.i18n.stringLength || {}, {
		'default' : 'Please enter a value with length',
		less : 'Please enter less than %s characters',
		more : 'Please enter more than %s characters',
		between : 'Please enter value between %s and %s characters long'
	});

	$.fn.smileyValidator.validators.stringLength = {
		validate : function (validator, $field, options) {
			var value = $field.val();
			if (value === '') {
				return true;
			}
			var min = options.min,
				max = options.max,
				length = value.length,
				isValid = true,
				message = options.message || $.fn.smileyValidator.i18n.stringLength['default'];
			if ((min && length < parseInt(min, 10)) || (max && length > parseInt(max, 10))) {
				isValid = false;
			}
			switch (true) {
				case (!!min && !!max):
					message = $.fn.smileyValidator.helpers.format(options.message || $.fn.smileyValidator.i18n.stringLength.between, [parseInt(min, 10), parseInt(max, 10)]);
					break;
				case (!!min):
					message = $.fn.smileyValidator.helpers.format(options.message || $.fn.smileyValidator.i18n.stringLength.more, parseInt(min, 10));
					break;
				case (!!max):
					message = $.fn.smileyValidator.helpers.format(options.message || $.fn.smileyValidator.i18nstringLength.less, parseInt(max, 10));
					break;
				default:
					break;

			}
			return {valid : isValid, message : message};
		}
	}
})(jQuery);
;(function ($) {
	$.fn.smileyValidator.i18n.notEmpty = $.extend($.fn.smileyValidator.i18n.notEmpty || {}, {
		'default' : 'Please enter a value'
	});
	$.fn.bootstrapValidator.validators.notEmpty = {
		validator : function (validator, $field, options) {
			var type = $field.attr('type');
			if ('radio' === type || 'checkbox' === type) {
				return validator
							.getFieldElements($field.attr('data-sv-field'))
							.filter(':checked')
							.length > 0;
			}
			return $.trim($field.val()) !== '';
		}
	};
})(jQuery);
;(function ($) {
	// 不含汉子
	$.fn.smileyValidator.i18n.noChiness = $.extend($.fn.smileyValidator.i18n.noChiness || {}, {
		'default' : 'Please enter string which has nothing chiness'
	});
	$.fn.smileyValidator.validators.noChiness = {
		validator : function (validator, $field, options) {
			var value = $field.val();
			if (value === '') {
				return true;
			}
			var regExp = /[\u4e00-\u9fa5]/g;
			return !regExp.test(value);
		}
	};
})(jQuery);
;(function ($) {
	// 手机号
	$.fn.smileyValidator.i18n.mobile = $.extend($.fn.smileyValidator.i18n.mobile || {}, {
		'default' : 'Please enter a valid mobile number'
	});
	$.fn.smileyValidator.validators.mobile = {
		validate : function (validator, $field, options) {
			var value = $field.val();
			if (value === '') {
				return true;
			}
			var mobileRegExp = /^1[34578]\d{9}$/;
			return mobileRegExp.test(value);
		}
	};
})(jQuery);























