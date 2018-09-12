class InsulinInjectionsController < ApplicationController
  
  before_action :set_day, only: [:destroy]

  def edit
    @insulin_injection = InsulinInjection.find(params[:id])
    @day = Day.find(@insulin_injection.day_id)
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

  def scopes(day, created_at_param=0)
    @time_creation = "#{day.created_at.year}"+"-"+
      "#{day.created_at.month}"+"-"+"#{day.created_at.day} #{created_at_param}"
    @s_l = day.sugar_levels.group_by_minute(:created_at).sum(:mmol)
    @result = @s_l.without_emty_slots
    @meals = day.meals.group_by_minute(:created_at).sum(4)
    @meals_result = @meals.without_emty_slots
    @insulin = day.insulin_injections.group_by_minute(:created_at).sum(3)
    @insulin_result = @insulin.without_emty_slots
    @exercise_start = day.exercises.group_by_minute(:begining).sum(10)
    @exercise_end = day.exercises.group_by_minute(:ending).sum(10)
    @warning_start = day.warnings.group_by_minute(:begining).sum(15)
    @warning_end = day.warnings.group_by_minute(:ending).sum(15)
    @prediction = day.bsl_predictions.any? ? day.bsl_predictions.last.prediction.round(2) : 0
  end

  def update
    @insulin_injection = InsulinInjection.find(params[:id])
    @day = Day.find(@insulin_injection.day_id)
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    scopes(@day, params[:insulin_injection][:created_at])
    @insulin_injection.update(amount: params[:insulin_injection][:amount],
                 created_at: @time_creation,
                 insulin_type: params[:insulin_injection][:insulin_type])
    respond_to do |format|
      format.json
      format.js
    end
  end

  def destroy
    @day = Day.find(@insulin_injection.day_id)
    @month = Month.find(@day.month_id)
    @year = Year.find(@month.year_id)
    @day.insulin_injections.delete @insulin_injection
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
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:insulin_injection][:created_at]}"
    @day.insulin_injections.create(insulin_injection_params)
    @day.insulin_injections.last.update(created_at: @time_creation_live)
    scopes(@day)
    @insulin_injection = @day.insulin_injections.last(2).first
    respond_to do |format|
      format.js
    end
  end

  private

  def set_day
    @day = Day.find(params[:day_id])
    @insulin_injection = @day.insulin_injections.find(params[:id])
  end

  def insulin_injection_params
    params.require(:insulin_injection).permit(:amount, :insulin_type, :created_at, :day_id, :id)
  end

end 
