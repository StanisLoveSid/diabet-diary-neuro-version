class AddBeginingAndEndingToWarning < ActiveRecord::Migration[5.0]
  def change
    add_column :warnings, :begining, :string
    add_column :warnings, :ending, :string
  end
end
