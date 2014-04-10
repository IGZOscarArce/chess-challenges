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

		self.inflate({
			img: chess.image[self.setting("color")].KING
		});
	};

	// self.awake = function () {
		
	// };

	// self.sleep = function () {
		
	// };

	// self.destroy = function () {
		
	// };

},iris.path.ui.king.js);
