class InsulinInjectionsController < ApplicationController
  
  def create
    @day = Day.find(params[:day_id])
    time_creation = "#{@day.created_at.year}"+"-"+
    "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:insulin_injection][:created_at]}"
    @day.insulin_injections.create(insulin_injection_params)
    @day.insulin_injections.last.update(created_at: time_creation)
    redirect_to :back
  end

  private

  def insulin_injection_params
    params.require(:insulin_injection).permit(:amount, :insulin_type, :created_at, :day_id_)
  end

end 
