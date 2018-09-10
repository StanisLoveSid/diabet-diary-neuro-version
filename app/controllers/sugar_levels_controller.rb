class SugarLevelsController < ApplicationController

  before_action :set_day, only: [:destroy]

  def edit
    @sugar_level = SugarLevel.find(params[:id])
    @day = Day.find(@sugar_level.day_id)
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    respond_to do |format|
      format.json { head :no_content }
      format.js
    end
  end

  def show

  end

  def update
    @sugar_level = SugarLevel.find(params[:id])
    @day = Day.find(@sugar_level.day_id)
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    time_creation = "#{@day.created_at.year}"+"-"+
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:sugar_level][:created_at]}"
    @sugar_level.update mmol: params[:sugar_level][:mmol]
    @sugar_level.update created_at: time_creation
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
    respond_to do |format|
      format.json
      format.js
    end
  end

  def destroy
    @day = Day.find(@sugar_level.day_id)
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    @day.sugar_levels.delete @sugar_level
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

    respond_to do |format|
      format.json { head :no_content }
      format.js
    end
  end

  def create
    @day = Day.find(params[:day_id])
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    @day.sugar_levels.create(sugar_level_params)
    time_creation = "#{@day.created_at.year}"+"-"+
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:sugar_level][:created_at]}" 
    @day.sugar_levels.last.update(created_at: time_creation)
    @sugar_level = @day.sugar_levels.last(2).first
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
    respond_to do |format|
      format.json { head :no_content }
      format.js
    end
  end

  private

  def set_day
    @day = Day.find(params[:day_id])
    @sugar_level = @day.sugar_levels.find(params[:id])
  end

  def sugar_level_params
    params.require(:sugar_level).permit(:mmol, :status, :day_id, :created_at, :id)
  end
end
