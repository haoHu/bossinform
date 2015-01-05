(function ($, window) {
	IX.ns("Hualala.Model");
	var HG = Hualala.Global,
		HM = Hualala.Model,
		HT = Hualala.TypeDef,
		HC = Hualala.Constants;

	var getAllGroupIDs = function () {
		var sessionData = Hualala.getSessionData();
		var groupIDs = _.map(sessionData, function (grp) {
			return $XP(grp, 'groupID');
		});
		return groupIDs.join(',');
	};

	var ProfileModel = Stapes.subclass({
		constructor : function () {
			this.profileType = null;
			this.profileData = null;
			this.profileHT = new IX.IListManager();
		}
	});

	ProfileModel.proto({
		init : function (cfg) {
			var self = this;
			this.profileType = $XP(cfg, 'profileType');
			this.profileData = $XP(cfg, 'profileData');
			_.each(this.profileData, function (el) {
				var groupID = $XP(el, 'groupID');
				self.profileHT.register(groupID, el);
			});
		},
		getProfileInfo : function () {
			var self = this;
			var profileInfo = this.profileHT.getAll()[0];
			return profileInfo;
		}
	});

	HM.ProfileModel = ProfileModel;
	
})(jQuery, window);