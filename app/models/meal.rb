class Meal < ApplicationRecord
  belongs_to :day
  scope :created_between, lambda {|start_date, end_date, day_id| where("created_at >= ? AND created_at <= ? AND day_id = ?", start_date, end_date, day_id )}
  validates :created_at, presence: true, timeliness: { type: :datetime }
  validates :bread_units, presence: true
  validates :description, length: {minimum: 4, maximum: 1000}, if: :description_not_empty?

  def description_not_empty?
  	!(description.empty?)
  end

end
