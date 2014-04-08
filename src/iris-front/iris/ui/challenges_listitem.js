iris.ui(function (self) {

	self.settings({
		challenge: null
	});

	var
		  chessResource = iris.resource(iris.path.resource.chess.js)
		, chessModel = chessResource.getModel()
	;

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.challenges_listitem.html);

		self.get().on("click", function() {
			chessModel.setActive(self.setting("challenge"));
		});

		var
			challangeModel = chessModel.get("challenges")[self.setting("challenge")]
		;
		self.inflate({
			  description: challangeModel.get("description")
			, level: challangeModel.get("level")
		});
	};

	self.awake = function () {
		chessModel.on("change:level", toggle);
	};

	self.sleep = function () {
		chessModel.off("change:level", toggle);
	};

	function toggle(p_levelFilter) {
		self.get().toggle(
			  !p_levelFilter
			|| p_levelFilter === self.setting("challengeModel").get("level")
		);
	}

},iris.path.ui.challenges_listitem.js);
