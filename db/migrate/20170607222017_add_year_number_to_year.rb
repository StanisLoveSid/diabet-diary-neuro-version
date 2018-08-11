class AddYearNumberToYear < ActiveRecord::Migration[5.0]
  def change
    add_column :years, :year_number, :integer
  end
end
