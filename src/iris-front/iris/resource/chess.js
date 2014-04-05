iris.resource(function (self) {

	self.settings({
		type : 'json',
		path: 'chess/'
	});
	
	var
		model = iris.model(iris.path.model.chess.js)
	;

	self.load = function (id) {
		return self.get(id);
	};

	self.loadChallenges = function() {
		return self.get("challenges")
			.done(model.setChallenges)
		;
	};
	
	self.getModel = function() {
		return model;
	};

}, iris.path.resource.chess.js);
