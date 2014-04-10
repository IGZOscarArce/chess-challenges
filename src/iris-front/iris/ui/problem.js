iris.ui(function (self) {

	self.settings({
		index: 0
	});

	var
		  chessResource = iris.resource(iris.path.resource.chess.js)
		, problemModel
		, solution = []			// list of boards (problem solution)
	;

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.problem.html);

		var
			  challengeModel = chessResource.getModel().get("active")
			, fen
		;
		problemModel = challengeModel.get("problems")[self.setting("index")];
		fen = problemModel.get("solution")[0].get("fen");

		self.ui("board", iris.path.ui.board.js, {fen: fen});

		self.inflate({
			description: problemModel.get("description")
		});
	};

	// self.awake = function () {
		
	// };

	// self.sleep = function () {
		
	// };

	// self.destroy = function () {
		
	// };

},iris.path.ui.problem.js);
