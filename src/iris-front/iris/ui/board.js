iris.ui(function (self) {

	self.settings({
		fen : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	});

	var
		  chessResource = iris.resource(iris.path.resource.chess.js)
		, chessModel = chessResource.getModel()
		, boardModel
	;

	self.create = function() {
		
		var
			  squares
			, COLS
			// , challengeModel = chessModel.get("active")
			// , problemModel = challengeModel.getActive()
		;
		self.tmpl(iris.path.ui.board.html);

		boardModel = iris.model(iris.path.model.board.js, {
			fen: self.setting("fen")
		});
		chessModel.set("board", boardModel);
		squares = boardModel.get("squares");
		COLS = boardModel.get("COLS");

		for (var row=8, ROW=1; row>=ROW; row--) {
			for (var i=0, I=COLS.length; i<I; i++) {
				self.ui(row, iris.path.ui.square.js, {
					  col: COLS[i]
					, row: row
					, piece: squares[COLS[i]][row].get("piece")
					, color: chess.color.getSquareColor(row, i)
				});
			}
		}
	};

	// self.awake = function () {
		
	// };

	// self.sleep = function () {
		
	// };

	// self.destroy = function () {
		
	// };

},iris.path.ui.board.js);
