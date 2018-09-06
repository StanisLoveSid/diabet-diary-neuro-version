class MealsController < ApplicationController
  
  def create
    @day = Day.find(params[:day_id])
    @day.meals.create(meal_params)
    time_creation = "#{@day.created_at.year}"+"-"+
    "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:meal][:created_at]}"
    @day.meals.last.update(created_at: time_creation)
    redirect_to :back
  end

  private

  def meal_params
    params.require(:meal).permit(:bread_units, :description, :created_at, :day_id_)
  end

end
