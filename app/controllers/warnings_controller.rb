class WarningsController < ApplicationController

  before_action :set_day, only: [:destroy]

  def create
    @day = Day.find(params[:day_id])
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    @day.warnings.create(warning_params)
    last_warning = @day.warnings.last
    time_creation_begining = "#{@day.created_at.year}"+"-"+
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:warning][:begining]}"
    time_creation_ending = "#{@day.created_at.year}"+"-"+
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:warning][:ending]}"
    last_warning.update(begining: time_creation_begining,
                         ending: time_creation_ending, created_at: time_creation_begining,
                         updated_at: time_creation_ending)
    scopes(@day)
    @warning = @day.warnings.last(2).first
    respond_to do |format|
      format.js
    end
  end

  def edit
    @warning = Warning.find(params[:id])
    @day = Day.find(@warning.day_id)
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
    @insulin = day.exercises.group_by_minute(:created_at).sum(3)
    @insulin_result = @insulin.without_emty_slots
    @exercise_start = day.exercises.group_by_minute(:begining).sum(10)
    @exercise_end = day.exercises.group_by_minute(:ending).sum(10)
    @warning_start = day.warnings.group_by_minute(:begining).sum(15)
    @warning_end = day.warnings.group_by_minute(:ending).sum(15)
    @prediction = day.bsl_predictions.any? ? day.bsl_predictions.last.prediction.round(2) : 0
  end

  def update
    @warning = Warning.find(params[:id])
    @day = Day.find(@warning.day_id)
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    time_creation_begining = "#{@day.created_at.year}"+"-"+
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:warning][:begining]}"
    time_creation_ending = "#{@day.created_at.year}"+"-"+
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:warning][:ending]}"
    @warning.update(begining: time_creation_begining,
                     ending: time_creation_ending, created_at: time_creation_begining,
                     updated_at: time_creation_ending, description: params[:warning][:description],
                     reason: params[:warning][:reason])
    scopes(@day)
    respond_to do |format|
      format.json
      format.js
    end
  end

  def destroy
    @day = Day.find(@warning.day_id)
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    @day.warnings.delete @warning
    scopes @day
    respond_to do |format|
      format.json { head :no_content }
      format.js
    end
  end

  private

  def set_day
    @day = Day.find(params[:day_id])
    @warning = @day.warnings.find(params[:id])
  end

  def warning_params
    params.require(:warning).permit(:reason, :description, :created_at, :day_id, :begining, :ending)
  end

end
