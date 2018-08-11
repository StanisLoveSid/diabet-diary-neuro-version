class CreateHospitalsUsersAssociation < ActiveRecord::Migration[5.0]
  def self.up
    create_table :hospitals_users, :id => false do |t|
      t.integer :hospital_id
      t.integer :user_id
    end
  end
 
  def self.down
    drop_table :users_hospitals
  end
end
