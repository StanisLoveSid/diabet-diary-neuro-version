class CreateMonths < ActiveRecord::Migration[5.0]
  def change
    create_table :months do |t|
      t.integer :user_id
      t.string :compensation
      t.text :description

      t.timestamps
    end
  end
end
