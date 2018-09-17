class DaysController < ApplicationController
  require 'ruby-fann'
  require "neural_network_heplers/patient"

  def index
    @days = Day.all
    @sugar_levels = SugarLevel.by_month(params[:month])
  end

  def add_day
    create
  end

  def create
    @month = Month.find(params[:day][:month_id])
    data = []
    @month.days.each { |d| data << d.day_number }
    unless data.include? day_params[:day_number].to_i
      @month.days.create(day_params)
    else
      flash[:notice] = "Day already exists"
    end
    find_year_id = @month.year_id
    redirect_to "/years/#{find_year_id}/months/#{@month.id}/days/#{@month.days.last.id}"
  end

  module Selectors
    def without_emty_slots
      select { |k, v| v != 0 }
    end
  end

  Hash.class_eval { include Selectors }

  def show
    @year = Year.find(params[:year_id])
    @month = Month.find(params[:month_id])
    @day = Day.find(params[:id])
    @s_l = @day.sugar_levels.group_by_minute(:created_at).sum(:mmol)
    @result = @s_l.without_emty_slots

    @meals = @day.meals.group_by_minute(:created_at).sum(4)
    @meals_result = @meals.without_emty_slots

    @insulin = @day.insulin_injections.group_by_minute(:created_at).sum(3)
    @insulin_result = @insulin.without_emty_slots

    @exercise_start = @day.exercises.group_by_minute(:begining).sum(10)
    @exercise_end = @day.exercises.group_by_minute(:ending).sum(10)

    @warning_start = @day.warnings.group_by_minute(:begining).sum(15)
    @warning_end = @day.warnings.group_by_minute(:ending).sum(15)
    @prediction = @day.bsl_predictions.any? ? @day.bsl_predictions.last.prediction.round(2) : 0

  end

  def destroy
    @day = Day.find(params[:id])
    @year = Year.find(params[:year_id])
    @month = Month.find(params[:month_id])
    @day.destroy
    redirect_to year_month_path(@year, @month)
  end

  def actual_exercises(day, sugar_level)
    exercises_begining = Exercise.created_between((sugar_level.created_at - 1.hours), (sugar_level.created_at + 2.hours), day.id)
    exercises_ending = Exercise.updated_between((sugar_level.created_at - 1.hours), (sugar_level.created_at + 2.hours), day.id)
    if exercises_begining.any?
      exercises_begining.map(&:duration).sum
    elsif exercises_ending.any?
      exercises_ending.map(&:duration).sum
    else
      0
    end
  end

  def predict_blood_sugar_level
    day = Day.find(params[:id])
    month = Month.find(day.month_id)
    last_sugar_level = day.sugar_levels.last
    mmol = last_sugar_level.mmol
    for_p_bread_units = Meal.created_between((last_sugar_level.created_at - 1.hours), (last_sugar_level.created_at + 2.hours), day.id).map(&:bread_units).sum
    for_p_insulin_injection = InsulinInjection.created_between((last_sugar_level.created_at - 1.hours), (last_sugar_level.created_at + 2.hours), day.id).map(&:amount).sum
    for_p_training_duration = actual_exercises day, last_sugar_level


    if params[:day][:mode] == "learning"
      before_future_bsl = []
      ksi_data = []
      teta_data = []

      month.days.each do |day|
        day.sugar_levels.each do |sugar_level|
          before_food_mmol = sugar_level.mmol
          future_bsls = SugarLevel.created_between((sugar_level.created_at + 2.hours), (sugar_level.created_at + 2.5.hours), day.id).map(&:mmol)
          if future_bsls.any?
            possible_future_bsl = future_bsls.first
            bread_units = Meal.created_between((sugar_level.created_at - 1.hours), (sugar_level.created_at + 2.hours), day.id).map(&:bread_units).sum
            insulin_injection = InsulinInjection.created_between((sugar_level.created_at - 1.hours), (sugar_level.created_at + 2.hours), day.id).map(&:amount).sum
            training_duration = actual_exercises day, sugar_level
            before_future_bsl.push [before_food_mmol, bread_units, insulin_injection, training_duration, possible_future_bsl]
            ksi_data.push [before_food_mmol, bread_units, insulin_injection, training_duration]
            teta_data.push [possible_future_bsl]
          end
        end
      end

      test_size_percentange = 20.0 # 20.0%
      test_set_size = ksi_data.size * (test_size_percentange/100.to_f)

      test_ksi_data = ksi_data[0 .. (test_set_size-1)]
      test_teta_data = teta_data[0 .. (test_set_size-1)]

      training_ksi_data = ksi_data[test_set_size .. ksi_data.size]
      training_teta_data = teta_data[test_set_size .. teta_data.size]

      train = RubyFann::TrainData.new( inputs: training_ksi_data, desired_outputs: training_teta_data)

      model = RubyFann::Standard.new(
        num_inputs: 4,
        hidden_neurons: [60],
      num_outputs: 1 )
      model.set_activation_function_output(:linear)

      model.train_on_data(train, 5000, 500, 0.01)

      day.bsl_predictions.create(prediction: (model.run( [mmol, for_p_bread_units, for_p_insulin_injection, for_p_training_duration] ))[0])

    else

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

      day.bsl_predictions.create(prediction: (model.run( [mmol, for_p_bread_units, for_p_insulin_injection, for_p_training_duration] ))[0])
    end
    find_year_id = (Month.find(day.month_id)).year_id
    redirect_to "/years/#{find_year_id}/months/#{day.month_id}/days/#{day.id}"
  end

  private

  def day_params
    params.require(:day).permit(:data, :description, :day_number, :month_id, :mode)
  end

end
