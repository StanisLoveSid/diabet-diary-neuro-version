class CreateInsulinInjections < ActiveRecord::Migration[5.0]
  def change
    create_table :insulin_injections do |t|
      t.string :insulin_type
      t.integer :amount
      t.integer :day_id

      t.timestamps
    end
  end
end
