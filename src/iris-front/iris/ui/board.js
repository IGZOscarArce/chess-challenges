iris.ui(function (self) {

	self.settings({
		fen : "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
	});

	var
		  chessResource = iris.resource(iris.path.resource.chess.js)
		, chessModel = chessResource.getModel()
		, boardModel
		, squares = {}
		, fens = []
	;

	self.create = function() {
		
		var
			  squaresModel
			// , challengeModel = chessModel.get("active")
			// , problemModel = challengeModel.getActive()
		;
		self.tmpl(iris.path.ui.board.html);

		fens.push(self.setting("fen"));
		boardModel = iris.model(iris.path.model.board.js, {
			fen: self.setting("fen")
		});
		chessModel.set("board", boardModel);
		squaresModel = boardModel.get("squares");

		for (var row=1, ROW=8; row<=ROW; row++) {
			for (var i=0, I=chess.board.COLS.length; i<I; i++) {
				squares[squareKey(i ,row)] = self.ui(row, iris.path.ui.square.js, {
					  col: chess.board.COLS[i]
					, row: row
					, piece: squaresModel[chess.board.COLS[i]][row].get("piece")
					, color: chess.color.getSquareColor(row, i)
				});
			}
		}

		boardModel.on("move:start",onMoveStart);
		boardModel.on("move:end", onMoveEnd);
		boardModel.on("move:reject", onMoveReject);
	};

	function squareKey(p_col, p_row) {
		var
			col = !isNaN(p_col) ? chess.board.COLS[p_col] : p_col
		;
		return col+p_row;
	}

	function onMoveStart(p_move) {
		self.get().addClass(p_move.from.piece); // Change cursor image (moving piece img)
	}

	function onMoveEnd(p_move) {
		self.setting("fen", p_move.fen);
		fens.push(self.setting("fen"));
		self.get().removeClass("B b k K n N p P q Q r R"); // Change cursor image (remove moving piece img)
	}

	function onMoveReject(p_move) {
		var
			  moving = p_move.from
			, movingSquareKey = squareKey(moving.col, moving.row)
			, movingSquare = squares[movingSquareKey]
		;
		movingSquare.setPieceMoving(false);
		self.get().removeClass("B b k K n N p P q Q r R"); // Change cursor image (remove moving piece img)
	}

},iris.path.ui.board.js);
