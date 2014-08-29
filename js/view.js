var QuizzyUI = (function(){
	var $quizContainer = $('#quiz-app');

	function CreateQuestion(qObject) {
		var preppedTemplate, compiledHtml, answer;
		$quizContainer.html("");
		preppedTemplate = _.template(Templates.question);
		compiledHtml = preppedTemplate({
			question: qObject.question,
			A: qObject.A,
			B: qObject.B,
			C: qObject.C,
			D: qObject.D
		});
		var $view = $(compiledHtml);
		$view.find('.photo').on('click', function() {
			answer = $(this).attr('id');
			Quizzy.check(answer);
		});

		$quizContainer.append($view);
	}

	function Start() {
		// $('#title').append('<h1>' + QuizzyData.title + '</h1>');
	}

	function FinalScore(response, score, total) {
		var preppedTemplate, compiledHtml, $view;
		console.log("final score", response, score, total)
		$quizContainer.html("");
		preppedTemplate = _.template(Templates.end);
		compiledHTML = preppedTemplate({
			feedback: response,
			score: score,
			total: total
		})
		$view = $(compiledHTML);
		$quizContainer.append($view);	
	}


	function CreateLeaderboard(highScores) {
		var preppedTemplate, compiledHtml, $view;
		preppedTemplate = _.template(Templates.leaderBoard);
		compiledHTML = preppedTemplate({
			highScores: highScores,
		})
		$view = $(compiledHTML);
		$("#leaderboard").append($view);		
	};

	function CreateFeedback(correct, score, total) {
		var message, preppedTemplate, compiledHTML, $view;
		message = correct ? "Great job!" : "Wrong! Better get watching.";
		preppedTemplate = _.template(Templates.feedback);
		compiledHTML = preppedTemplate({
			feedback: message,
			score: score,
			total: total
		})
		$view = $(compiledHTML);
		$view.find('#next').on('click', function(){
			Quizzy.next();
		})
		$quizContainer.append($view);
	}

	function getUsername() {
		var name = prompt("CONGRATULATIONS! You are on the high score leaderboard! Enter your name!");
		return name;
	}

	function end(response, score, total, highScores) {
		FinalScore(response, score, total);
		setTimeout(CreateLeaderboard(highScores), 500);
	}

	$('#start').on('click', function() {
		$('#startpage').hide();
		Quizzy.start();
	})


	return {
		question: CreateQuestion,
		start: Start,
		end: end,
		feedback: CreateFeedback,
		getUsername: getUsername
	}




})();