
var chess;

chess = new function() {

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
};

$(window.document).ready(function () {

	iris.baseUri('iris/');
    
    // show the initial screen
    iris.welcome(iris.path.screen.welcome.js);
});
