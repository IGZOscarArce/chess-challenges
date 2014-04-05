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

		chessModel.on("load:challenges", self.render);
	};

	self.render = function(p_challenges) {
		for (var i=0, I=p_challenges.length; i<I; i++) {
			self.ui(
				  "challenges"
				, iris.path.ui.challenges_listitem.js
				, {
					challengeModel: p_challenges[i]
				}
			);

		}
	};

},iris.path.ui.challenges_list.js);
