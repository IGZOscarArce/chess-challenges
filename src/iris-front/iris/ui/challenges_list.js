iris.ui(function (self) {

	// self.settings({
	//	setting : null
	// });

	var
		  chessResource = iris.resource(iris.path.resource.chess.js)
		, chessModel = chessResource.getModel()
	;

	self.create = function() {
		
		self.tmpl(iris.path.ui.challenges_list.html);

		//chessModel.on("load:challenges", self.render);
	};

	self.render = function(p_challenges) {
		for (var key in p_challenges) {
			self.ui("challenges", iris.path.ui.challenges_listitem.js, {challenge: key});
		}
	};

},iris.path.ui.challenges_list.js);
