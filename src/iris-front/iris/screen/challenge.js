iris.screen(function (self) {

	var
		  chessResource = iris.resource(iris.path.resource.chess.js)
		, chessModel = chessResource.getModel()
		, challengeModel
	;

	self.create = function() {
		
		self.tmpl(iris.path.screen.challenge.html);
	};

	self.awake = function () {
		challengeModel = chessModel.get("active");

		if (!challengeModel) {
			iris.navigate("#/challenges");
		}
		else {
			var
				  problems = challengeModel.get("problems")
				, i = 0
				, I = problems.length
			;
			for (; i<I; i++) {
				self.ui("problems", iris.path.ui.problem.js, {index: i});
			}
			self.inflate({description: challengeModel.get("description")});
		}
	};

	self.canSleep = function () {
		return false;
	};

	self.sleep = function () {
		
	};

	// self.destroy = function () {
		
	// };

},iris.path.screen.challenge.js);
