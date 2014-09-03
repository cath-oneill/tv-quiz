var QuizzyData = (function(){

	var quizFireData,
		currentQ, 
		quizData;
	
	function loadData(quizKey, callback) {
		quizFireData = new Firebase("https://wirequiz.firebaseio.com/quizzes/" + quizKey);
		quizFireData.on('value', function (snapshot) {
  			quizData = snapshot.val();
  			if(callback){callback();}
		}, function (errorObject) {
  			console.log('The read failed: ' + errorObject.code);
		});
	}
	
	function getHeaderData() {
		return quizData.header;
	}
	
	function length() {
		return quizData.questions.length;
	}

	function getCurrentQ(number) {
		return quizData.questions[number];
	};

	function incrementCorrect(index) {
		quizData.questions[index].correct += 1;
	}

	function incrementIncorrect(index) {
		quizData.questions[index].incorrect += 1;
	}

	function getHighScores() {
		return quizData.highScores
	}

	function updateHighScores(highScoreArrayFromController) {
		quizData.highScores = highScoreArrayFromController;
	}

	function getSplashImage() {
		return quizData.splashImage;
	}

	function saveData() {
		quizFireData.set(quizData);
	}


	return {
		current: getCurrentQ,
		length: length,
		header: getHeaderData,
		correctAnswer: incrementCorrect,
		incorrectAnswer: incrementIncorrect,
		load: loadData,
		save: saveData,
		getLeaderboard: getHighScores,
		updateLeaderboard: updateHighScores,
		splashImage: getSplashImage
	};


})();




