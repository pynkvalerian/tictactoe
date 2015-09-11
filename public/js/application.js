$(document).ready(function() {

	$(function(){

		// INDEX PAGE
		if($('div').is('#index')){
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
		}

		// LOBBY
		if($('div').is('#lobby')){
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
		}

		// GAME PAGE
		if($('div').is('#game_page')){
			$('#game_board').hide();
			checkBothPlayersIn();
			var player_shape = $('table#game_board').data('player')
			makeAMove(player_shape);
		};

	});
 
});

// REFRESH AVAILABLE GAMES DIV EVERY 1 SECOND
function refreshAvailableGames(){
	$.ajaxSetup({ cache: false });
	setInterval(function(){
		$('#refresh_available_games').load('/table #refresh_available_games');
	}, 1000);
};

// CHECK IF PLAYER TWO IS IN
function checkBothPlayersIn(){
	$.ajax({
		url: '/check_player_two',
		method: 'GET',
	}).done(function(response){
		if (response === "false"){
			checkBothPlayersIn();
		}else{
			$('#game_board').show();
		}
	});
};

// MAKE A MOVE
function makeAMove(player_shape){
	$('button').on('click', function(){
		var position = $(this).data('position');
		$(this).html(player_shape);
		$.ajax({
			url: '/move',
			method: 'POST',
			dataType: 'json',
			data: { position: position }
		});
	});
};

