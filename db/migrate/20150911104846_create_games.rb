class CreateGames < ActiveRecord::Migration
  def change
  	create_table :games do |t|
  		t.integer :player_one_id
  		t.integer :player_two_id
  		t.integer :winner_id
  		t.timestamps null: false
  	end
  end
end
