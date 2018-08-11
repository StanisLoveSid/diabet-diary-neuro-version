class CreateHospitals < ActiveRecord::Migration[5.0]
  def change
    create_table :hospitals do |t|
      t.string :name
      t.text :description
      t.string :avatar
      t.integer :rate

      t.timestamps
    end
  end
end
