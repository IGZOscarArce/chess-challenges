
var chess;

chess = new function() {

    this.board = {
        COLS: ["a", "b", "c", "d", "e", "f", "g", "h"] // Column names sorted
      , ROWS: ["8", "7", "6", "5", "4", "3", "2", "1"] // Row names sorted (FEN has 8th row as the first)
    };

    this.piece = {
        isPawn: function (p_fenPiece) {
              return p_fenPiece.toLowerCase() === "p";
        }
    };

    this.color = {
          WHITE: true
        , BLACK: false
        , isWhitePiece: function (p_fenPiece) {
              return p_fenPiece === p_fenPiece.toUpperCase();
          }
        , isBlackPiece: function (p_fenPiece) {
        	   return p_fenPiece === p_fenPiece.toLowerCase();
          }
        , getPieceColor: function (p_fenPiece) {
        	   return p_fenPiece === p_fenPiece.toUpperCase();
          }
        , getSquareColor: function (p_row, p_col) {
        	   return p_row % 2 === 0 && p_col % 2 === 0
        		  || p_row % 2 !== 0 && p_col % 2 !== 0;
          }
    };

    this.image = {};

    this.image[this.color.WHITE] = {
  		  BISHOP: "img/Chess_blt45.svg"
  		, KING: "img/Chess_klt45.svg"
  		, KNIGHT: "img/Chess_nlt45.svg"
  		, PAWN: "img/Chess_plt45.svg"
  		, QUEEN: "img/Chess_qlt45.svg"
  		, ROOK: "img/Chess_rlt45.svg"
  	};
    this.image[this.color.BLACK] = {
        BISHOP: "img/Chess_bdt45.svg"
  		, KING: "img/Chess_kdt45.svg"
  		, KNIGHT: "img/Chess_ndt45.svg"
  		, PAWN: "img/Chess_pdt45.svg"
  		, QUEEN: "img/Chess_qdt45.svg"
  		, ROOK: "img/Chess_rdt45.svg"
    };
};

$(window.document).ready(function () {

	iris.baseUri('iris/');
    
    // show the initial screen
    iris.welcome(iris.path.screen.welcome.js);
});
