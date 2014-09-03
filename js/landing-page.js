var Landing = (function(){
	var landingFireData = new Firebase("https://wirequiz.firebaseio.com/landing-data");
	var landingData,
		$quizContainer = $('#quiz-app');

	function getLandingPageData(callback) {
		landingFireData.on('value', function (snapshot) {
  			landingData = snapshot.val();
  			if(callback){callback();}
		}, function (errorObject) {
  			console.log('The read failed: ' + errorObject.code);
		});
	}

	function createLandingPage() {
		var preppedTemplate, compiledHtml, selected;
		$quizContainer.html("");
		preppedTemplate = _.template(Templates.lpGrid);
		compiledHtml = preppedTemplate({
			landingData: landingData
		});
		var $view = $(compiledHtml);
		$view.find('.start-quiz').on('click', function() {
			selected = $(this).data('quiz');
			Quizzy.start(selected);
		});
		$quizContainer.append($view);		
	}


	function start() {
		getLandingPageData(createLandingPage);
	};

	start();

})();
