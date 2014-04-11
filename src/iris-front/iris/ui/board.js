iris.ui(function (self) {

	self.settings({
		fen : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	});

	var
		  chessResource = iris.resource(iris.path.resource.chess.js)
		, chessModel = chessResource.getModel()
		, boardModel
		, squares = {}
	;

	self.create = function() {
		
		var
			  squaresModel
			// , challengeModel = chessModel.get("active")
			// , problemModel = challengeModel.getActive()
		;
		self.tmpl(iris.path.ui.board.html);

		boardModel = iris.model(iris.path.model.board.js, {
			fen: self.setting("fen")
		});
		chessModel.set("board", boardModel);
		squaresModel = boardModel.get("squares");

		for (var row=1, ROW=8; row<=ROW; row++) {
			for (var i=0, I=chess.board.COLS.length; i<I; i++) {
				squares[chess.board.COLS[i]+row] = self.ui(row, iris.path.ui.square.js, {
					  col: chess.board.COLS[i]
					, row: row
					, piece: squaresModel[chess.board.COLS[i]][row].get("piece")
					, color: chess.color.getSquareColor(row, i)
				});
			}
		}

		boardModel.on("move:start",onMoveStart);
		boardModel.on("move:end", onMoveEnd);
		boardModel.on("move:cancel", onMoveCancel);
	};

	function onMoveStart(p_move) {
		self.get().addClass(p_move.from.piece);
	}

	function onMoveEnd(p_move) {
		self.get().removeClass("B b k K n N p P q Q r R");
	}

	function onMoveCancel(p_move) {
		self.get().removeClass("B b k K n N p P q Q r R");
	}

},iris.path.ui.board.js);
