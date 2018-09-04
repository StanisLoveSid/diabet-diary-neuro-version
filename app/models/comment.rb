class Comment < ApplicationRecord
  belongs_to :commentable, polymorphic: true
  validates :status, presence: true, length: {minimum: 4, maximum: 50}
  validates :content, presence: true, length: {minimum: 4, maximum: 2000}	
end
