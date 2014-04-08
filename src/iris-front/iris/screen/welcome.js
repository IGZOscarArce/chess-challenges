iris.screen(function (self) {

	var
		  chessResource = iris.resource(iris.path.resource.chess.js)
		, chessModel = chessResource.getModel()
	;

	self.create = function() {
		
		self.tmpl(iris.path.screen.welcome.html);

		self.screens("screens", [
		 	["challenges", iris.path.screen.challenges.js],
		 	["challenge", iris.path.screen.challenge.js],
		 	["result", iris.path.screen.result.js]
		]);

		self.get("nav-easy").on("click", onNavClick);
		self.get("nav-medium").on("click", onNavClick);
		self.get("nav-hard").on("click", onNavClick);
		self.get("nav-home").on("click", onNavClick);
	};

	self.awake = function () {
		if (!document.location.hash) {
			iris.navigate("#/challenges");
		}
	};

	function onNavClick() {
		var
			level = $(this).data("level") || "";
		;
		self.get("nav-easy").removeClass("active");
		self.get("nav-medium").removeClass("active");
		self.get("nav-hard").removeClass("active");
		$(this).addClass("active");
		chessModel.setLevel(level);
	}

},iris.path.screen.welcome.js);
