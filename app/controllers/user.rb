# USER LOG IN
post '/log_in' do
	@user = User.find_by(email: params[:email], password: params[:password])
	if @user.nil?
		redirect to('/')
	else
		session[:user_id] = @user.id
		redirect to('/lobby')
	end
end

# USER REGISTER	
post '/register' do
	@user = User.find_or_create_by(name: params[:name], email: params[:email], password: params[:password])
	session[:user_id] = @user.id
	redirect to('/lobby')
end

# USER LOG OUT
get '/log_out' do 
	session[:user_id] = nil
	redirect to('/')
end