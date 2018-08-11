class MealsController < ApplicationController
  
  def create
    @day = Day.find(params[:day_id])
    @day.meals.create(meal_params)
    redirect_to :back
  end

  private

  def meal_params
    params.require(:meal).permit(:bread_units, :description, :created_at, :day_id_)
  end

end
