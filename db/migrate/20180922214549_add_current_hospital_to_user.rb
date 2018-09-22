class AddCurrentHospitalToUser < ActiveRecord::Migration[5.0]
  def change
    add_column :users, :current_hospital, :string
  end
end
