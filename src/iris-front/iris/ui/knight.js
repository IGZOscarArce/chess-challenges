iris.ui(function (self) {

	self.settings({
		  col: null
		, row: null
		, color: "white" // "white" / "black"
	});

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		
		// self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.knight.html);

		self.setting(
			  "img"
			, self.setting("color") === chess.color.WHITE
				? "img/Chess_ndt45.svg"
				: "img/Chess_nlt45.svg"
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

},iris.path.ui.knight.js);
