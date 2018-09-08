class Day < ApplicationRecord

  has_many :sugar_levels, dependent: :destroy
  has_many :meals, dependent: :destroy
  has_many :warnings, dependent: :destroy
  has_many :exercises, dependent: :destroy
  has_many :insulin_injections, dependent: :destroy
  has_many :comments, as: :commentable
  has_many :bsl_predictions, dependent: :destroy
  belongs_to :user
  belongs_to :month
  before_save :change_created_at

  validates :day_number, presence: true, numericality: { only_integer: true }

  def change_created_at
    self[:created_at] = "#{month.created_at.year}-#{month.created_at.month}-#{self.day_number.to_i}"
  end
  
  def compensated?
    total = sugar_levels.map {|e| e.status }
    return false if (total.include? "High") || (total.include? "Low")
    true
  end

  def average
    all_sugar_level = sugar_levels.map(&:mmol)
    amount = sugar_levels.count
    unless all_sugar_level.nil?
      sum = all_sugar_level.inject(0) { |sum, x| sum + x }
      sum / amount if amount != 0 
    end
  end

end
