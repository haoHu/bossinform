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

	var BrandChartView = HB.BrandDetailView.subclass({
		constructor : HB.BrandDetailView.prototype.constructor
	});

	BrandChartView.proto({
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
			this.curIndicatorID = pageCtx.params[4];
			this.chartIndicatorList = _.filter(Hualala.TypeDef.BrandDetailRows, function (el) {
				return el.type != 'list';
			});
			this.initLayout();
		},
		loadTemplates : function () {
			var layoutTpl = hbr.compile(TplLib.get('tpl_page_layout'));
			var filterBarTpl = hbr.compile(TplLib.get('tpl_filter_toolbar'));
			var cntTpl = hbr.compile(TplLib.get('tpl_brand_chart'));

			hbr.registerPartial("appBar", TplLib.get('tpl_app_bar'));
			hbr.registerPartial("iconBtn", TplLib.get('tpl_icon_btn'));
			hbr.registerPartial("commonBtn", TplLib.get('tpl_common_btn'));

			this.set({
				layoutTpl : layoutTpl,
				filterBarTpl : filterBarTpl,
				cntTpl : cntTpl
			});
		},
		getCurIndicatorCfg : function (indicatorID) {
			var self = this,
				curIndicatorCfg = _.find(self.chartIndicatorList, function (el) {return el.chartType == indicatorID; });
			return curIndicatorCfg;
		},
		mapAppBarData : function () {
			var self = this;
			var parentNames = HP.getParentNamesByPath();
			var indicatorID = self.curIndicatorID,
				title = $XP(self.getCurIndicatorCfg(indicatorID), 'label', '');
			return {
				clz : '',
				commonBtn : {
					items : [
						{
							clz : 'btn-link pull-right chart-droplist',
							label : '其他数据'
						}
					]
				},
				iconBtn : {
					items : [
						{
							clz : 'icon-left-nav pull-left',
							label : '返回',
							href : HP.createPath($XP(parentNames[parentNames.length - 2], 'name', 'main'), [self.curCycleType, self.curGroupIDLst, self.curCityIDLst, self.curShopIDLst])
						}
					]
				},
				title : title + "分析图表"
			};
		},
		bindCntEvent : function () {
			// 绑定图表的事件
			var self = this;
			var $header = $('header.bi-bar');
			$header.find('.chart-droplist').attr('data-toggle', 'dropdown').attr('data-value', self.curIndicatorID).dropdown({
				parentSelector : '.bi-bar'
			});
			$header.on('show.ra.dropdown', function (e) {
				var $tar = $(e.relatedTarget);
				var $this = $(this);
				var dropdownList = new HU.ChartDropList({
					container : $this.find('.dropdown-menu'),
					targetEl : $tar,
					selectFn : function ($tar) {
						self.curIndicatorID = $tar.attr('data-value');
						var title = $XP(self.getCurIndicatorCfg(self.curIndicatorID), 'label', '');
						self.emit('switchIndicator');
						$tar.parents('header.bi-bar').find('.title').html(title + '分析图表');
					}
				});
			});
		},
		// 按照页码来转换每页图表的数据
		genChartDataByPage : function (data, indicatorID) {
			var self = this;
			var curChartPageSize = self.curChartPageSize;
			var curData = $XP(data, 'curData', []),
				hisData = $XP(data, 'hisData', []);
			hisData = _.find(hisData, function (el) {
				return self.curGroupIDLst == $XP(el, 'groupID');
			});
			hisData = $XP(hisData, 'data', []);
			var dataList = curData.concat(hisData);
			var labels = self.mapDateList(dataList);
			var indicatorCfg = _.find(self.chartIndicatorList, function (el) {
				return $XP(el, 'chartType') == indicatorID;
			});
			var items = $XP(indicatorCfg, 'items').split(',');
			var type = $XP(indicatorCfg, 'type');
			var total = labels.length,
				pageCount = Math.ceil(total / curChartPageSize);
			var labelList = [], seriesList = [];
			
			for (var i = 0; i < pageCount; i++) {
				var start = i * curChartPageSize, end = (i + 1) * curChartPageSize;
				var _segDataList = dataList.slice(start, end);
				var series = [];
				labelList.push(labels.slice(start, end));
				switch (indicatorID) {
					case "personTotal":
					case "orderCountTotal":
					case "orderAomoutTotal":
					case "paidAmountTotal":
					case "promotionAmountTotal":
					case "personAvg":
					case "orderAvg":
						series = _.map(items, function (c) {
							return {
								fillColor : "rgba(20, 185, 214, 1)",
								strokeColor : "rgba(20, 185, 214, 1)",
								pointColor : "rgba(255, 255, 255, 1)",
								pointStrokeColor : "rgba(255, 255, 255, 1)",
								data : _.map(_segDataList, function (el) {
									return $XP(el, c, 0);
								})
							};
						});
						break;
					case "customStructure":
						series = _.map(items, function (c) {
							var fillColor = c == 'vipOrderAmountTotal' ? 'rgba(31, 187, 166, .5)' : 'rgba(204, 204, 204, .5)';
							var label = c == 'vipOrderAmountTotal' ? '会员' : '非会员';
							return {
								label : label,
								fillColor : fillColor,
								strokeColor : fillColor,
								pointColor : fillColor,
								pointStrokeColor : "rgba(255, 255, 255, 1)",
								pointHighlightFill : "rgba(255, 255, 255, 1)",
								pointHighlightStroke : fillColor,
								data : _.map(_segDataList, function (el) {
									return $XP(el, c, 0)
								})
							};
						});
						break;
					case "orderStructure":
						series = _.map(items, function (c) {
							var fillColor = c == 'untakeawayOrderAmountTotal' ? 'rgba(31, 187, 166, .8)' : 'rgba(204, 204, 204, .8)';
							var label = c == 'untakeawayOrderAmountTotal' ? '堂食' : '外卖';
							return {
								label : label,
								fillColor : fillColor,
								strokeColor : fillColor,
								pointColor : fillColor,
								pointStrokeColor : "rgba(255, 255, 255, 1)",
								pointHighlightFill : "rgba(255, 255, 255, 1)",
								pointHighlightStroke : fillColor,
								data : _.map(_segDataList, function (el) {
									return $XP(el, c, 0)
								})
							};
						});
						break;
				}
				seriesList.push(series);
			}
			return {
				labelList : labelList,
				seriesList : seriesList
			};
		},
		
		mapChartDataByIndicatorID : function (data, indicatorID) {
			var self = this;
			var curData = $XP(data, 'curData', []),
				hisData = $XP(data, 'hisData', []);
			hisData = _.find(hisData, function (el) {
				return self.curGroupIDLst == $XP(el, 'groupID');
			});
			hisData = $XP(hisData, 'data', []);
			var dataList = curData.concat(hisData);
			var series = [];
			var indicatorCfg = _.find(self.chartIndicatorList, function (el) {
				return $XP(el, 'chartType') == indicatorID;
			});
			var items = $XP(indicatorCfg, 'items').split(',');
			var type = $XP(indicatorCfg, 'type');
			switch (indicatorID) {
				case "personTotal":
				case "orderCountTotal":
				case "orderAomoutTotal":
				case "paidAmountTotal":
				case "promotionAmountTotal":
				case "personAvg":
				case "orderAvg":
					series = _.map(items, function (c) {
						return {
							fillColor : "rgba(20, 185, 214, 1)",
							strokeColor : "rgba(20, 185, 214, 1)",
							pointColor : "rgba(255, 255, 255, 1)",
							pointStrokeColor : "rgba(255, 255, 255, 1)",
							data : _.map(dataList, function (el) {
								return $XP(el, c, 0);
							})
						};
					});
					break;
				case "customStructure":
					series = _.map(items, function (c) {
						var fillColor = c == 'vipOrderAmountTotal' ? 'rgba(31, 187, 166, .5)' : 'rgba(204, 204, 204, .5)';
						var label = c == 'vipOrderAmountTotal' ? '会员' : '非会员';
						return {
							label : label,
							fillColor : fillColor,
							strokeColor : fillColor,
							pointColor : fillColor,
							pointStrokeColor : "rgba(255, 255, 255, 1)",
							pointHighlightFill : "rgba(255, 255, 255, 1)",
							pointHighlightStroke : fillColor,
							data : _.map(dataList, function (el) {
								return $XP(el, c, 0)
							})
						};
					});
					break;
				case "orderStructure":
					series = _.map(items, function (c) {
						var fillColor = c == 'untakeawayOrderAmountTotal' ? 'rgba(31, 187, 166, .8)' : 'rgba(204, 204, 204, .8)';
						var label = c == 'untakeawayOrderAmountTotal' ? '堂食' : '外卖';
						return {
							label : label,
							fillColor : fillColor,
							strokeColor : fillColor,
							pointColor : fillColor,
							pointStrokeColor : "rgba(255, 255, 255, 1)",
							pointHighlightFill : "rgba(255, 255, 255, 1)",
							pointHighlightStroke : fillColor,
							data : _.map(dataList, function (el) {
								return $XP(el, c, 0)
							})
						};
					});
					break;
			}
			

			return {
				labels : _.map(self.mapDateList(curData.concat(hisData)), function (el, i) {
							return el;
						}),
				datasets : series
			};
		},
		mapContentData : function (data) {
			// TODO 组织图表所需要的数据点
			var self = this;
			self.curChartPage = 0;
			self.curChartPageSize = 7;
			// self.curChartData = self.mapChartDataByIndicatorID(data, self.curIndicatorID);
			self.curChartData = self.genChartDataByPage(data, self.curIndicatorID);
			
			return {
				clz : 'chart'
			};
		},
		getScaleCfg : function () {
			var self = this;
			var chartData = self.curChartData,
				labels = $XP(chartData, 'labels', []),
				datasets = $XP(chartData, 'datasets', []);
			var datalist = [];
			_.each(datasets, function (dataset) {
				datalist = datalist.concat(dataset.data);
			});
			var maxVal = _.max(datalist, function (el) {return parseFloat(el);}),
				minVal = _.max(datalist, function (el) {return parseFloat(el);});

			var scaleSteps = 10;
			var dlta = maxVal - minVal,
				avg = parseInt(dlta / 10);
			var scaleStepWidth = dlta == 0 ? minVal : avg;
			var scaleStartValue = dlta == 0 ? 0 : minVal;
			return {
				responsive : true,
				scaleOverlay : true,
				// scaleOverride : true,
				// scaleSteps : scaleSteps,
				// scaleStepWidth : scaleStepWidth,
				// scaleStartValue : scaleStartValue,
				scaleFontFamily : "'Microsoft Yahei'",
				scaleFontSize : 12,
				scaleFontColor : 'rgb(145,165,183)',
				scaleShowGridLines : true,
				scaleGridLinesColor : "rgba(103,112,124, 1)",
				pointDotRadius : 5,
				onAnimationComplete : function () {
					console.info(arguments);
				},
				tooltipTitleFontStyle : 'bold',
				multiTooltipTemplate : '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>',
				legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"

			};
			
			 
		},
		drawChart : function () {
			var self = this;
			var $chartList = self.$curCnt.find('.chart-list');
			var curChartData = self.curChartData;
			var labelList = $XP(curChartData, 'labelList', []),
				seriesList = $XP(curChartData, 'seriesList', []);
			var viewWidth = self.$curCnt.width(),
				viewHeight = self.$curCnt.height() * 0.8;
			var pageCount = labelList.length;
			
			_.each(labelList, function (labels, pIdx) {
				var series = seriesList[pIdx];
				var $canvas = $('<canvas class="chart-canvas pull-left"></canvas>');
				$canvas.attr('width', viewWidth);
				$canvas.attr('height', viewHeight);
				$canvas.css({
					'width' : viewWidth + 'px',
					'height' : viewHeight + 'px',
					'left' : (pIdx * 100) + '%'
				});

				$canvas.appendTo($chartList);
				var ctx = $canvas[0].getContext("2d");
				var chart = new Chart(ctx).Line({
					// labels : labels,
					labels : _.map(labels, function (el) { return el + '(' + pIdx + ')'}),
					datasets : series
				}, {
					responsive : true,
					scaleOverlay : true,
					scaleFontFamily : "'Microsoft Yahei'",
					scaleFontSize : 12,
					scaleFontColor : 'rgb(145,165,183)',
					scaleShowGridLines : true,
					scaleGridLinesColor : "rgba(103,112,124, 1)",
					pointDotRadius : 5,
					onAnimationComplete : function () {
						console.info(arguments);
					},
					tooltipTitleFontStyle : 'bold',
					multiTooltipTemplate : '<%if (datasetLabel){%><%=datasetLabel%>: <%}%><%= value %>',
					legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
				});
				$canvas.data('data.chart', chart);

			});
			$chartList.css({
				width : pageCount * viewWidth + 'px',
				height : viewHeight + 'px'
			});

			var startPercent = 0,
				movePercent = 0,
				preventSlide = false,
				$pages = $chartList.find('.chart-canvas');

			$chartList.find('.chart-canvas').unbind('touchy-drag').bind('touchy-drag', function (e, phase, $target, data) {
				if (!preventSlide) {
					var bodyWidth = self.$curCnt.width(),
						xDelta = data.movePoint.x - data.lastMovePoint.x,
						newMovePercent = movePercent + (xDelta / bodyWidth);
					if (phase === 'move') {
						if (newMovePercent < 0 && newMovePercent > (1 - $pages.length)) {
							movePercent = newMovePercent;
							$chartList.css({
								'WebkitTransition' : 'none',
								'WebkitTransform' : 'translate3d(' + (movePercent * 100) + '%, 0, 0'
							});
						}
					} else if (phase === 'end' && movePercent !== startPercent) {
						if (data.velocity > 1.7) {
							movePercent = movePercent > startPercent ? startPercent + 1 : startPercent - 1
							slide();
						} else {
							movePercent = Math.round(movePercent);
							slide();
						}
					}
				}
			})
			

			var slide = function () {
				preventSlide = true;
				setTimeout(function () {preventSlide = false}, 400);
				$chartList.css({
					'WebkitTransition':'-webkit-transform 0.4s cubic-bezier(1.0, 0.0, 1.0, 1.0)',
					'WebkitTransform':'translate3d(' + (movePercent * 100) + '%,0,0)'
				});
				startPercent = movePercent;
			};
		}
	});

	HB.BrandChartView = BrandChartView;
})(jQuery, window);