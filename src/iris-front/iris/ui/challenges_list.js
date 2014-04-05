iris.ui(function (self) {

	// self.settings({
	//	setting : null
	// });

	// var resource = iris.resource(iris.path.resource);

	self.create = function() {
		
		self.tmpl(iris.path.ui.challenges_list.html);

		self.on("load:challenges", self.render);
	};

	self.render = function(p_challenges) {
		for (var i=0, I=p_challenges.length; i<I; i++) {
			self.ui(
				  "challenges"
				, iris.path.ui.challenges_listitem.js
				, p_challenges[i]
			);
		}
	};

},iris.path.ui.challenges_list.js);
