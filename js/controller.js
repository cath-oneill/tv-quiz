

var Quizzy = (function() {

	var currentQ, 
		score = 0, 
		random = _.range(QuizzyData.length), 
		currentIndex = 0;

	var checkAnswer = function(input) {
		var response, total;
		if (input === currentQ.answer) {
			response = true;
			score += 10;
		} else {
			response = false;
		}
		total = (currentIndex+ 1)*10;
		feedback(response, score, total);
	};

	var nextQuestion = function() {
		currentIndex ++;
		currentQ = QuizzyData.current(random[currentIndex]);
		QuizzyUI.question(currentQ);
	}

	function startApplication() {
		QuizzyUI.start();
		shuffle(random);
		currentQ = QuizzyData.current(random[currentIndex]); 
		QuizzyUI.question(currentQ);
	}

	function shuffle(arr)
	{
	  for(var j, x, i = arr.length; i; j = parseInt(Math.random() * i), x = arr[--i], arr[i] = arr[j], arr[j] = x);
	  return arr;
	}

	function feedback(response, score, total) {
		if (currentIndex + 1 === QuizzyData.length) {
			QuizzyUI.end(response, score, total);
		} else {
			QuizzyUI.feedback(response, score, total);
		}

	}


	return {
		check: checkAnswer,
		next: nextQuestion,
		start: startApplication
	}

})();


