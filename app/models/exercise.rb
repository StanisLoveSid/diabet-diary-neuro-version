class Exercise < ApplicationRecord
  belongs_to :day
 
  scope :created_between, lambda {|start_date, end_date, day_id| where("created_at >= ? AND created_at <= ? AND day_id = ?", start_date, end_date, day_id )}
  scope :updated_between, lambda {|start_date, end_date, day_id| where("updated_at >= ? AND updated_at <= ? AND day_id = ?", start_date, end_date, day_id )}
  
  validates :begining, presence: true
  validates :ending, presence: true
  validates :status, length: {minimum: 4, maximum: 50}
  validates :description, length: {minimum: 10, maximum: 2000}

  def next
    day.exercises.where("id > ?", id).first
  end

  def prev
    day.exercises.where("id < ?", id).last
  end

end
