iris.ui(function (self) {

	self.settings({
		  col: null
		, row: null
		, color: null
		, img: "" // "img/Chess_rdt45.svg" / "img/Chess_rlt45.svg"
	});

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		
		// self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.rook.html);

		self.setting(
			  "img"
			, self.setting("color") === chess.color.WHITE
				? "img/Chess_rdt45.svg"
				: "img/Chess_rlt45.svg"
		);

		self.inflate({
			img: self.setting("img")
		});
	};

	// self.awake = function () {
		
	// };

	// self.sleep = function () {
		
	// };

	// self.destroy = function () {
		
	// };

},iris.path.ui.rook.js);
