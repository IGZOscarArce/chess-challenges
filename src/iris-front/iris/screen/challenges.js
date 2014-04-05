iris.screen(function (self) {

	var
		  chessResource = iris.resource(iris.path.resource.chess.js)
		, chessModel = chessResource.getModel()
	;

	self.create = function() {
		
		self.tmpl(iris.path.screen.challenges.html);

		self.ui("challenges", iris.path.ui.challenges_list.js);
		chessModel.load("challenges");
	};

	// self.awake = function () {

	// };

	// self.sleep = function () {

	// };

},iris.path.screen.challenges.js);
