$(document).ready(function() {

	$(function(){

		// DONE: INDEX PAGE
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

		// DONE: LOBBY
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
			refreshBoard(player_shape);

		};

	});

});

// DONE: REFRESH AVAILABLE GAMES DIV IN LOBBY EVERY 1 SECOND
function refreshAvailableGames(){
	$.ajaxSetup({ cache: false });
	setInterval(function(){
		$('#refresh_available_games').load('/table #refresh_available_games');
	}, 1000);
};

// DONE: CHECK IF PLAYER TWO IS IN
function checkBothPlayersIn(){
	$.ajax({
		url: '/check_player_two',
		method: 'GET',
	}).done(function(response){
		if (response === "false"){
			checkBothPlayersIn();
		}else{
			$('#game_board').show();
			$('h2').hide();
		}
	});
};

// DONE: MAKE A MOVE
function makeAMove(player_shape){
	$('button').on('click', function(){
		if ($(this).html() == ".") {
			var position = $(this).data('position');
			$(this).html(player_shape);
			$.ajax({
				url: '/move',
				method: 'POST',
				dataType: 'json',
				data: { position: position }
			}).done(function(){
				$('button').hide();
			});
		};
	});
};

// PENDING LOOP: Refresh board to update other player's move
function refreshBoard(player_shape){
	if (player_shape == "O") {
		var other_player_shape = "X"
	} else {
		var other_player_shape = "O"
	}

	$.ajax({
		url: '/check_if_ready',
		method: 'GET',
		dataType: 'json'
	}).done(function(response){
		if (response == "false") {
			refreshBoard(player_shape);
		} else {
			var board_position = $('[data-position=' + response + ']')
			board_position.html(other_player_shape);
			board_position.addClass('disabled');
			checkIfWinGame(player_shape);
		}
	});
};

function checkIfWinGame(player_shape){
	$.ajax({
		url: '/check_wins',
		method: 'POST',
		dataType: 'json'
	}).done(function(response){
		if (response == "false") {
			refreshBoard(player_shape);
		} else {
			$('button').addClass('disabled');
			$('.winner').html(response + ' has won the game!').show();
		};
	});
};

