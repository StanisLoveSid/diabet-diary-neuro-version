class AddModeToDay < ActiveRecord::Migration[5.0]
  def change
    add_column :days, :mode, :string
  end
end
