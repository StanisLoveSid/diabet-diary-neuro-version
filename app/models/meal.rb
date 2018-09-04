class Meal < ApplicationRecord
  belongs_to :day
  scope :created_between, lambda {|start_date, end_date, day_id| where("created_at >= ? AND created_at <= ? AND day_id = ?", start_date, end_date, day_id )}
  validates :created_at, presence: true
  validates :bread_units, presence: true
  validates :description, length: {minimum: 4, maximum: 1000}
end
