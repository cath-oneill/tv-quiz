$(function(){
	var $home = $('#home'),
		$newQuiz = $('#newQuiz');

	$home.on('click', function(){
		Landing.create();
	})

	$newQuiz.on('click', function(){
		console.log("Someone pushed the new game button!");
	})

});