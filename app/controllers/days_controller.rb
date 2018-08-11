class DaysController < ApplicationController
  require 'ruby-fann'
  require "neural_network_heplers/patient"

  def index
    @days = Day.all
    @sugar_levels = SugarLevel.by_month(params[:month])
  end

  def create
    @year = Year.find(params[:year_id])
    @month = Month.find(params[:month_id])
    data = []
    @month.days.each { |d| data << d.day_number }
    unless data.include? day_params[:day_number].to_i
      @month.days.create(day_params)
    else
      flash[:notice] = "Day already exists"
    end
    redirect_to :back
  end

  def show
    @year = Year.find(params[:year_id])
    @month = Month.find(params[:month_id])
    @day = Day.find(params[:id])
    @s_l = @day.sugar_levels.group_by_minute(:created_at).sum(:mmol)
    @result = @s_l.select{|k, v| v != 0}

    @meals = @day.meals.group_by_minute(:created_at).sum(4)
    @meals_result = @meals.select{|k, v| v != 0}

    @insulin = @day.insulin_injections.group_by_minute(:created_at).sum(3)
    @insulin_result = @insulin.select{|k, v| v != 0}

    @exercise_start = @day.exercises.where("status = ?", "start").group_by_minute(:created_at).sum(10)
    @exercise_end = @day.exercises.where("status = ?", "end").group_by_minute(:created_at).sum(10)

    @warning_start = @day.warnings.where("reason = ?", "start").group_by_minute(:created_at).sum(15)
    @warning_end = @day.warnings.where("reason = ?", "end").group_by_minute(:created_at).sum(15)
    @prediction = @day.bsl_predictions.any? ? @day.bsl_predictions.last.prediction.round(2) : 0

  end

  def destroy
    @day = Day.find(params[:id])
    @year = Year.find(params[:year_id])
    @month = Month.find(params[:month_id])
    @day.destroy
    redirect_to year_month_path(@year, @month)
  end

  def predict_blood_sugar_level
    day = Day.find(params[:id])
    mmol = day.sugar_levels.last.mmol
    bread_units = day.meals.last.bread_units
    insulin_injection = day.insulin_injections.last.amount
    training_duration = day.exercises.last.duration 

    before_food = (4.0..8.0).step(0.01).to_a

    x_data = []
    y_data = []
    after_food = []

    (1..4).to_a.each do |insulin|
      (1..4).to_a.each do |bread_init|
        (1..3).to_a.each do |training_hours|
          before_food.each do |bsl|
            state = Patient.new(bsl, bread_init, insulin, training_hours)
            after_food.push [bsl, bread_init, insulin, training_hours, state.after_meal_state]
            x_data.push [bsl,bread_init, insulin, training_hours]
            y_data.push [state.after_meal_state]
          end
        end
      end
    end

    test_size_percentange = 20.0 # 20.0%
    test_set_size = x_data.size * (test_size_percentange/100.to_f)

    test_x_data = x_data[0 .. (test_set_size-1)]
    test_y_data = y_data[0 .. (test_set_size-1)]

    training_x_data = x_data[test_set_size .. x_data.size]
    training_y_data = y_data[test_set_size .. y_data.size]

    train = RubyFann::TrainData.new( inputs: training_x_data, desired_outputs: training_y_data)

    model = RubyFann::Standard.new(
      num_inputs: 4,
      hidden_neurons: [60],
    num_outputs: 1 )
    model.set_activation_function_output(:linear)

    model.train_on_data(train, 5000, 500, 0.01)

    day.bsl_predictions.create(prediction: (model.run( [mmol, bread_units, insulin_injection, training_duration] ))[0])
    redirect_to :back
  end

  private

  def day_params
    params.require(:day).permit(:data, :description, :day_number, :month_id)
  end

end
