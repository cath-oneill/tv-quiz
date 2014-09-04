

var Templates = (function(){

	var question = [
		'<div class="row">',
	    '<h3 class="small-12 columns"> <%= question %> </h3>',
	    '</div>',
		'<div class="row">',
		'<ul class="small-block-grid-2 large-block-grid-4">',
	    '<li><img src=<%= A %> class="photo small-6 medium-3 columns" id="A"></li>',
	    '<li><img src=<%= B %> class="photo small-6 medium-3 columns" id="B"></li>',
	    '<li><img src=<%= C %> class="photo small-6 medium-3 columns" id="C"></li>',
	    '<li><img src=<%= D %> class="photo small-6 medium-3 columns" id="D"></li>',
	    '</ul>',
	    "</div>"
	].join("\n");

	var feedback = [
		'<div class="row panel">',
	    '<h3> <%= feedback %>    Current Score: <%= score %>/<%= total %></h3>',
	    '<p>On average, players get this question correct <%= Math.round(percent) %>% of the time.</p>',
	    "</div>"
	].join("\n");

	var finalScore = [
		'<div class="row">',
			'<h2 class="columns small-12">Your Final Score: <%= percentScore %>%</h2>',
		'</div>',

		'<div class="row">',		
			'<div class="columns small-12 medium-4 large-3">',
			'<div id="leaderboard" class="panel row">',
	        '<h4>LeaderBoard!</h4>',
			'<% for (var i=0; i < highScores.length; i++) { %>',
			'<p><%= highScores[i]["Username"] %> -- <%= highScores[i]["Score"] %>',
			'<% } %>',
			'</div>',
			'</div>',

			'<div class="columns small-12 medium-8 large-9">',
			'<img src="<%= splashImage %>">',
			'</div>',
		'</div>'
	].join("\n");

	var landingPageGrid = [
		'<ul class="small-block-grid-2 large-block-grid-4">',
		'<% for (var i=0; i < landingData.length; i++) { %>',
  		'<li class="start-quiz" data-quiz="<%= landingData[i]["key"] %>"><img src="<%= landingData[i]["image"] %>"></li>',
  		'<% } %>',
		'</ul>'
	].join('\n');

	return {
		question: question,
		feedback: feedback,
		end: finalScore,
		lpGrid: landingPageGrid,
	}

})();

