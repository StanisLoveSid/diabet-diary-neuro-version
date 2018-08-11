class Patient

  # personalized data
  # bsl - blood sugar level

  attr_accessor :bsl_before_food, :bread_init, :insulin, :training

  def initialize(bsl_before_food, bread_init, insulin, training=0)
    @bsl_before_food = bsl_before_food
    @bread_init = bread_init
    @insulin = insulin
    @training = training
  end

  def bread_unit_to_mmol
    @bread_init * 7.0
  end

  def insulin_to_mmol
    @insulin * 3.5
  end

  def after_meal_state
    @bsl_before_food + bread_unit_to_mmol - insulin_to_mmol - training_to_mmol
  end

  def training_to_mmol
  	normal_state = @training * 3.5
    @bsl_before_food <= 13.0 ? normal_state : (-normal_state)  
  end

end
