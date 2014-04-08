iris.model(function (self) {
	
	self.defaults = {
		  level: 'easy' 		// easy / medium / hard
		, description: ""
		, id: ""
		, problems: []			// list of problems
		, status: 'inactive' 	// inactive / active / done / reject
	};
	
	self.events('done:challenge', 'reject:challenge');

	self.create = function() {
		var
			  problems = []
			, problem_list = self.get("problem_list")
		;
		for (var i=0, I=problem_list.length; i<I; i++) {
			problems.push(iris.model(
				  iris.path.model.problem.js
				, problem_list[i]
			));
		}
		self.unset("problem_list");
        self.set("problems", problems);
    };

    self.reject = function(){
    	self.set("status", "reject");
    	self.notify("reject:challenge", self.get("id"));
    };

    self.done = function(){
    	self.set("status", "reject");
    	self.notify("done:challenge", self.get("id"));
    };
	
}, iris.path.model.challenge.js);