# PLAYER ONE CREATE NEW GAME
post '/create_game' do
	player_one = session[:user_id]
	@game = Game.find_or_create_by(player_one_id: player_one, player_two_id: nil)
	session[:game_id] = @game.id
	@game.id.to_json
end

# PLAYER TWO JOIN AVAILABLE GAME
post '/join_game' do 
	@game = Game.find(params[:game_id])
	if @game.player_two_id.nil? 
		if @game.player_one_id != session[:user_id] 
			@game.player_two_id = session[:user_id]
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
	# if session[:user_id] == @game.player_one_id

	# elsif session[:user_id] == @game.player_two_id

	# end
erb :game_page
end