iris.ui(function (self) {

	self.settings({
		challengeModel: null
	});

	var
		  chessResource = iris.resource(iris.path.resource.chess.js)
		, chessModel = chessResource.getModel()
	;

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.challenges_listitem.html);

		self.get().on("click", function() {
			self.get("challengeModel").set("status", "active");
		});
	};

	self.awake = function () {
		chessModel.on("change:level", toggle);
	};

	self.sleep = function () {
		chessModel.off("change:level", toggle);
	};

	function toggle(p_level) {
		self.get().toggle(p_level === self.setting("level"));
	}

},iris.path.ui.challenges_listitem.js);
