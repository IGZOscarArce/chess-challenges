iris.screen(function (self) {

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		
		self.tmpl(iris.path.screen.welcome.html);

		self.screens("screens", [
		 	["home", iris.path.screen.home.js],
		 	["result", iris.path.screen.result.js],
		 	["challenge", iris.path.screen.challenge.js],
		]);
	};

	self.awake = function () {
		iris.navigate("#/home");
	};

},iris.path.screen.welcome.js);
