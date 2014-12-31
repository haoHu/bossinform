(function () {
	IX.ns("Test");
	var groupList = Test.GroupList;

	var dataTpl =  {
		"groupID": "5",
		"groupLogoImageUrl": "",
		"groupName": "豆捞坊",
		"orderAomoutTotal": 1870414.4,
		"orderAvg": 1088.72,
		"orderCountTotal": 1718,
		"paidAmountPayLst": [
			{
				"payAmount": "215788",
				"payName": "会员卡刷卡",
				"payPercent": "12%"
			},
			{
				"payAmount": "692000",
				"payName": "信用卡",
				"payPercent": "38.47%"
			},
			{
				"payAmount": "700",
				"payName": "内招",
				"payPercent": "0.04%"
			},
			{
				"payAmount": "230973",
				"payName": "减免",
				"payPercent": "12.84%"
			},
			{
				"payAmount": "90946",
				"payName": "大众网",
				"payPercent": "5.06%"
			},
			{
				"payAmount": "154158",
				"payName": "挂帐",
				"payPercent": "8.57%"
			},
			{
				"payAmount": "334576",
				"payName": "现金",
				"payPercent": "18.6%"
			},
			{
				"payAmount": "70740",
				"payName": "美团网",
				"payPercent": "3.93%"
			},
			{
				"payAmount": "8711",
				"payName": "赠券",
				"payPercent": "0.48%"
			}
		],
		"paidAmountTotal": 1798592,
		"personAvg": 234.39,
		"personTotal": 7980,
		"promotionAmountTotal": 71808,
		"reportDate": "20141001-20141231",
		"takeawayOrderAmountTotal": 0,
		"untakeawayOrderAmountTotal": 1870414.4,
		"unvipOrderAmountTotal": 1541000.2,
		"vipOrderAmountTotal": 329414.2,
		"waitCheckoutOrderAmountTotal": 0
	};

	var mapGroupStatisticData = function (groupID, groupName, pageNo, pageSize) {
		var currBizData = null,
			hisBizData = [];
		pageNo = parseInt(pageNo);
		pageSize = pageSize || 36;
		currBizData = IX.inherit(dataTpl, {
			groupID : groupID,
			groupName : groupName
		});
		if (pageNo > 0) {
			for (var i = 0; i < pageSize; i++) {
				hisBizData.push(IX.inherit(dataTpl, {
					groupID : groupID,
					groupName : groupName
				}));
			}
		}
		
		return {
			currBizData : currBizData,
			hisBizData : hisBizData
		}
	};

	var getGroupStatistic = function (params) {
		var groupIDLst = $XP(params, 'groupIDLst', '').split(',');
		var cycleType = $XP(params, 'cycleType', 'day'),
			pageNo = $XP(params, 'pageNo', 0),
			pageSize = $XP(params, 'pageSize', 36);
		var ret = {
			currBizData : [],
			hisBizData : []
		};

		_.each(groupIDLst, function (groupID) {
			var groupName = null;
			var groupData = _.find(groupList, function (el) {
				return el.groupID == groupID;
			});
			groupName = $XP(groupData, 'groupLoginName', '');
			var data = mapGroupStatisticData(groupID, groupName, pageNo, pageSize);
			ret.currBizData.push(data.currBizData);
			ret.hisBizData = ret.hisBizData.concat(data.hisBizData);
		});
		return ret;
	};

	Test.getGroupStatistic = getGroupStatistic;

})();