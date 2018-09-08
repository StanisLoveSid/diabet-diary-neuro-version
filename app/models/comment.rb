class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
  belongs_to :user
  validates :status, presence: true, length: {minimum: 3, maximum: 50}
  validates :content, presence: true, length: {minimum: 4, maximum: 2000}	
end
