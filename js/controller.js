

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
			score += 10;
			QuizzyData.correctAnswer(random[currentIndex]);
		} else {
			response = false;
			QuizzyData.incorrectAnswer(random[currentIndex]);
		}
		total = (currentIndex+ 1)*10;
		percent = currentQ.correct * 100 / (currentQ.incorrect + currentQ.correct)
		feedback(response, score, total, percent);
	};

	var nextQuestion = function() {
		currentIndex ++;
		currentQ = QuizzyData.current(random[currentIndex]);
		QuizzyUI.question(currentQ);
	}

	function startApplication() {
		QuizzyData.start();
	}

	function continueStart() {
		length = QuizzyData.length();
		random = _.range(length); 
		shuffle(random);
		currentQ = QuizzyData.current(random[currentIndex]); 
		QuizzyUI.question(currentQ);
		QuizzyUI.start();
	}

	function highScoreLimit() {
		return highScores[9]["Score"];
	}

	function addHighScore(username, score) {
		highScores[9] = {"Username" : username, "Score" : score};
		highScores = highScores.sort(function(a,b) { return parseFloat(b.score) - parseFloat(a.score) } );
		QuizzyData.updateLeaderboard(highScores);
	}

	function shuffle(arr)
	{
	  for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
	  return arr;
	}

	function feedback(response, score, total, percent) {
		if (currentIndex + 1 === length) {
			highScores = QuizzyData.getLeaderboard();
			console.log(highScores);
			if (score >= highScoreLimit()) {
				user = QuizzyUI.getUsername();
				addHighScore(user, score);
			} 
			QuizzyData.end();
			QuizzyUI.end(response, score, total, highScores);
		} else {
			QuizzyUI.feedback(response, score, total, percent);
		}

	}


	return {
		check: checkAnswer,
		next: nextQuestion,
		start: startApplication,
		afterData: continueStart
	}

})();


