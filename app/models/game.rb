require 'byebug'
class Game < ActiveRecord::Base
  has_many :moves

  def self.find_available_games
  	@games = Game.where(player_two_id: nil)
  end

  def find_player_one(game_id)
  	game = Game.find(game_id)
  	@user = User.find(game.player_one_id)
  	return @user.name
  end

  def find_player_two(game_id)
  	game = Game.find(game_id)
  	@user = User.find(game.player_two_id)
  	return @user.name
  end

  def has_won?(player)
    has_won = false
    player_positions = []
    count = 0

    all_moves = player.moves.where(game_id: self.id)
    all_moves.each do |move|
      player_positions << move.board_position
    end

    player_positions.sort!

    # check if all include A, B, C, 1, 2, 3
    row_wins = ['A', 'B', 'C', '1', '2', '3']
    row_wins.each do |element|
      player_positions.each do |position|
        count += 1 if position.include? element
      end
      has_won = true if count == 3
      count = 0
    end

    # check if all match diagonal_wins
    diagonal_wins = [['A1', 'B2', 'C3'],['A3', 'B2', 'C1']]
    diagonal_wins.each do |array|
      array.each do |element|
        count += 1 if player_positions.include?(element)
      end
      has_won = true if count == 3
      count = 0
    end
    return has_won
  end

end
