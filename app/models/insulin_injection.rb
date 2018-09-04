class InsulinInjection < ApplicationRecord
  belongs_to :day
  scope :created_between, lambda {|start_date, end_date, day_id| where("created_at >= ? AND created_at <= ? AND day_id = ?", start_date, end_date, day_id )}
  validates :amount, presence: true, numericality: { only_integer: true }
  validates :insulin_type, presence: true, length: {minimum: 4, maximum: 50}
  validates :created_at, presence: true
end
