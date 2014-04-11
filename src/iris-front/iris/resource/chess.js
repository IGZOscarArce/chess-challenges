iris.resource(function (self) {

	self.settings({
		type : 'json',
		path: 'chess/'
	});
	
	var
		model = iris.model(iris.path.model.chess.js)
	;

	self.load = function (id) {
		return self.get(id);
	};

	self.loadChallenges = function() {
		if (iris.isLocalhost() || true) {
			var
				dfd = new jQuery.Deferred()
			;
			dfd.resolve(_MOCKED_CHALLENGES);

			return dfd.promise()
				.done(model.setChallenges)
			;
		}
		else {
			return self.get("challenges")
				.done(model.setChallenges)
			;
		}
	};
	
	self.getModel = function() {
		return model;
	};

}, iris.path.resource.chess.js);

var _MOCKED_CHALLENGES = {
	  1: {
		  level: "easy"
		, id: 1
		, description: "Challange 1"
		, problem_list: [
			{
				  time: 600 // seconds
				, description: "problem 1"
				, solution_boards: [
					  { fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" }
					, { fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" }
				]
			}
		]
	}
	, 2: {
		  level: "hard"
		, id: 2
		, description: "Challange 2"
		, problem_list: [
			{
				  time: 100 // seconds
				, description: "problem 2"
				, solution_boards: [
					  { fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" }
					, { fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" }
				]
			}
		]
	}
	, 3: {
		  level: "medium"
		, id: 3
		, description: "Challange 3"
		, problem_list: [
			{
				  time: 300 // seconds
				, description: "problem 3"
				, solution_boards: [
					  { fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" }
					, { fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" }
				]
			}
		]
	}
};
