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

	/**
	 * Confirm 提示框
	 * @param {Object} cfg  {title, msg, okLabel, okFn, cancelLabel, cancelFn}
	 */
	var Confirm = function (cfg) {
		var tpl = hbr.compile(TplLib.get('tpl_site_confirm'));
		var okLabel = $XP(cfg, 'okLabel', '好的'),
			cancelLabel = $XP(cfg, 'cancelLabel', '取消');
		var okFn = $XF(cfg, 'okFn'),
			cancelFn = $XF(cfg, 'cancelFn');
		var el = $(tpl({
			clz : 'mask-dark',
			id : IX.id(),
			title : $XP(cfg, 'title', ''),
			msg : $XP(cfg, 'msg', ''),
			okLabel : okLabel,
			cancelLabel : cancelLabel
		}));
		el.on('click', '.btn', function (e) {
			var $btn = $(this),
				act = $btn.hasClass('btn-success') ? 'ok' : 'cancel';
			if (act == 'ok') {
				okFn();
			} else {
				cancelFn();
			}
			el.find('.alert').alert('close');
			el.remove();
		});
		el.appendTo('body');
		el.find('.alert').alert();
	};
	Hualala.UI.Confirm = Confirm;

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
							height : 40
						});

				return {
					value : value,
					active : active,
					logo : logo,
					label : $XP(el, 'groupName', '')
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
		$dropList.off('mouseover').on('mouseover', '.list-item', function (e) {
			var $li = $(this);
			$dropList.find('.list-item').removeClass('hover');
			$li.addClass('hover');
		});
		$dropList.off('mouseout').on('mouseout', '.list-item', function (e) {
			var $li = $(this);
			$dropList.find('.list-item.hover').removeClass('hover');
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
			$cityMenu.off('mouseover').on('mouseover', '.city-item', function (e) {
				var $li = $(this);
				$cityMenu.find('.city-item').removeClass('hover');
				$li.addClass('hover');
			});
			$dropList.off('mouseout').on('mouseout', '.city-item', function (e) {
				var $li = $(this);
				$cityMenu.find('.city-item.hover').removeClass('hover');
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
			$shopMenu.off('mouseover').on('mouseover', '.shop-item', function (e) {
				var $li = $(this);
				$shopMenu.find('.shop-item').removeClass('hover');
				$li.addClass('hover');
			});
			$shopMenu.off('mouseout').on('mouseout', '.shop-item', function (e) {
				var $li = $(this);
				$shopMenu.find('.shop-item.hover').removeClass('hover');
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
			$dropList.find('.list-item').removeClass('hover');
			$li.addClass('active');
			// e.stopPropagation();
			targetEl.attr('data-value', $li.attr('data-value'));
			targetEl.find('.label').html($li.find('.label').html());
			selectFn(targetEl);
			// return false;
		});
		$dropList.off('mouseover').on('mouseover', '.list-item', function (e) {
			var $li = $(this);
			$dropList.find('.list-item').removeClass('hover');
			$li.addClass('hover');
		});
		$dropList.off('mouseout').on('mouseout', '.list-item', function (e) {
			var $li = $(this);
			$dropList.find('.list-item.hover').removeClass('hover');
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
			targetEl.trigger('click');
			selectFn(targetEl);
			
			// return false;
		});
		$dropList.off('mouseover').on('mouseover', '.list-item', function (e) {
			var $li = $(this);
			$dropList.find('.list-item').removeClass('hover');
			$li.addClass('hover');
		});
		$dropList.off('mouseout').on('mouseout', '.list-item', function (e) {
			var $li = $(this);
			$dropList.find('.list-item.hover').removeClass('hover');
		});
	};
	Hualala.UI.ChartDropList = ChartDropList;

	
})(jQuery, window);