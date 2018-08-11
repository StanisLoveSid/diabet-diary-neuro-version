class AddHospitalIdToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :hospital_id, :integer
  end
end
