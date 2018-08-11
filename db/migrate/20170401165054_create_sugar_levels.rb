class CreateSugarLevels < ActiveRecord::Migration[5.0]
  def change
    create_table :sugar_levels do |t|
      t.decimal :mmol
      t.string :status
      t.integer :day_id
      t.timestamps null: false
    end
  end
end
