iris.ui(function (self) {

	self.settings({
		  piece: null // FEN notation
		, col: null
		, row: null
	});

	var PIECES_PATH_HASHMAP = {
		  "b": iris.path.ui.bishop.js
		, "k": iris.path.ui.king.js
		, "n": iris.path.ui.knight.js
		, "p": iris.path.ui.pawn.js
		, "q": iris.path.ui.queen.js
		, "r": iris.path.ui.rook.js
	};

	self.create = function() {
		
		self.tmpl(iris.path.ui.piece.html);

		self.ui("piece", PIECES_PATH_HASHMAP[self.setting("piece").toLowerCase()], {
			  col: self.setting("col")
			, row: self.setting("row")
			, color: chess.color.getPieceColor(self.setting("piece"))
		});
	};

	// self.awake = function () {
		
	// };

	// self.sleep = function () {
		
	// };

	// self.destroy = function () {
		
	// };

},iris.path.ui.piece.js);
