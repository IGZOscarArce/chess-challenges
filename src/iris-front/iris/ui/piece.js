iris.ui(function (self) {

	self.settings({
		  piece: null // FEN notation
		, col: null
		, row: null
		, color: null
	});

	var PIECES_PATH_HASHMAP = {
		  "b": iris.path.ui.bishop.js
		, "k": iris.path.ui.king.js
		, "n": iris.path.ui.knight.js
		, "p": iris.path.ui.pawn.js
		, "q": iris.path.ui.queen.js
		, "r": iris.path.ui.rook.js
	};

	var
		  chessModel = iris.resource(iris.path.resource.chess.js).getModel()
		, boardModel = chessModel.get("board")
	;

	self.create = function() {

		self.tmpl(iris.path.ui.piece.html);

		var
			color = chess.color.getPieceColor(self.setting("piece"))
		;
		self.setting("color", color);
		self.ui("piece", PIECES_PATH_HASHMAP[self.setting("piece").toLowerCase()], {
			  col: self.setting("col")
			, row: self.setting("row")
			, color: color
		});

		self.get()
			.addClass(color === chess.color.WHITE ? "white" : "black")
			.on("dragstart", onDragStart);
	};

	function onDragStart(p_ev) {
		boardModel.moving(self.settings());
	}

},iris.path.ui.piece.js);
