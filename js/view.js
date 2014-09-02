var QuizzyUI = (function(){
	var $quizContainer = $('#quiz-app');

	function CreateQuestionView(qObject) {
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
		$view.find('.photo').one('click', function() {
			answer = $(this).attr('id');
			Quizzy.check(answer);
		});
		$quizContainer.append($view);
	}


	function FinalScoreView(response, score, total, callback) {
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


	function CreateLeaderboardView(highScores) {
		var preppedTemplate, compiledHtml, $view;
		preppedTemplate = _.template(Templates.leaderBoard);
		compiledHTML = preppedTemplate({
			highScores: highScores,
		})
		$view = $(compiledHTML);
		$("#leaderboard").append($view).show();		
	};

	function CreateFeedbackView(correct, score, total, percent) {
		var message, preppedTemplate, compiledHTML, $view;
		message = correct ? "Great job!" : "Wrong! Better get watching.";
		preppedTemplate = _.template(Templates.feedback);
		compiledHTML = preppedTemplate({
			feedback: message,
			score: score,
			total: total,
			percent: percent
		})
		$view = $(compiledHTML);
		$view.find('#next').on('click', function(){
			Quizzy.next();
		})
		$quizContainer.append($view);
	}

	function getUsernameView() {
		var name = prompt("CONGRATULATIONS! You are on the high score leaderboard! Enter your name!");
		return name;
	}

	function end(response, score, total, highScores) {
		FinalScoreView(response, score, total);
		CreateLeaderboardView(highScores);
	}

	$('#start').on('click', function() {
		$('#startpage').hide();
		Quizzy.start();
	})


	return {
		question: CreateQuestionView,
		end: end,
		feedback: CreateFeedbackView,
		getUsername: getUsernameView
	}




})();