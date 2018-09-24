class RenameWarningsToWarninggs < ActiveRecord::Migration[5.0]
  def change
  	rename_table :warnings, :warninggs
  end
end
