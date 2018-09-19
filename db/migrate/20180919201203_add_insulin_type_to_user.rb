class AddInsulinTypeToUser < ActiveRecord::Migration[5.0]
  def change
  	add_column :users, :first_name, :string
  	add_column :users, :last_name, :string
  	add_column :users, :full_name, :string
    add_column :users, :insulin_type, :string
  end
end
