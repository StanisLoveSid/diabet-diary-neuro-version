class AddDurationToExercise < ActiveRecord::Migration[5.0]
  def change
    add_column :exercises, :duration, :float, default: 0
  end
end
