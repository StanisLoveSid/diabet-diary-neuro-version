class Warningg < ApplicationRecord
  belongs_to :day
  validates :begining, presence: true, timeliness: { type: :datetime }
  validates :ending, presence: true, timeliness: { type: :datetime }
  validates :reason, length: {minimum: 4, maximum: 50}, if: :reason_not_empty?
  validates :description, length: {minimum: 10, maximum: 2000}, if: :description_not_empty?

  def reason_not_empty?
  	!(reason.empty?)
  end

  def description_not_empty?
  	!(description.empty?)
  end

end
