iris.model(function (self) {
	
	self.defaults = {
		  time: 120				// Time for resolve (seconds)
		, solution: []			// list of boards (problem solution)
		, status: 'inactive' 	// inactive / active / done / reject
	};
	
	self.events('inactived', 'actived', 'done', 'reject');

	self.create = function(p_settings) {
		var
			positions = []
		;
		for (var i=0, I=p_settings.solution_boards; i<I; i++) {
			positions.push(iris.model(
				  iris.path.model.board.js
				, p_settings.solution_boards[i]
			));
		}
        self.set("positions", positions);
    };
	
}, iris.path.model.problem.js);