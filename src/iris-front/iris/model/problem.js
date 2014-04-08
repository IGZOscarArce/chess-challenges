iris.model(function (self) {
	
	self.defaults = {
		  time: 0				// Time for resolve (seconds)
		, solution: []			// list of boards (problem solution)
		, status: 'inactive' 	// inactive / active / done / reject
		, description: ''
	};
	
	self.events('inactived', 'actived', 'done', 'reject');

	self.create = function() {
		var
			  positions = []
			, solution_boards = self.get("solution_boards")
		;
		for (var i=0, I=solution_boards.length; i<I; i++) {
			positions.push(iris.model(
				  iris.path.model.board.js
				, solution_boards[i]
			));
		}
		self.unset("solution_boards");
        self.set("solution", positions);
    };
	
}, iris.path.model.problem.js);