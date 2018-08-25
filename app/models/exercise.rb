class Exercise < ApplicationRecord
  belongs_to :day
    scope :created_between, lambda {|start_date, end_date, day_id| where("created_at >= ? AND created_at <= ? AND day_id = ?", start_date, end_date, day_id )}

  def next
    day.exercises.where("id > ?", id).first
  end

  def prev
    day.exercises.where("id < ?", id).last
  end

end
