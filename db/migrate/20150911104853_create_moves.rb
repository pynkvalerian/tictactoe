class CreateMoves < ActiveRecord::Migration
  def change
  	create_table :moves do |t|
  		t.integer :game_id
  		t.integer :user_id
  		t.string :board_position
  		t.timestamps null: false
  	end
  end
end
