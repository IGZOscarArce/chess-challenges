iris.ui(function (self) {

	self.settings({
		  col: null
		, row: null
		, piece: null 		// FEN notation
		, color: null
	});

	var
		  chessModel = iris.resource(iris.path.resource.chess.js).getModel()
		, boardModel = chessModel.get("board")
		, squareModel
	;

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.square.html);

		squareModel = boardModel.get("squares")[self.setting("col")][self.setting("row")];

		if (self.setting("piece")) {
			self.ui("piece", iris.path.ui.piece.js, {
				  piece: self.setting("piece")
				, col: self.setting("col")
				, row: self.setting("row")
			});
		}

		self.get().addClass(self.setting("color") === chess.color.WHITE
			? "white"
			: "black"
		);

		self.get().on("touch click", onSquareClick);
		squareModel.on("change", onChanged);
	};

	function onSquareClick(p_ev) {
		p_ev.stopPropagation();
		boardModel.move(self.settings());
		return;
	}

	function onChanged(p_changed) {
		var
			piece = squareModel.get("piece")
		;
		self.destroyUIs("piece");
		if (piece) {
			self.setting("piece", piece);
			self.ui("piece", iris.path.ui.piece.js, {
				  piece: piece
				, col: self.setting("col")
				, row: self.setting("row")
			});
		}
	}

},iris.path.ui.square.js);
