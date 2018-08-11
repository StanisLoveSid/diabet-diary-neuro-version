class User < ApplicationRecord
  
  has_friendship
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
    :recoverable, :rememberable, :trackable, :validatable
  has_many :days, dependent: :destroy
  has_many :months, dependent: :destroy
  has_many :years, dependent: :destroy
  has_and_belongs_to_many :hospitals

  include AASM
  
  aasm do
    state :without_hospital, :initial => true
    state :pending
    state :accepted
    state :denied

    event :sent do
      transitions  from: :without_hospital, to: :pending
      transitions  from: :pending, to: :pending
      transitions :from => :denied, :to => :pending
      transitions :from => :accepted, :to => :pending
    end

    event :accept do
      transitions :from => :pending, :to => :accepted
    end

    event :deny do
      transitions :from => :pending, :to => :denied
    end

  end

end
