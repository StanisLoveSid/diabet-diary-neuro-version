class AddEndingToExercise < ActiveRecord::Migration[5.0]
  def change
    add_column :exercises, :ending, :string
  end
end
