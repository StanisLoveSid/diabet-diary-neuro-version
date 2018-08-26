class AddBeginingToExercise < ActiveRecord::Migration[5.0]
  def change
    add_column :exercises, :begining, :string
  end
end
