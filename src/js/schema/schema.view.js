(function ($, window) {
	IX.ns("Hualala.Brand");
	var HB = Hualala.Brand;
	var HP = Hualala.PageRoute;
	var HU = Hualala.UI;
	var hbr = Handlebars,
		TplLib = Hualala.TplLib;
	var CycleTypes = Hualala.TypeDef.CycleTypes;
	
	var BrandListView = Stapes.subclass({
		/**
		 * 品牌列表页View层
		 * @return {Obj}     品牌列表View层实例
		 * 
		 */
		constructor : function () {
			this.container = null;
			this.model = null;
			this.loadTemplates();
			this.curCycleType = CycleTypes[0].value;
			this.$curCnt = null;
		}
	});

	BrandListView.proto({
		/**
		 * 品牌列表页View层
		 * @param  {Obj} cfg 
		 *         {
		 *         		container, model
		 *         }
		 *         
		 * @return {Obj}     品牌列表View层实例
		 * 
		 */
		init : function (cfg) {
			this.container = $XP(cfg, 'container', null);
			this.model = $XP(cfg, 'model', null);
			var _p = this.model.getQueryParams();
			if (!this.container || !this.model) {
				throw("Brand list view init failed!!");
			}
			this.curCycleType = $XP(_p, 'cycleType', 'day');
			this.initLayout();
		},
		mapAppBarData : function () {
			var self = this;
			return {
				clz : '',
				iconBtn : {
					items : [
						{
							clz : 'icon-person pull-right',
							label : '个人信息',
							href : HP.createPath('aboutme')
						}
					]
				},
				title : '<span class="bi-bar-title">老板通</span>'
			};
		},
		mapSegmentsData : function () {
			var self = this;
			var segments = _.map(CycleTypes, function (el) {
				var cycleType = el.value;
				return IX.inherit(el, {
					active : self.curCycleType == cycleType ? 'active' : '',
					clz : '',
					href : '#' + cycleType,
					id : cycleType
				});
			});
			return {
				clz : '',
				segments : segments
			};
		},
		initLayout : function () {
			var layoutTpl = this.get('layoutTpl');
			var segmentsTpl = this.get('segmentsTpl');
			var htm = layoutTpl({
				appBar : this.mapAppBarData()
			});
			this.container.html(htm);
			htm = segmentsTpl(this.mapSegmentsData());
			this.container.find('.content').html(htm);
			this.bindEvent();
		},
		// 加载View层所需模板
		loadTemplates : function () {
			var layoutTpl = hbr.compile(TplLib.get('tpl_page_layout'));
			var segmentsTpl = hbr.compile(TplLib.get('tpl_segment_bar'));
			var listTpl = hbr.compile(TplLib.get('tpl_brand_list'));
			hbr.registerPartial("appBar", TplLib.get('tpl_app_bar'));
			hbr.registerPartial("iconBtn", TplLib.get('tpl_icon_btn'));
			hbr.registerPartial("commonBtn", TplLib.get('tpl_common_btn'));
			this.set({
				layoutTpl : layoutTpl,
				segmentsTpl : segmentsTpl,
				listTpl : listTpl
			});

		},
		mapContentData : function (data) {
			var self = this;
			var listClz = '';
			var items = _.map(data, function (d) {
				var _m = $XP(d, '_model');
				var schemaData = _m.getSchemaData();
				var group = Hualala.getGroupByGroupID($XP(schemaData, 'groupID'));
				var groupLogoImageUrl = $XP(group, 'groupLogoImageUrl', '');
				var personTotal = Hualala.Common.Math.mapNumeric($XP(schemaData, 'personTotal', 0)),
					personUnit = $XP(schemaData, 'personUnit'),
					l1 = personTotal.orig.split('.')[0].length,
					orderCountTotal = Hualala.Common.Math.mapNumeric($XP(schemaData, 'orderCountTotal', 0)),
					orderUnit = $XP(schemaData, 'orderUnit'),
					l2 = orderCountTotal.orig.split('.')[0].length,
					orderAomoutTotal = Hualala.Common.Math.mapNumeric($XP(schemaData, 'orderAomoutTotal', 0)),
					cashUnit = $XP(schemaData, 'cashUnit'),
					l3 = orderAomoutTotal.orig.split('.')[0].length;


				return IX.inherit(schemaData, {
					clz : '',
					href : HP.createPath('brand', [self.curCycleType, $XP(schemaData, 'groupID'), '', '']),
					logo : IX.isEmpty(groupLogoImageUrl) ? 
						Hualala.Global.getDefaultImage("blank") :
						Hualala.Common.getSourceImage(groupLogoImageUrl, {
							width : 40,
							height : 40
						}),
					personTotal : l1 > 4 ? personTotal.shorty : personTotal.orig,
					personUnit : l1 > 4 ? (personTotal.scale + personUnit) : personUnit,
					orderCountTotal : l2 > 4 ? orderCountTotal.shorty : orderCountTotal.orig,
					orderUnit : l2 > 4 ? (orderCountTotal.scale + orderUnit) : orderUnit,
					orderAomoutTotal : l3 > 4 ? orderAomoutTotal.shorty : orderAomoutTotal.orig,
					cashUnit : l3 > 4 ? (orderAomoutTotal.scale + cashUnit) : cashUnit
				});
			});
			return {
				clz : listClz,
				items : items
			}
		},
		render : function () {
			var self = this;
			var listTpl = self.get('listTpl');
			var renderData = self.mapContentData(self.model.getCurrentData());
			var htm = listTpl(renderData);
			self.$curCnt = self.container.find('#' + self.curCycleType);
			self.$curCnt.empty().html(htm);
		},
		bindEvent : function () {
			var self = this;
			self.container.on('click', '.segmented-control .control-item', function (e) {
				var $btn = $(this),
					cycleType = $btn.attr('href').slice(1);
				self.curCycleType = cycleType;
				self.emit('switchCycle');
			});
			self.container.on('click', '.brand-item > a', function (e) {
				e.preventDefault();
			});
		}
	});

	HB.BrandListView = BrandListView;
})(jQuery, window);