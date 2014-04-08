iris.model(function (self) {
	
	self.defaults = {
		  level: ""	// 'easy' / 'medium' / 'hard'
		, challenges: {}
		, active: null
	};
	
	var
		AVAILABLE_LEVEL = {
			  "easy": "easy"
			, "medium": "medium"
			, "hard": "hard"
		}
	;
	
	self.events("change:level", "load:challenges");
	
	self.setLevel = function(p_value){
		var
			level = AVAILABLE_LEVEL[p_value] || ""
		;
		self.set("level", level);
		self.notify("change:level", level);
	};
	
	self.setChallenges = function(p_challenges){
		var
			challenges = {}
		;
		for (var key in p_challenges) {
			challenges[key] = iris.model(
				  iris.path.model.challenge.js
				, p_challenges[key]
			);
		}
		self.set("challenges", challenges);
	};

	self.setActive = function(p_challengeId){
		var
			challenge = self.get("challenges")[p_challengeId]
		;
		if (challenge) {
			self.set("active", challenge);
		}
	};
	
}, iris.path.model.chess.js);
