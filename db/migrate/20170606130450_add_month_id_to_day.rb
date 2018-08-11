class AddMonthIdToDay < ActiveRecord::Migration[5.0]
  def change
    add_column :days, :month_id, :integer
  end
end
