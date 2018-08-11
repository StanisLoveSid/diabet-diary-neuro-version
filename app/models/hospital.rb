class Hospital < ApplicationRecord
  has_friendship
  has_and_belongs_to_many :users
end
