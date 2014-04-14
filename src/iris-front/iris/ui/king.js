iris.ui(function (self) {

	self.settings({
		  col: null
		, row: null
		, color: null
	});

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.king.html);
	};

	self.moves = function() {
		var
			  colIndex = chess.board.COLS.indexOf(self.setting("col"))
			, cols = self.setting("col") === "a"
				? ["a", "b"]
				: self.setting("col") === "h"
					? ["g", "h"]
					: [chess.board.COLS[colIndex-1], chess.board.COLS[colIndex], chess.board.COLS[colIndex+1]]
			, rows = self.setting("row") === 1
				? [1, 2]
				: self.setting("row") === 8
					? [7, 8]
					: [self.setting("row")-1, self.setting("row"), self.setting("row")+1]
			, squares = []
			, square
		;
		for (var i=0, I=cols.length; i<I; i++) {
			for (var j=0, J=rows.length; j<J; j++) {
				if (cols[i] !== self.setting("col") || rows[j] !== self.setting("row")) {
					square = iris.model(
						  iris.path.model.square.js
						, {
							  row: rows[j]
							, col: cols[i]
						  }
					);	
					squares.push(square);
				}
			}
		}
		return squares;
	};

	// self.awake = function () {
		
	// };

	// self.sleep = function () {
		
	// };

	// self.destroy = function () {
		
	// };

},iris.path.ui.king.js);
