# PLAYER ONE CREATE NEW GAME
post '/create_game' do
	player_one = session[:user_id]
	@game = Game.find_or_create_by(player_one_id: player_one, player_two_id: nil)
	session[:game_id] = @game.id
	@game.id.to_json
end

# PLAYER TWO JOIN AVAILABLE GAME
get '/join_game/:id' do 
	@game = Game.find(params[:id])
	byebug
	if @game.player_two_id.nil? 
		if session[:user_id] != @game.player_one_id
			@game.player_two_id = session[:user_id]
			byebug
			@game.save
			session[:game_id] = @game.id
			redirect to("/game/#{@game.id}")
		else 
			redirect to("/game/#{@game.id}")
		end
	end
end

# GAME PAGE
get '/game/:id' do
	@game = Game.find(params[:id])
	byebug
	if session[:user_id] == @game.player_one_id
		@player = "X"
	elsif session[:user_id] == @game.player_two_id
		@player = "O"
	end
erb :game_page
end

# CHECK IF PLAYER TWO IS IN 
get '/check_player_two' do
	game = Game.find(session[:game_id])
	if game.player_two_id == nil?
		return false
	end
end

# MAKE A MOVE
post '/move' do
	position = params[:position]
	move = Move.create(game_id: session[:game_id], user_id: session[:user_id], board_position: params[:position])
end

# CHECK IF THE OTHER PLAYER HAS MADE A MOVE





