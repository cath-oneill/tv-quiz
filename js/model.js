var QuizzyData = (function(){

	var questionFireData = new Firebase("https://wirequiz.firebaseio.com/questions");

	var currentQ, quizData;
	
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
	}

	function saveData() {
		questionFireData.update(quizData);
	}

	function incrementCorrect(index) {
		quizData[index].correct += 1;
		console.log(quizData[index].correct, quizData[index].incorrect);
	}

	function incrementIncorrect(index) {
		quizData[index].incorrect += 1;
		console.log(quizData[index].correct, quizData[index].incorrect);
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
		end: saveData
	};


})();




