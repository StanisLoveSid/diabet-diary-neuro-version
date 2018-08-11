class AddUserIdToHospital < ActiveRecord::Migration[5.0]
  def change
    add_column :hospitals, :user_id, :integer
  end
end
