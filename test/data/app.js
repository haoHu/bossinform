(function () {
	IX.ns("Test");
	var getRandom = function (n, m) {
		var c = m - n + 1;
		return Math.floor(Math.random() * c + n);
	};
	var groupCount = 5;
	var groupDataTpl = {
		groupID : '',
		groupLoginName : '集团',
		loginName : '子账号名称',
		userMobile : '13322222222',
		userEmail : '',
		mobileBinded : 1,
		userName : '用户名',
		userRemark : "",
		lastLoginTime : '',
		loginCount : 1
	};
	var groupDatas = (function (total) {
		var ret = [];
		for (var i = 0; i < total; i++) {
			var id = i + 1;
			ret.push(IX.inherit(groupDataTpl, {
				groupID : id,
				groupLoginName : '集团' + id,
				loginName : '子账号名称' + id,
				// loginName : 'admin',
				mobileBinded : 1,
				userName : '用户名'
			}));
		}
		return ret;
	})(groupCount);
	Test.GroupCount = groupCount;
	Test.GroupList = groupDatas;
	
	Test.getRandom = getRandom;
})();