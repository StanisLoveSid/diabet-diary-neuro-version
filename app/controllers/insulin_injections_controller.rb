class InsulinInjectionsController < ApplicationController
  
  def create
    @day = Day.find(params[:day_id])
    @day.insulin_injections.create(insulin_injection_params)
    redirect_to :back
  end

  private

  def insulin_injection_params
    params.require(:insulin_injection).permit(:amount, :insulin_type, :created_at, :day_id_)
  end

end 
