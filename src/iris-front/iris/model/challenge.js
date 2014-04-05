iris.model(function (self) {
	
	self.defaults = {
		  level: 'easy' 		// easy / medium / hard
		, problems: []			// list of problems
		, status: 'inactive' 	// inactive / active / done / reject
	};
	
	self.events('done', 'reject');

	self.create = function(p_settings) {
		var
			problems = []
		;
		for (var i=0, I=p_settings.problem_list.length; i<I; i++) {
			problems.push(iris.model(
				  iris.path.model.challenge.js
				, p_settings.problem_list[i]
			));
		}
        self.set("problems", problems);
    };
	
}, iris.path.model.challenge.js);