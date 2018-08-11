class Month < ApplicationRecord
  belongs_to :user
  belongs_to :year
  has_many :days, dependent: :destroy
  has_many :comments, as: :commentable
  before_save :change_created_at

  def change_created_at
  	self[:created_at] = "#{year.created_at.year}-#{Date::MONTHNAMES.index(self.month_name).to_i}-01"
  end

  def average_month
  	all_days = days.map {|day| day.average }
  	amount = all_days.count
  	unless all_days.include? nil
  	  sum = all_days.inject(0) { |sum, x| sum + x }
  	  sum / amount if amount != 0
    end
  end

end
