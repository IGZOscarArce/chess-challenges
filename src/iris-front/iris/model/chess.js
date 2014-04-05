iris.model(function (self) {
	
	self.defaults = {
		  level: ""	// 'easy' / 'medium' / 'hard'
		, challenges: []
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
			challenges = []
		;
		for (var i=0, I=p_challenges.length; i<I; i++) {
			challenges.push(iris.model(
				  iris.path.model.challenge.js
				, p_challenges[i]
			));
		}
		self.set("challenges", challenges);
		self.notify("load:challenges", challenges);
	};
	
}, iris.path.model.chess.js);
