class CreateWarnings < ActiveRecord::Migration[5.0]
  def change
    create_table :warnings do |t|
      t.string :reason
      t.text :description
      t.integer :day_id

      t.timestamps
    end
  end
end
