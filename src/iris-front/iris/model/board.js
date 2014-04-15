iris.model(function (self) {
	
	var
		  COLS_HASHMAP = {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"} // Col names
		, MOVES_HASHMAP = {
			  "K": kingMoves
			, "Q": queenMoves
			, "R": rookMoves
			, "B": bishopMoves
			, "N": knightMoves
			, "P": pawnMoves
		}
	;
	
	self.defaults = {
		  squares: {
			    a: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}
			  , b: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}
			  , c: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}
			  , d: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}
			  , e: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}
			  , f: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}
			  , g: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}
			  , h: {1: null, 2: null, 3: null, 4: null, 5: null, 6: null, 7: null, 8: null}
		  }
		, fen: ""			// FEN
		, position: ""		// Position in FEN notation
		, turn: "w"			// "w" means White moves next, "b" means Black
		, passant: "-"		// En passant target square in algebraic notation or "-"
		, halfmoves: 0		// Halfmove clock: number of halfmoves since the last capture or pawn advance
		, fullmoves: 1		// Number of the full move: is incremented after Black's move
		, casting: "KQkq"	// Castling availability. If neither side can castle, this is "-".
							// Otherwise, this has one or more letters: 
							// "K" (White can castle kingside), 
							// "Q" (White can castle queenside), 
							// "k" (Black can castle kingside),
							// and/or "q" (Black can castle queenside)
		, moving: null 		// Square
	};
	
	self.events('move:start', 'move:end', 'move:reject', 'move:start:reject');

	self.create = function() {
		////////////////////////////////////////
		// FEN (initial chess position):
		// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
		// show: http://http://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
		var
			  fen = self.get("fen")
			, positionVals = fen.split(" ")
		;
        self.set({
			  position: positionVals[0]
			, turn: positionVals[1]
			, casting: positionVals[2]
			, passant: positionVals[3]
			, halfmoves: positionVals[4]
			, fullmoves: positionVals[5]
			, squares: fenToSquares(positionVals[0])
		});
    };

    self.moveCancel = function() {
    	self.notify("move:reject", {
    		from: self.get("moving")
    	});
    	self.set("moving", null);
    };

    self.move = function(p_square) {
    	if (self.get("moving")) { // Finish move
    		moved(p_square);
    	}
    	else { // Start move
    		moving(p_square);
    	}
    };

    function moving(p_square) {
    	if (p_square.piece
    		&& (
    			   chess.color.isWhitePiece(p_square.piece) && self.get("turn") === "w"
    			|| chess.color.isBlackPiece(p_square.piece) && self.get("turn") === "b"
    		)
    	) {
    		self.set("moving", p_square);
    		self.notify("move:start", {
    			from: p_square
    		});
    	}
    	else {
    		self.notify("move:start:reject", {
    			from: p_square
    		});
    	}
    };

    function moved(p_square) {
    	var
    		  square = self.get("moving")
    		, squares = self.get("squares")
    		, from = squares[square.col][square.row]
    		, to = squares[p_square.col][p_square.row]
    		, pieceMoved = from.get("piece")
    		, pieceEaten = to.get("piece")
    	;
    	if (isValidMove(from, to)) {
	    	// TODO: update board
	    	var
	    		  turn = self.get("turn")
	    		, position
	    	;
	    	to.set("piece", from.get("piece"));
	    	from.set("piece", null);
	    	self.set("moving", null);
	    	self.set("turn", turn === "w" ? "b" : "w");
	    	self.set("halfmoves", pieceEaten || chess.piece.isPawn(pieceMoved)
	    		? 0
	    		: (self.get("halfmoves") >> 0) + 1
	    	);
	    	if (turn === "b") {
	    		self.set("fullmoves", (self.get("fullmoves") >> 0) + 1);
	    	}
	    	// TODO: update passant & casting
	    	//self.set("piece", null);
	    	position = squaresToFenPos()
	    	self.set("position", position);
	    	self.set("fen", position + " " + self.get("turn") + " " + self.get("casting") + " " + self.get("passant") + " " + self.get("halfmoves") + " " + self.get("fullmoves"));
	    	self.notify("move:end", {
	    		  piece: pieceMoved
	    		, from: from
	    		, to: to
	    		, fen: self.get("fen")
	    	});
	    }
	    else {
	    	self.moveCancel();
	    }
    };
	
	function fenToSquares(p_fenPos) {
		var
			  squaresFen
			, fenPos = p_fenPos || self.get("position")
			, rows = fenPos
				.replace(/8/g, "        ")
				.replace(/7/g, "       ")
				.replace(/6/g, "      ")
				.replace(/5/g, "     ")
				.replace(/4/g, "    ")
				.replace(/3/g, "   ")
				.replace(/2/g, "  ")
				.replace(/1/g, " ")
				.split("/")
			, squares = self.get("squares")
		;
		for (var row=0; row<8; row++) {
			squaresFen = rows[row].split("");
			for (var col=0; col<8; col++) {
				squares[COLS_HASHMAP[col]][8-row] = iris.model(
					  iris.path.model.square.js
					, {
						  row: 8-row
						, col: COLS_HASHMAP[col]
						, piece: squaresFen[col].trim()
					}
				);
			}
		}
		
		return squares;
	}
	
	function squaresToFenPos(p_squares) {
		var
			  squares = p_squares || self.get("squares")
			, fenPos = ""
		;
		for (var i=0, I=chess.board.ROWS.length; i<I; i++) {
			for (var j=0, J=chess.board.COLS.length; j<J; j++) {
				fenPos += squares[chess.board.COLS[j]][chess.board.ROWS[i]].get("piece") || "v";
			}
			fenPos += "/";
		}
		fenPos = fenPos.substr(0, fenPos.length-1) // remove las separator ('/')
			.replace(/vvvvvvvv/g, 8)
			.replace(/vvvvvvv/g, 7)
			.replace(/vvvvvv/g, 6)
			.replace(/vvvvv/g, 5)
			.replace(/vvvv/g, 4)
			.replace(/vvv/g, 3)
			.replace(/vv/g, 2)
			.replace(/v/g, 1)
		;
		
		return fenPos;
	}

	function isValidMove(p_squareFrom, p_squareTo) {
		if (p_squareFrom.get("row") === p_squareTo.get("row") && p_squareFrom.get("col") === p_squareTo.get("col")) {
			return false;
		}
		else {
			var
				  pieceMoved = p_squareFrom.get("piece")
				, pieceEated = p_squareTo.get("piece")
			;
			if (chess.color.getPieceColor(pieceMoved) === chess.color.getPieceColor(pieceEated)) {
				return false;
			}
			if (!MOVES_HASHMAP[pieceMoved.toUpperCase()](p_squareFrom, p_squareTo)) { // Check if piece can move to this square without any consideration
				return false;
			}
			
		}

		return true;
	}

	function kingMoves(p_squareFrom, p_squareTo) {
		var
			  squares = []
			, col = p_squareFrom.get("col")
			, row = p_squareFrom.get("row")
			, colIndex = chess.board.COLS.indexOf(p_squareFrom.get("col"))
			, cols = col === "a"
				? ["a", "b"]
				: col === "h"
					? ["g", "h"]
					: [chess.board.COLS[colIndex-1], chess.board.COLS[colIndex], chess.board.COLS[colIndex+1]]
			, rows = row === 1
				? [1, 2]
				: row === 8
					? [7, 8]
					: [row-1, row, row+1]
		;
		for (var i=0, I=cols.length; i<I; i++) {
			for (var j=0, J=rows.length; j<J; j++) {
				if (cols[i] !== col || rows[j] !== row) {
					square = iris.model(
						  iris.path.model.square.js
						, {
							  row: rows[j]
							, col: cols[i]
						  }
					);
					if (!p_squareTo) {
						squares.push(square);
					}
					else if (p_squareTo.get("col") === cols[i] && p_squareTo.get("row") === rows[j]) {
						squares.push(square);
						break;
					}
				}
			}
		}

		return p_squareTo
			? squares.length > 0
			: squares
		;
	}

	function queenMoves(p_squareFrom, p_squareTo) {
		var
			  moves = []
			, piece = p_squareFrom.get("piece").toUpperCase()
		;
		return p_squareTo
			? moves.length > 0
			: moves
		;
	}

	function rookMoves(p_squareFrom, p_squareTo) {
		var
			  moves = []
			, piece = p_squareFrom.get("piece").toUpperCase()
		;
		return p_squareTo
			? moves.length > 0
			: moves
		;
	}

	function bishopMoves(p_squareFrom, p_squareTo) {
		var
			  moves = []
			, piece = p_squareFrom.get("piece").toUpperCase()
		;
		return p_squareTo
			? moves.length > 0
			: moves
		;
	}

	function knightMoves(p_squareFrom, p_squareTo) {
		var
			  moves = []
			, piece = p_squareFrom.get("piece").toUpperCase()
		;
		return p_squareTo
			? moves.length > 0
			: moves
		;
	}

	function pawnMoves(p_squareFrom, p_squareTo) {
		var
			  moves = []
			, piece = p_squareFrom.get("piece").toUpperCase()
		;
		return p_squareTo
			? moves.length > 0
			: moves
		;
	}
	
}, iris.path.model.board.js);

