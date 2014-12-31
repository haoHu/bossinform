(function ($) {
	IX.ns("Hualala.Storage");
	//4.5M < 5M
	var MAX_STORAGE_SIZE = 4500000; 
	var HDStorage = function () {
		var toBeUpdList = [], toBeDelList = [], toBeUpdValues = {};
		var resetSession = function () {
			toBeUpdList = []; 
			toBeDelList = []; 
			toBeUpdValues = {};
		};
		var _ls = window.localStorage;

		var _getQuota = function () {
			return ("remainingSpace" in _ls) ? _ls.remainingSpace : JSON.stringif(_ls).length;
		};
		var checkQuota = function () {
			return _getQuota() < MAX_STORAGE_SIZE;
		};
		var _length = function () {return _ls.length; };
		var _key = function (idx) {return _ls.key(idx);};
		/**
		 * 返回带有相同前缀的key
		 * 
		 * @param  {String} prefixs 
		 * @return {OBJ}         
		 */
		var _keys = function (prefixs) {
			if (IX.isEmpty(prefixs))
				return null;
			var _strs = prefixs.split("|"), _ht = {};
			var len1 = _strs.length, len2 = _length(), i = 0, j = 0, key;
			for (i = 0; i < len1; i++)
				_ht[_strs[i]] = [];

			var checkMatch = function (k, prefix) {
				var ifMatch = (k.substring(0, prefix.length) == prefix);
				if (ifMatch)
					_ht[prefix].push(k);
				return ifMatch;
			};
			for (i = 0; i < len2; i++) {
				key = _key(i);
				for (j = 0; j < len1; j++)
					if (checkMatch(key, _strs[j]))
						break;
			}
			return _ht;
		};

		var _has = function (key) {
			return IX.isEmpty(_ls.getItem(key));
		};
		var _get = function (key, isNotJSON) {
			var v = _ls.getItem(key);
			return v ? (isNotJSON ? v : JSON.parse(v)) : null;
		};
		var _set = function (key, value, isNotJSON) {
			toBeUpdList.push(key);
			if (toBeUpdValues[key]) {
				var _d = JSON.parse(toBeUpdValues[key]);
				_d = IX.inherit(_d, isNotJSON ? JSON.parse(value) : value);
				toBeUpdValues[key] = JSON.stringify(_d);
			} else {
				toBeUpdValues[key] = isNotJSON ? value : JSON.stringify(value);
			}
		};
		var _remove = function (key) {
			toBeDelList.push(key);
		};
		var _clear = function () {
			_ls.clear();
			resetSession();
		};
		var _commit = function () {
			var updList = IX.Array.toSet(toBeUpdList);
			// 检查所有要删除的key
			IX.iterate(IX.Array.toSet(toBeDelList), function (key) {
				// 从更新列表中删除
				updList = IX.Array.remove(updList, key);	
				//从缓存中删除
				_ls.removeItem(key); 	
			});
			// 检查所有要更新的key
			IX.iterate(updList, function (key) {
				try {
					//更新缓存
					_ls.setItem(key, toBeUpdValues[key]);
				} catch (e) {
					IX.Debug.info(e);
				}
			});
			resetSession();
		};
		return {
			//获得当前存储容量
			getQuota : _getQuota, 
			//判断当前是否存储空间已满
			checkQuota : checkQuota,
			//返回存储空间的key的数量 
			getLength : _length,  
			//key(idx):返回序号对应的键名key
			key : _key,  
			//keys(prefixs):返回带有相同前缀的key；prefixs ： string|prefixs
			keys : _keys,  
			//hasItem(key) : 判断是否存在key对应的数据
			hasItem : _has, 
			//getItem(key, isNotJSON):取得key对应的值--null|JSON Object
			getItem : _get,  
			//setItem(key, value, isNotJSON): 设置key对应的值
			setItem : _set,  
			//removeItem(key):清除key对应的数据
			removeItem : _remove, 
			//clear();清除全部数据， 立即持久化
			clear : _clear, 
			//commit() : 持久化全部更改
			commit : _commit 
		};
	};

	var brandCache = new HDStorage();
	Hualala.Storage.brandCache = {
		get : function (key, isJSON) {
			return brandCache.getItem("brand_" + key, !isJSON);
		},
		set : function (key, val, isJSON) {
			brandCache.setItem("brand_" + key, val, !isJSON);
			brandCache.commit();
		}
	}; 
})(jQuery);