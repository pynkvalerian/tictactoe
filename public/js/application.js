$(document).ready(function() {
 
	// HIDE AND SHOW LOG IN & REGISTER FORM
	$('form#log_in').hide();
	$('form#register').hide();

	$('button#log_in').on('click', function(){
		$('form#log_in').show();
		$('form#register').hide();
	});

	$('button#register').on('click', function(){
		$('form#register').show();
		$('form#log_in').hide();
	});

	// SEND POST REQUEST TO CREATE NEW GAME
	$(document).on('click', '#create_game', function(event){
		event.preventDefault();
		var playerID = $('button#create_game').data('player-id')
		$.ajax({
			url: '/create_game',
			method: 'POST',
			});
	});

	refreshAvailableGames();

	// GAME PAGE

});

// REFRESH AVAILABLE GAMES DIV EVERY 1 SECOND
function refreshAvailableGames(){
	$.ajaxSetup({ cache: false });
		setInterval(function(){
			$('#refresh_available_games').load('/table #refresh_available_games');
		}, 1000);
};




