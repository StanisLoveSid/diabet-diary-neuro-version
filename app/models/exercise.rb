class Exercise < ApplicationRecord
  belongs_to :day

  def next
    day.exercises.where("id > ?", id).first
  end

  def prev
    day.exercises.where("id < ?", id).last
  end

end
