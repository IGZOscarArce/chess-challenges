iris.model(function (self) {
	
	var
		  COLS_HASHMAP = {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"} // Col names
		, COLS = ["a", "b", "c", "d", "e", "f", "g", "h"] // Column names sorted
		, ROWS = ["8", "7", "6", "5", "4", "3", "2", "1"] // Row names sorted (FEN has 8th row as the first)
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
		, fen: ""			// Position in FEN notation
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
	};
	
	self.events('done', 'reject');

	self.create = function(p_settings) {
		////////////////////////////////////////
		// FEN (initial chess position):
		// rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1
		// show: http://http://en.wikipedia.org/wiki/Forsyth%E2%80%93Edwards_Notation
		var
			positionVals = p_settings.fen.split(" ")
		;
        self.set({
			  fen: positionVals[0]
			, turn: positionVals[1]
			, casting: positionVals[2]
			, passant: positionVals[3]
			, halfmoves: positionVals[4]
			, fullmoves: positionVals[5]
			, squares: fenToSquares(positionVals[0])
		});
    };
	
	function fenToSquares(p_fenPos) {
		var
			  squaresFen
			, fenPos = p_fenPos || self.get("fen")
			, rows = fenPos
				.replace("8", "        ")
				.replace("7", "       ")
				.replace("6", "      ")
				.replace("5", "     ")
				.replace("4", "    ")
				.replace("3", "   ")
				.replace("2", "  ")
				.replace("1", " ")
				.split("/")
			, squares = self.get("squares")
		;
		for (var row=0; row<8; row++) {
			squaresFen = rows[row].split("");
			for (var col=0; col<8; col++) {
				squares[COLS_HASHMAP[col]][row+1](iris.model(
					  iris.path.model.square.js
					, {
						  row: row+1
						, col: COLS_HASHMAP[col]
						, piece: squaresFen[col].trim()
					}
				));
			}
		}
		
		return squares;
	}
	
	function squaresToFenPos(p_squares) {
		var
			  squares = p_squares || self.get("squares")
			, fenPos = ""
		;
		for (var i=0, I=ROWS.length; i<I; i++) {
			for (var j=0, J=COLS.length; j<J; j++) {
				fenPos += squares[COLS[j]][ROWS[i]].get("piece") || "v";
			}
			fenPos += "/";
		}
		fenPos = fenPos.substr(0, fenPos.length-1) // remove las separator ('/')
			.replace("vvvvvvvv", 8)
			.replace("vvvvvvv", 7)
			.replace("vvvvvv", 6)
			.replace("vvvvv", 5)
			.replace("vvvv", 4)
			.replace("vvv", 3)
			.replace("vv", 2)
			.replace("v", 1)
		;
		
		return fenPos;
	}
	
}, iris.path.model.challenge.js);
