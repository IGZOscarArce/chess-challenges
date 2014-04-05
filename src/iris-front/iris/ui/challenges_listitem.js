iris.ui(function (self) {

	self.settings({
		level : "" // "easy" / "medium" / "hard"
	});

	self.create = function() {
		
		self.tmplMode(self.APPEND);
		self.tmpl(iris.path.ui.challenges_listitem.html);
	};

	self.awake = function () {
		chessModel.on("change:change", toggle);
	};

	self.sleep = function () {
		chessModel.off("change:change", toggle);
	};

	function toggle(p_level) {
		self.get().toggle(p_level === self.setting("level"));
	}

},iris.path.ui.challenges_listitem.js);
