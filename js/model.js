var QuizzyData = (function(){

	var questionFireData = new Firebase("https://wirequiz.firebaseio.com/questions");
	var highScoreFireData = new Firebase("https://wirequiz.firebaseio.com/highScores");

	var currentQ, quizData, highScores;
	
	function getCurrentQ(number) {
		currentQ = quizData[number];
		// this.question = currentQ.question;
		// this.answer   = currentQ.answer;
		return currentQ;
	};

	function getData() {
		questionFireData.on('value', function (snapshot) {
  			quizData = snapshot.val();
			Quizzy.afterData();
		}, function (errorObject) {
  			console.log('The read failed: ' + errorObject.code);
		});

		highScoreFireData.on('value', function(snapshot) {
			highScores = snapshot.val();
			console.log(highScores);
		}, function (errorObject) {
			console.log("Error loading high scores:" + errorObject.code);
		});
	}

	function saveData() {
		questionFireData.set(quizData);
	}

	function incrementCorrect(index) {
		quizData[index].correct += 1;
	}

	function incrementIncorrect(index) {
		quizData[index].incorrect += 1;
	}

	function length() {
		return quizData.length;
	}

	function getHighScores() {
		return highScores
	}

	function updateHighScores(highScoreArrayFromController) {
		highScoreFireData.set(highScoreArrayFromController);
		console.log(highScoreArrayFromController);
	}

	return {
		current: getCurrentQ,
		length: length,
		correctAnswer: incrementCorrect,
		incorrectAnswer: incrementIncorrect,
		start: getData,
		end: saveData,
		getLeaderboard: getHighScores,
		updateLeaderboard: updateHighScores
	};


})();




