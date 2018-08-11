class AddDayNumberToDay < ActiveRecord::Migration[5.0]
  def change
    add_column :days, :day_number, :integer
  end
end
