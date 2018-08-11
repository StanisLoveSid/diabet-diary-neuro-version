class SugarLevel < ApplicationRecord
  belongs_to :day
  validate :which_day
  before_save :add_status

  scope :by_month, lambda { |month| where('extract(month from created_at) = ?', month) }

  def which_day
  	unless day.created_at.day == created_at.day && day.created_at.month == created_at.month && day.created_at.year == created_at.year
  	  errors.add(:alert, "is not valid or is not active")
  	end
  end

  def add_status
  	if mmol < 3.7
  	self[:status] = "Low"
  	elsif mmol > 8.0
  	self[:status] = "High"
  	else
  	self[:status] = "Normal"
  	end	
  end

end
