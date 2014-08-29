var QuizzyData = (function(){

	var ref = new Firebase("https://wirequiz.firebaseio.com/questions");

	var currentQ, quizData;
	
	function getCurrentQ(number) {
		currentQ = quizData[number];
		currentQ.number = number;
		this.question = currentQ.question;
		this.answer   = currentQ.answer;
		this.number = number;
		return currentQ;
	};

	function getData() {
		ref.on('value', function (snapshot) {
  			quizData = snapshot.val();
			Quizzy.afterData();
		}, function (errorObject) {
  			console.log('The read failed: ' + errorObject.code);
		});
	}

	function getQuestion(number) {

	}

	function incrementCorrect() {
		quizData[currentQ.number].correct += 1;
		console.log(quizData[currentQ.number].correct, quizData[currentQ.number].incorrect);
	}

	function incrementIncorrect() {
		quizData[currentQ.number].incorrect += 1;
		console.log(quizData[currentQ.number].correct, quizData[currentQ.number].incorrect);
	}

	function length() {
		return quizData.length;
	}


	return {
		current: getCurrentQ,
		length: length,
		correctAnswer: incrementCorrect,
		incorrectAnswer: incrementIncorrect,
		start: getData,
		// end: saveData
	};


})();




