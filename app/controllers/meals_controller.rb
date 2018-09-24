class MealsController < ApplicationController

  before_action :set_day, only: [:destroy]

  def edit
    @meal = Meal.find(params[:id])
    @day = Day.find(@meal.day_id)
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    respond_to do |format|
      format.json { head :no_content }
      format.js
    end
  end

  def show

  end

  module Selectors
    def without_emty_slots
      select { |k, v| v != 0 }
    end
  end

  Hash.class_eval { include Selectors }

  def scopes(day)
    @s_l = day.sugar_levels.group_by_minute(:created_at).sum(:mmol)
    @result = @s_l.without_emty_slots
    @meals = day.meals.group_by_minute(:created_at).sum(4)
    @meals_result = @meals.without_emty_slots
    @insulin = day.insulin_injections.group_by_minute(:created_at).sum(3)
    @insulin_result = @insulin.without_emty_slots
    @exercise_start = day.exercises.group_by_minute(:begining).sum(10)
    @exercise_end = day.exercises.group_by_minute(:ending).sum(10)
    @warning_start = day.warninggs.group_by_minute(:begining).sum(15)
    @warning_end = day.warninggs.group_by_minute(:ending).sum(15)
    @prediction = day.bsl_predictions.any? ? day.bsl_predictions.last.prediction.round(2) : 0
  end

  def update
    @meal = Meal.find(params[:id])
    @day = Day.find(@meal.day_id)
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    @time_creation = "#{@day.created_at.year}"+"-"+
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:meal][:created_at]}"
    @meal.update(bread_units: params[:meal][:bread_units],
                 created_at: @time_creation,
                 description: params[:meal][:description])
    scopes(@day)
    respond_to do |format|
      format.json
      format.js
    end
  end

  def destroy
    @day = Day.find(@meal.day_id)
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    @day.meals.delete @meal
    scopes @day
    respond_to do |format|
      format.json { head :no_content }
      format.js
    end
  end

  def create
    @day = Day.find(params[:day_id])
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    @time_creation_live = "#{@day.created_at.year}"+"-"+
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:meal][:created_at]}"
    @day.meals.create(meal_params)
    @day.meals.last.update(created_at: @time_creation_live)
    scopes(@day)
    @meal = @day.meals.last(2).first
    respond_to do |format|
      format.js
    end
  end

  private

  def set_day
    @day = Day.find(params[:day_id])
    @meal = @day.meals.find(params[:id])
  end

  def meal_params
    params.require(:meal).permit(:bread_units, :description, :created_at, :day_id_)
  end

end
