var QuizzyUI = (function(){
	var $quizContainer = $('#quiz-app');

	function createHeaderView() {
		var $img,
			$header = $('header'),
			$logo = $('#logo'); 
		$img = $('<img>').attr('src', "images/wire_logo.jpg");
		$logo.append($img);
		$header.css('background', '#000201');
	}

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
		$quizContainer.prepend($view);
	}

	function FinalScoreView(percentScore, highScores, splashImage) {
		var preppedTemplate, compiledHtml, $view;
		$quizContainer.html("");
		preppedTemplate = _.template(Templates.end);
		compiledHTML = preppedTemplate({
			percentScore: percentScore,
			highScores: highScores,
			splashImage: splashImage
		})
		$view = $(compiledHTML);
		$quizContainer.append($view);	
	}


	function CreateLeaderboardView(highScores) {
		var preppedTemplate, compiledHtml, $view;
		preppedTemplate = _.template(Templates.leaderBoard);
		compiledHTML = preppedTemplate({
			highScores: highScores
		})
		$view = $(compiledHTML);
		$("#leaderboard").append($view).show();		
	};


	function getUsernameView() {
		var name = prompt("CONGRATULATIONS! You are on the high score leaderboard! Enter your name!");
		return name;
	}

	function start() {
		createHeaderView();
	}


	return {
		start: start,
		question: CreateQuestionView,
		feedback: CreateFeedbackView,
		getUsername: getUsernameView,
		end: FinalScoreView
	}




})();