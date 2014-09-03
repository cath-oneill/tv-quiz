var QuizzyData = (function(){

	var quizFireData,
		currentQ, 
		quizData;
	
	function getCurrentQ(number) {
		return quizData.questions[number];
	};

	function loadData(quizKey, callback) {
		quizFireData = new Firebase("https://wirequiz.firebaseio.com/quizzes/" + quizKey);
		quizFireData.on('value', function (snapshot) {
  			quizData = snapshot.val();
  			if(callback){callback();}
		}, function (errorObject) {
  			console.log('The read failed: ' + errorObject.code);
		});
	}

	function saveData() {
		quizFireData.set(quizData);
	}

	function incrementCorrect(index) {
		quizData.questions[index].correct += 1;
	}

	function incrementIncorrect(index) {
		quizData.questions[index].incorrect += 1;
	}

	function length() {
		return quizData.questions.length;
	}

	function getHighScores() {
		return quizData.highScores
	}

	function updateHighScores(highScoreArrayFromController) {
		quizData.highScores = highScoreArrayFromController;
	}

	return {
		current: getCurrentQ,
		length: length,
		correctAnswer: incrementCorrect,
		incorrectAnswer: incrementIncorrect,
		load: loadData,
		save: saveData,
		getLeaderboard: getHighScores,
		updateLeaderboard: updateHighScores
	};


})();




