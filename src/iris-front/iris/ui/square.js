iris.ui(function (self) {

	self.settings({
		  col: null
		, row: null
		, piece: null 		// FEN notation
		, color: null
	});

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.square.html);

		if (self.setting("piece")) {
			self.ui("piece", iris.path.ui.piece.js, {
				  piece: self.setting("piece")
				, col: null
				, row: null
			});
		}

		self.get().addClass(self.setting("color") === chess.color.WHITE
			? "white"
			: "black"
		);
	};

},iris.path.ui.square.js);
