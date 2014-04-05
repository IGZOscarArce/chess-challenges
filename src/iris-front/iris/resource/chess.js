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
		if (iris.isLocalhost()) {
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

var _MOCKED_CHALLENGES = [
	{
		  level: "easy"
		, problem_list: [
			{
				  time: 600 // seconds
				, solution_boards: [
					  { fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" }
					, { fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" }
				]
			}
		]
	}
	, {
		  level: "hard"
		, problem_list: [
			{
				  time: 100 // seconds
				, solution_boards: [
					  { fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" }
					, { fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" }
				]
			}
		]
	}
	, {
		  level: "medium"
		, problem_list: [
			{
				  time: 300 // seconds
				, solution_boards: [
					  { fen: "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1" }
					, { fen: "rnbqkbnr/pppppppp/8/8/4P3/8/PPPP1PPP/RNBQKBNR b KQkq e3 0 1" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/8/PPPP1PPP/RNBQKBNR w KQkq c6 0 2" }
					, { fen: "rnbqkbnr/pp1ppppp/8/2p5/4P3/5N2/PPPP1PPP/RNBQKB1R b KQkq - 1 2" }
				]
			}
		]
	}
];
