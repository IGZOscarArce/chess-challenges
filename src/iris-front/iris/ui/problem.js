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
		self.ui("clock", iris.path.ui.clock.js, {onTimeout: fail});

		self.get("backward").on("click", backward);
		self.get("forward").on("click", forward);
		self.get("initial").on("click", toInitial);
		self.get("final").on("click", toFinal);
		self.get("resolve").on("click", resolve);
		self.get("reject").on("click", fail);

		self.inflate({
			description: problemModel.get("description")
		});
	};

	self.awake = function () {
		var
			time = problemModel.get("time")
		;
		self.ui("clock").start(time);
	};

	self.sleep = function () {
		self.ui("clock").stop();
	};

	self.canSleep = function() {
		return false;
	};

	// self.destroy = function () {
		
	// };

	function resolve() {
		fail();
	}

	function fail() {
		iris.log("You loose!");
	}

	function forward() {
		iris.log("forward");
	}

	function backward() {
		iris.log("backward");
	}

	function toInitial() {
		iris.log("toInitial");
	}

	function toFinal() {
		iris.log("toFinal");
	}

},iris.path.ui.problem.js);
