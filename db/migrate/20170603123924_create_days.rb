class CreateDays < ActiveRecord::Migration[5.0]
  def change
    create_table :days do |t|
      t.text :description
      t.integer :user_id
      t.string :compensation
      t.string :data
      t.timestamps
    end
  end
end
