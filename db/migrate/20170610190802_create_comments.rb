class CreateComments < ActiveRecord::Migration[5.0]
  def change
    create_table :comments do |t|
      t.string :commentable_type
      t.integer :commentable_id
      t.string :status
      t.text :content
      t.integer :user_id

      t.timestamps
    end
  end
end
