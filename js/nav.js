$(function(){
	var $home = $('#home'),
		$header = $('header'),
		$newQuiz = $('#newQuiz');

	$home.on('click', function(){
		$header.hide();
		Landing.create();
	})

	$newQuiz.on('click', function(){
		console.log("Someone pushed the new game button!");
	})

});