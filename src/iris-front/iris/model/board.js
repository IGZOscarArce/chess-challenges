iris.model(function (self) {
	
	var
		COLS_HASHMAP = {0: "a", 1: "b", 2: "c", 3: "d", 4: "e", 5: "f", 6: "g", 7: "h"} // Col names
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
		, COLS: ["a", "b", "c", "d", "e", "f", "g", "h"] // Column names sorted
		, ROWS: ["8", "7", "6", "5", "4", "3", "2", "1"] // Row names sorted (FEN has 8th row as the first)
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
	};
	
	self.events('done', 'reject');

	self.create = function(p_settings) {
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
				squares[COLS_HASHMAP[col]][row+1] = iris.model(
					  iris.path.model.square.js
					, {
						  row: row+1
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
			, COLS = self.get("COLS")
			, ROWS = self.get("ROWS")
		;
		for (var i=0, I=ROWS.length; i<I; i++) {
			for (var j=0, J=COLS.length; j<J; j++) {
				fenPos += squares[COLS[j]][ROWS[i]].get("piece") || "v";
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
	
}, iris.path.model.board.js);

