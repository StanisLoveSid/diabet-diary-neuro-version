class CreateBslPredictions < ActiveRecord::Migration[5.0]
  def change
    create_table :bsl_predictions do |t|
      t.float :prediction
      t.boolean :danger

      t.timestamps
    end
    add_column :bsl_predictions, :day_id, :integer
  end
end
