class CreateMeals < ActiveRecord::Migration[5.0]
  def change
    create_table :meals do |t|
      t.float :bread_units
      t.text :description
      t.float :carbohydrates
      t.float :proteins
      t.float :fats
      t.integer :day_id

      t.timestamps
    end
  end
end
