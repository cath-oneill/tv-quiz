var QuizzyData = (function(){

	var myFirebaseRef = new Firebase("https://wirequiz.firebaseio.com/");

	var quizData = {
		quizTitle: "The Wire",
		questions: [
			{
				question: 'Whose catchphrase is "What the fuck did I do?"',
				answer: "A",
				A: "images/mcnulty.jpg",
				B: "images/namond.jpg",
				C: "images/freamon.jpg",
				D: "images/carver.jpg",
				correct: 0,
				incorrect: 0
			},
			{
				question: 'Who is known for whistling "The Farmer in the Dell"?',
				answer: "C",
				A: "images/bubbles.jpg",
				B: "images/chris.jpg",
				C: "images/omar.jpg",
				D: "images/carcetti.jpg",
				correct: 0,
				incorrect: 0
			},
			{
				question: 'Whose catchphrase is "Sheeeeeeiiit"?',
				answer: "B",
				A: "images/prop-joe.jpg",
				B: "images/clay-davis.jpg",
				C: "images/herc.jpg",
				D: "images/michael.jpg",
				correct: 0,
				incorrect: 0
			},
			{
				question: 'Who was the founder of "Hamsterdam"?',
				answer: "B",
				A: "images/the-greek.jpg",
				B: "images/colvin.jpg",
				C: "images/stringer.jpg",
				D: "images/bad-reporter.jpg",
				correct: 0,
				incorrect: 0 
			},
			{
				question: 'Which actor played a character with their real name and nickname?',
				answer: "D",
				A: "images/dukie.jpg",
				B: "images/cheese.jpg",
				C: "images/prezbo.jpg",
				D: "images/snoop.jpg",
				correct: 0,
				incorrect: 0 
			},
			{
				question: 'Who was critically injured during an undercover operation?',
				answer: "A",
				A: "images/kima.jpg",
				B: "images/boxing-coach.jpg",
				C: "images/beadie.jpg",
				D: "images/bunk.jpg",
				correct: 0,
				incorrect: 0 				
			},
			{
				question: 'Who had a pet duck?',
				answer: "C",
				A: "images/walon.jpg",
				B: "images/valchek.jpg",
				C: "images/ziggy.jpg",
				D: "images/landsman.jpg",
				correct: 0,
				incorrect: 0 				
			},			
			{
				question: 'Who was NOT part of the famous chess scene in Season 1?',
				answer: "D",
				A: "images/bodie.jpg",
				B: "images/wallace.jpg",
				C: "images/dangelo.jpg",
				D: "images/poot.jpg",
				correct: 0,
				incorrect: 0 				
			},			
			{
				question: 'Who used clocks as code?',
				answer: "A",
				A: "images/marlo.jpg",
				B: "images/avon.jpg",
				C: "images/cedric.jpg",
				D: "images/slim-charles.jpg",
				correct: 0,
				incorrect: 0 				
			},		
			{
				question: 'Whose dead body was fished out of the harbor?',
				answer: "B",
				A: "images/brother-mouzone.jpg",
				B: "images/sobotka.jpg",
				C: "images/nick.jpg",
				D: "images/butchie.jpg",
				correct: 0,
				incorrect: 0				
			}			
		],
		highScores: {}
	};

	var currentQ;
	
	function getCurrentQ(number) {
		currentQ = quizData.questions[number];
		currentQ.number = number;
		this.question = currentQ.question;
		this.answer   = currentQ.answer;
		this.number = number;
		return currentQ;
	};

	function incrementCorrect() {
		quizData.questions[currentQ.number].correct += 1;
		console.log(quizData.questions[currentQ.number].correct, quizData.questions[currentQ.number].incorrect);
	}

	function incrementIncorrect() {
		quizData.questions[currentQ.number].incorrect += 1;
		console.log(quizData.questions[currentQ.number].correct, quizData.questions[currentQ.number].incorrect);
	}


	return {
		current: getCurrentQ,
		title: quizData.quizTitle,
		length: quizData.questions.length,
		correctAnswer: incrementCorrect,
		incorrectAnswer: incrementIncorrect
	};


})();


