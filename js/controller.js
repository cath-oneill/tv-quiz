var Quizzy = (function() {

	var currentQ,
		score = 0,
		random,
		length,
		currentIndex = 0,
		highScores;

	var checkAnswer = function(input) {
		var response, total;
		if (input === currentQ.answer) {
			response = true;
			score += 1;
			QuizzyData.correctAnswer(random[currentIndex]);
		} else {
			response = false;
			QuizzyData.incorrectAnswer(random[currentIndex]);
		}
		total = currentIndex + 1;
		percent = currentQ.correct * 100 / (currentQ.incorrect + currentQ.correct);
		endOfTurn(response, score, total, percent);
	};

	var nextQuestion = function() {
		currentIndex ++;
		currentQ = QuizzyData.current(random[currentIndex]);
		QuizzyUI.question(currentQ);
	};

	function startQuiz() {
		QuizzyUI.start();
		QuizzyData.load(function() {
			length = QuizzyData.length();
			random = _.range(length);
			shuffle(random);
			currentQ = QuizzyData.current(random[currentIndex]);
			QuizzyUI.question(currentQ);
		});
		score = 0;
		currentIndex = 0;
	}

	function highScoreLimit() {
		return highScores[9]["Score"];
	}

	function addHighScore(username, score) {
		highScores[9] = {"Username" : username, "Score" : score};
		highScores = highScores.sort(function(a,b) { return parseFloat(b.Score) - parseFloat(a.Score) } );
		QuizzyData.updateLeaderboard(highScores);
	}

	function shuffle(arr) {
	  for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
	  return arr;
	}

	function endOfTurn(response, score, total, percent) {
		if (currentIndex + 1 === length) {
			highScores = QuizzyData.getLeaderboard();
			var percentScore = (score*100)/total;
			if (score >= highScoreLimit()) {
				user = QuizzyUI.getUsername();
				addHighScore(user, score);
			} 
			QuizzyData.save();
			QuizzyUI.end(percentScore, highScores);
		} else {
			QuizzyUI.feedback(response, score, total, percent);
		}

	}


	return {
		check: checkAnswer,
		next: nextQuestion,
		start: startQuiz,
	}

})();


