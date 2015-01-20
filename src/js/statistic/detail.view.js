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
			var headerTpl = hbr.compile(TplLib.get('tpl_statistic_header'));
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
				headerTpl : headerTpl,
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
				title : '<span class="bi-bar-title">老板通</span>'
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
				Hualala.Common.getSourceImage(url, {
					width : 40,
					height : 40,
					quality : 50
				});
			return url;
		},
		getGroupName : function (groupID) {
			var sessionData = Hualala.getSessionData();
			var group = _.find(sessionData, function (g) {
				return $XP(g, 'groupID') === groupID;
			});
			var groupName = $XP(group, 'groupName', '');
			return groupName;
		},
		initLayout : function () {
			var self = this;
			var layoutTpl = this.get('layoutTpl');
			var toolbarTpl = this.get('filterBarTpl');
			var htm = layoutTpl({
				appBar : this.mapAppBarData()
			});
			this.container.html(htm);
			
			self.bindCntEvent();
		},
		initToolbar : function (cbFn) {
			var self = this;
			var toolbarTpl = this.get('filterBarTpl');
			// Hualala.ShopManager.getShopDataSetByGroupID(this.curGroupIDLst, function (cities) {
			// 	var htm = toolbarTpl(self.mapFilterBarData(cities));
			// 	var $content = self.container.find('.content'),
			// 		$toolbar = $content.find('.bi-toolbar');
			// 	if ($toolbar.length > 0) {
			// 		$toolbar.remove();
			// 	}
			// 	$content.prepend(htm);
			// 	self.bindToolbarEvent();
				
			// });
			// For fix android below 4.4 in webkit bug
			Hualala.ShopManager.getShopDataSetByGroupID(this.curGroupIDLst, function (cities) {
				var htm = toolbarTpl(self.mapFilterBarData(cities));
				var $content = self.container.find('.content'),
					$toolbar = self.container.find('.bi-toolbar');
				if ($toolbar.length > 0) {
					$toolbar.remove();
				}
				$toolbar = $(htm);
				$toolbar.insertBefore($content);
				self.bindToolbarEvent();
				IX.isFn(cbFn) && cbFn();
			});
		},
		getHisDateStr : function (v) {
			var dateStr = v.split('-');
			if (dateStr.length == 2) {
				// dateStr = _.map(dateStr, function (d) {
				// 	return d;
				// });
				// dateStr = dateStr.join('<br/>-');
				dateStr = '从' + dateStr[0] + '<br/>到' + dateStr[1];
			} else {
				dateStr = dateStr.join('');
			}
			return dateStr;
		},
		bindCntEvent : function () {
			var self = this;
			self.container.on('click', '.table-header > .hisdate .icon', function (e) {
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
				hisDateStr = hisDateList[hisShowIdx];
				$date.html(self.getHisDateStr(hisDateStr));
				self.$curCnt.find('.table-cell.hisdate:visible .chart-canvas').each(function (i, el) {
					self.drawChart($(el));
				});
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
							return IX.Date.getDateByFormat(_v, 'yyyy.MM');
						});
						reportDate = reportDate[0];
						break;
					case 'quarter':
						reportDate = reportDate.split('-');
						reportDate = _.map(reportDate, function (v) {
							var _v = HCOM.formatDateTimeValue(v);
							return IX.Date.getDateByFormat(_v, 'yyyy.MM');
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
				var dateStr = self.getHisDateStr(v);
				return IX.inherit({
					dateStr : dateStr,
					clz : isHistory ? 'hisdate' : 'curdate',
					isHistory : isHistory
				}, (isHistory ? {
					iconBtn : {
						items : [
							{clz : 'icon-left pull-left', href : 'javascript:void 0;', label : '向前'},
							{clz : 'icon-right pull-right', href : 'javascript:void 0;', label : '先后'}
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
				var valIsCash = (keys + ',').indexOf('cashUnit') > -1 ? true : false;
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
							// _col['value'] = Hualala.Common.Math.shortyNumeric(val);
							_col['value'] = val;
							break;
					}
				});
				var _val = $XP(_col, 'value', 0) + '';
				_val = Hualala.Common.Math.mapNumeric(_val);
				if (_val.orig.split('.')[0].length > 4) {
					_col['value'] = Number(_val.shorty);
					_col['unit'] = _val.scale + _col['unit'];
				}
				var _val1 = $XP(_col, 'waitCheckoutOrderAmountTotal', 0) + '';
				_val1 = Hualala.Common.Math.mapNumeric(_val1);
				if (_val1.orig.split('.')[0].length > 4) {
					_col['waitCheckoutOrderAmountTotal'] = Number(_val1.shorty);
					_col['waitCheckoutOrderUnit'] = _val1.scale + Hualala.Constants.CashUnit;
				} else {
					_col['waitCheckoutOrderUnit'] = Hualala.Constants.CashUnit;
				}
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
				var _val = null;
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
									o['shortyValue'] = val;
									break;
							}
						});
						var _val = $XP(o, 'value', 0) + '';
						_val = Hualala.Common.Math.mapNumeric(_val);
						if (_val.orig.split('.')[0].length > 4) {
							o['shortyValue'] = Number(_val.shorty);
							o['value'] = Number(_val.orig);
							o['unit'] = _val.scale + o['unit'];
						}

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
				_col['items'] = _.map(_col['items'], function (item) {
					var _val = $XP(item, 'payAmount', 0) + '';
					_val = Hualala.Common.Math.mapNumeric(_val);
					return IX.inherit(item, {
						value : _val.orig.split('.')[0].length > 4 ? Number(_val.shorty) : Number(_val.orig),
						unit : _val.orig.split('.')[0].length > 4 ? (_val.scale + _col['cashUnit']) : _col['cashUnit']
					});
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
					href : chartType == 'paidAmountPayLst' ? 'javascript:void 0;' : self.getChartPagePath(chartType),
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
		renderTableHeader : function (data) {
			var self = this;
			var headerTpl = self.get('headerTpl');
			if (IX.isEmpty(headerTpl)) return;
			var header = headerTpl({
				header : $XP(data, 'header')
			});
			self.$header && self.$header.remove();
			self.$header = $(header).insertBefore(self.container.find('.content'));
			// console.info(self.$header.html());
		},
		render : function () {
			var self = this;
			var cntTpl = self.get('cntTpl');
			var renderData = self.mapContentData({
				curData : self.model.getCurrentData(self.curGroupIDLst),
				hisData : self.model.getHistoryData(self.curGroupIDLst)
			});
			self.renderTableHeader(renderData);
			
			var htm = cntTpl(renderData);
			self.$curCnt && self.$curCnt.remove();
			self.$curCnt = $(htm).appendTo(self.container.find('.content'));
			self.$curCnt.find('.table-cell.curdate .chart-canvas').each(function (i, el) {
				self.drawChart($(el));
			});
			self.$curCnt.find('.table-cell.hisdate:visible .chart-canvas').each(function (i, el) {
				self.drawChart($(el));
			});
		},
		getChartPagePath : function (chartType) {
			var self = this;
			return HP.createPath('chart', [self.curCycleType, self.curGroupIDLst, self.curCityIDLst, self.curShopIDLst, chartType, '']);
		},
		drawChart : function ($chartCanvas) {
			var self = this;
			var $tblCell = $chartCanvas.parents('.table-cell'),
				isCurDate = $tblCell.hasClass('curdate') ? true : false,
				$legends = $chartCanvas.parent().find('.chart-legend');
			var data = [], count = 0;
			$legends.each(function (i, el) {
				var bgColor = i != 0 ? '#CCC' : (isCurDate ? '#F27935' : '#1FBBA6');
				var $el = $(el);
				var value = parseFloat($el.attr('data-value'));
				count += value;
				data.push({
					color : bgColor,
					// label : $el.attr('data-label'),
					value : value
				});
			});
			data = _.map(data, function (el) {
				var _percent = parseFloat($XP(el, 'value') / count);
				var percent = count == 0 ? 0 : (_percent == 0 ? 0.0001 : _percent);
				return IX.inherit(el, {
					value : percent
				});
			});
			var $canvas = $('<canvas class="chart-canvas"></canvas>').css({
				position : 'relative'
			}).hide();
			$canvas.attr('width', $chartCanvas.width()).attr('height', $chartCanvas.height());
			$chartCanvas.empty().append($canvas);
			var ctx = $canvas[0].getContext("2d");
			var chart = new Chart(ctx).Pie(data, {
				segmentStrokeWidth : 0,
				animation : false,
				scaleShowLabels : false,
				showScale : false,
				showTooltips : false
			});
			var png = chart.toBase64Image();
			$canvas.show();
			// var $img = $('<img>').css({
			// 	display : 'block',
			// 	width : '100%',
			// 	height : '100%'
			// }).appendTo($chartCanvas);
			// $img.attr('src', png);

		}
	});

	HB.BrandDetailView = BrandDetailView;
})(jQuery, window);