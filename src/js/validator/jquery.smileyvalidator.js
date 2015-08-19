;(function ($) {

	function trim(el) {
		return (''.trim) ? el.val().trim() : $.trim(el.val());
	}

	var IsSmileyValidator = function IsSmileyValidator (form, options) {
		this.$form = $(form);
		this.fields = [];
		this.options = $.extend({}, $.fn.smileyValidator.DEFAULT_OPTIONS, options);
		this._submitIfValid = null;
		this.$submitButton = null;
		// Validating status
		this.STATUS_NOT_VALIDATED = 'NOT_VALIDATED';
		this.STATUS_VALIDATING = 'VALIDATING';
		this.STATUS_INVALID = 'INVALID';
		this.STATUS_VALID = 'VALID';

		this._invalidField = null;
		this._init();
	};
	IsSmileyValidator.prototype = {
		constructor : IsSmileyValidator,
		_init : function () {
			var that = this;
			this.$form
				// Disable client side validation in HTML5
				.attr('novalidate', 'novalidate')
				.addClass(this.options.elementClass)
				.on('submit.sv', function () {
					// console.info('submit');
					e.preventDefault();
                    that.validate();
				})
				.on('click.sv', this.options.submitButton, function() {
					that.$submitButton  = $(this);
					// The user just click the submit button
					that._submitIfValid = true;
					// console.info("click submit");
                })
				// Find all fields which have name
				.find('[name]')
					.each(function () {
						var $field = $(this),
							field = $field.attr('name');
						that.options.fields[field] = $.extend(that.options.fields[field], {
							type : $field.attr('type'),
							el : $field
						});
						that._initField(that.options.fields[field]);
					});

				if (this.options.onSuccess) {
					this.$form.on('success.form.sv', function (e) {
						$.fn.smileyValidator.helpers.call(that.options.onSuccess, [e]);
					});
				}
				if (this.options.onError) {
					this.$form.on('error.form.sv', function (e) {
						$.fn.smileyValidator.helpers.call(that.options.onError, [e]);
					});
				}
		},
		_initField : function (field) {
			var that = this;
			var name = field.el.attr('name');
			// we don't need to validate non-existing fields
			if (this.options.fields[name] === null || this.options.fields[name].validators === null) {
				delete this.options.fields[name];
				return;
			}

			field.el.off(this.options.when).bind(this.options.when, function (e) {
				var $this = $(this);
				that.validateField($this);
			});

			if (this.options.fields[name].onSuccess) {
				fields.on('success.field.sv', function (e, data) {
					$.fn.smileyValidator.helpers.call(that.options.fields[name].onSuccess, [e, data]);
				});
			}
			if (this.options.fields[name].onError) {
				fields.on('error.field.sv', function (e, data) {
					$.fn.smileyValidator.helpers.call(that.options.fields[name].onError, [e, data]);
				});
			}

		},
		validateField : function ($field) {
			var that = this;
			var name = $field.attr('name'),
				validators = this.options.fields[name].validators;
			var validatorName = null;
			var validateResult = this._isExcluded($field);
			var group = this.options.fields[name].group || this.options.group;
			var $parent = !group ? $field : $field.parents(group);
			var isValid = null, message = null;
			for (validatorName in validators) {
				if (!$.fn.smileyValidator.validators[validatorName]) {
					delete validators[validatorName];
				}
				validateResult = $.fn.smileyValidator.validators[validatorName].validate(this, $field, validators[validatorName]);
				if ('object' === typeof validateResult && validateResult.valid !== undefined && validateResult.message !== undefined) {
					isValid = validateResult.valid;
					message = validateResult.message;
				} else if ('boolean' === typeof validateResult) {
					isValid = validateResult;
					message = that._getMessage(name, validatorName);
				}
				$field.data('sv.result.' + validatorName, isValid ? this.STATUS_VALID : this.STATUS_INVALID);
				if (!isValid) {
					break;
				}
			}
			
			
			$parent.removeClass(this.options.unsmiley + ' ' + this.options.smiley).addClass(isValid ? this.options.smiley : this.options.unsmiley);
			if (false === isValid) {
				that._invalidField = {
					sv : that,
					field : name,
					element : $field,
					validator : validatorName,
					message : message
				};
			}
			$field.trigger($.Event(isValid ? 'success.field.sv' : 'error.field.sv'), {
				sv : this,
				field : name,
				element : $field,
				validator : validatorName,
				message : isValid ? '' : message
			});
			return isValid;

			// if (validateResult === false) {
			// 	$field.data('sv.result.' + validatorName, this.STATUS_INVALID);
			// 	$parent.removeClass(this.options.unsmiley + ' ' + this.options.smiley).addClass(this.options.unsmiley);
			// 	that._invalidField = {
			// 		sv : that,
			// 		field : name,
			// 		element : $field,
			// 		validator : validatorName,
			// 		message : that._getMessage(name, validatorName)
			// 	};
			// 	$field.trigger($.Event('error.field.sv'), {
			// 		sv : this,
			// 		field : name,
			// 		element : $field,
			// 		validator : validatorName
			// 	});
			// } else {
			// 	$field.data('sv.result.' + validatorName, this.STATUS_VALID);
			// 	$parent.removeClass(this.options.unsmiley + ' ' + this.options.smiley).addClass(this.options.smiley);
			// 	$field.trigger($.Event('success.field.sv'), {
			// 		sv : this,
			// 		field : name,
			// 		element : $field,
			// 		validator : validatorName
			// 	});
			// }
			// return validateResult;
		},
		/**
		 * Get the error message for given field and validator
		 * @param  {String} field         the field name
		 * @param  {String} validatorName The validator name
		 * @return {String}               Error message
		 */
		_getMessage : function (field, validatorName) {
			if (!this.options.fields[field] || !$.fn.smileyValidator.validators[validatorName]
				|| !this.options.fields[field].validators || !this.options.fields[field].validators[validatorName]) {
				return '';
			}
			var options = this.options.fields[field].validators[validatorName];
			switch (true) {
				case (!!options.message):
					return options.message;
				case (!!this.options.fields[field].message):
					return this.options.fields[field].message;
				case (!!$.fn.smileyValidator.i18n[validatorName]):
					return $.fn.smileyValidator.i18n[validatorName]['default'];
				default:
					return this.options.message;
			}
		},
		/**
		 * Check if the field is excluded
		 * Returning true means that the field will not be validated
		 * 
		 * @param  {jQuery}  $field this field element
		 * @return {Boolean}        
		 */
		_isExcluded : function ($field) {
			var excludedAttr = $field.attr('data-sv-excluded'),
				field = $field.attr('name');
			switch (true) {
				case (!!field && this.options.fields && this.options.fields[field] && (this.options.fields[field].excluded === 'true' || this.options.fields[field].excluded === true)) :
				case (excludedAttr === 'true'):
				case (excludedAttr === ''):
					return true;
				case (!!field && this.options.fields && this.options.fields[field] && (this.options.fields[field].excluded === 'false' || this.options.fields[field].excluded === false)) :
				case (excludedAttr === 'false'):
				case (excludedAttr === ''):
					return false;
				default:
					if (this.options.excluded) {
						if ('string' === typeof this.options.excluded) {
							this.options.excluded = $.map(this.options.excluded.split(','), function (item) {
								return $.trim(item);
							});
						}
						var length = this.options.excluded.length;
						for (var i = 0; i < length; i++) {
							if (('string' === typeof this.options.excluded[i] && $field.is(this.options.excluded[i]))
								|| ('function' === typeof this.options.excluded[i] && this.options.excluded[i].call(this, $field, this) === true)) {
								return true;
							}
						}
					}
					return false;
			}
		},
		/**
		 * Called when all validations are completed
		 * 
		 */
		_submit : function () {
			var isValid = this.isValid(),
				eventType = isValid ? 'success.form.sv' : 'error.form.sv',
				e = $.Event(eventType);
			// Hualala.UI.TopTip({
			// 	type : 'danger',
			// 	msg : 'eventType:' + eventType
			// });
			this.$form.trigger(e, isValid ? {
					sv : this
				} : this._invalidField);
			// Call default handler
			// Check if whether the submit button is clicked
			if (this.$submitButton) {
				isValid ? this._onSuccess(e) : this._onError(e);
			}
		},

		_onSuccess : function (e) {
			if (e.isDefaultPrevented()) {
				return;
			}
		},

		_onError : function (e) {
			if (e.isDefaultPrevented()) {
				return;
			}
		},

		/**
		 * Check the form validity
		 * @return {Boolean} [description]
		 */
		isValid : function () {
			for (var field in this.options.fields) {
				if (!this.isValidField(field)) {
					return false;
				}
			}
			return true;
		},
		isValidField : function (field) {
			var $field = $('[name="' + field + '"]');
			var type = $field.attr('type'),
				total = ('radio' === type || 'checkbox' === type) ? 1 : $field.length,
				validatorName, status, fieldEl;
			for (var i = 0; i < total; i++) {
				fieldEl = $field.eq(i);
				if (this._isExcluded(fieldEl)) {
					continue;
				}
				for (validatorName in this.options.fields[field].validators) {
					status = fieldEl.data('sv.result.' + validatorName);
					if (status !== this.STATUS_VALID) {
						return false;
					}
				}
			}
			return true;
		},
		validate : function () {
			var validateResult = null;
			if (!this.options.fields) {
				return this;
			}
			for (var field in this.options.fields) {
				validateResult = this.validateField($('[name="' + field + '"]'));
				if (!validateResult)
					break;
			}
			this._submit();
			return this;
		}
	};

	/**
	 * 简单的表单校验工具
	 * @param  {Object|String} options 插件配置|执行方法名
	 * @return {jQuery}         表单对象自身
	 */
	$.fn.smileyValidator = function smileyValidator (options) {
		var params = arguments;
		return this.each(function () {
			var $this = $(this),
				data = $this.data('smileyValidator'),
				option = 'object' === typeof options && options;
			if (!data) {
				data = new IsSmileyValidator(this, option);
				$this.data('smileyValidator', data);
			}
			// Call plugin method
			if ('string' === typeof(options)) {
				data[options].apply(data, Array.prototype.slice.call(params, 1))
			}
		});
	};

	$.fn.smileyValidator.DEFAULT_OPTIONS = {
		// The form CSS Class
		elementClass : "sv-form",
		// Default invalid message
		message : "This value is not valid",
		// The event name which form element is triggered validation
		when : "blur",
		// The submit button which is clicked to submit form
		submitButton : "[type=submit]",
		// Indicate fields which won't be validated
		// By default, the plugin will not validate the following kind of fields:
		// -disabled
		// -hidden
		// -invisible
		excluded : [":disabled", ":hidden", ":not(:visible)"],
		// The invalid form element class
		unsmiley : "unsmiley",
		// The valid form element class
		smiley : "smiley",
		// When form valid ok to do it
		onSuccess : null,
		// When form valid error to do it
		onError : null,
		group : ".input-row"
	};

	// Available validators
	$.fn.smileyValidator.validators = {};

	// i18n
	$.fn.smileyValidator.i18n = {};

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
		},
		/**
		 * Execute a callback function
		 * @return {Function|String} functionName Function name can be -
		 * -name of global function
		 * -name of namespace function like (a.b.c
		 * @param {Array} args The callback arguments)
		 */
		call : function (functionName, args) {
			if ('function' === typeof functionName) {
				return functionName.apply(this, args);
			} else if ('string' === typeof functionName) {
				if ('()' === functionName.substring(functionName.length - 2)) {
					functionName = functionName.substring(0, functionName.length - 2);
				}
				var ns = functionName.split('.'),
					func = ns.pop(),
					context = window;
				for (var i = 0; i < ns.length; i++) {
					context = context[ns[i]]
				}
				return context[func].apply(this, args);
			}
		}
	};
})(jQuery);

;(function ($) {
	$.fn.smileyValidator.i18n.notEmpty = $.extend($.fn.smileyValidator.i18n.notEmpty || {}, {
		'default' : 'Please enter a value'
	});

	$.fn.smileyValidator.validators.notEmpty = {
		validate : function (validator, $field, options) {
			var type = $field.attr('type');
			if ('radio' == type || 'checkbox' == type) {
				return $('[name=' + $field.attr('name') + ']')
						.filter(':checked')
						.length > 0;
			}
			return $.trim($field.val()) !== '';
		}
	};
})(jQuery);
;(function ($) {
	$.fn.smileyValidator.i18n.stringLength = $.extend($.fn.smileyValidator.i18n.stringLength || {}, {
		'default' : 'Please enter a value with valid length',
		less : 'Please enter less than %s characters',
		more : 'Please enter more than %s characters',
		between : 'Please enter between %s and %s characters long'
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
			switch(true) {
				case (!!min && !!max) :
					message = $.fn.smileyValidator.helpers.format(options.message || $.fn.smileyValidator.i18n.stringLength.between, [parseInt(min, 10), parseInt(max, 10)]);
					break;
				case (!!min):
					message = $.fn.smileyValidator.helpers.format(options.message || $.fn.smileyValidator.i18n.stringLength.more, parseInt(min, 10));
					break;
				case (!!max):
					message = $.fn.smileyValidator.helpers.format(options.message || $.fn.smileyValidator.i18n.stringLength.less, parseInt(max, 10));
					break;
				default :
					break;
			}
			return {valid : isValid, message : message};
		}
	};
})(jQuery);
;(function ($) {
	$.fn.smileyValidator.i18n.loginName = $.extend($.fn.smileyValidator.i18n.loginName || {}, {
		'default' : 'Please enter a valid user name'
	});
	$.fn.smileyValidator.validators.loginName = {
		validate : function (validator, $field, options) {
			var value = $field.val();
			if (value === '') {
				return true;
			}
			var regExp = /^[a-zA-Z0-9_]{1,}$/;
			return regExp.test(value);
		}
	};
})(jQuery);
;(function ($) {
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














