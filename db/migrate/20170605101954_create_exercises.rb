class CreateExercises < ActiveRecord::Migration[5.0]
  def change
    create_table :exercises do |t|
      t.text :description
      t.string :status
      t.integer :day_id
      
      t.timestamps
    end
  end
end
