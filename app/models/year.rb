class Year < ApplicationRecord
  belongs_to :user
  has_many :months, dependent: :destroy
  has_many :comments, as: :commentable  
  before_save :change_created_at
  validates_uniqueness_of :year_number, scope: :id

  def change_created_at
    self[:created_at] = "#{self.year_number}-01-01"
  end

end
