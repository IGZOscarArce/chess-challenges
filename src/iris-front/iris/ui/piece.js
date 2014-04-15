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

		self.tmplMode(self.APPEND);
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
		;

		// boardModel.on("move:start", function(p_move) {
		// 	if (p_move.from.col === self.setting("col") && p_move.from.row === self.setting("row")) {
		// 		self.get().addClass("moving");
		// 	}
		// });
		// boardModel.on("move:reject", function(p_move) {
		// 	if (p_move.from.col === self.setting("col") && p_move.from.row === self.setting("row")) {
		// 		self.get().removeClass("moving");
		// 	}
		// });
	};

	self.moves = function(p_squareTo) {
		return self.ui("piece")[0].moves(p_squareTo);
	};

	self.setMoving = function(p_moving) {
		// TODO: toggle?
		//self.get().removeClass("moving", p_moving);
		if (!p_moving) {
			self.get().removeClass("moving");
		}
		else {
			self.get().addClass("moving");
		}
	};

},iris.path.ui.piece.js);
