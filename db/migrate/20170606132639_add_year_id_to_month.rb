class AddYearIdToMonth < ActiveRecord::Migration[5.0]
  def change
    add_column :months, :year_id, :integer
  end
end
