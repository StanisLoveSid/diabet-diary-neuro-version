class Warning < ApplicationRecord
  belongs_to :day
  validates :begining, presence: true, timeliness: { type: :datetime }
  validates :ending, presence: true, timeliness: { type: :datetime }
  validates :reason, length: {minimum: 4, maximum: 50}, if: Proc.new {|a| !(a.reason.empty?)}
  validates :description, length: {minimum: 10, maximum: 2000}, if: Proc.new {|a| !(a.description.empty?)}
end
