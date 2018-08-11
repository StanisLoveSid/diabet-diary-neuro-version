class WarningsController < ApplicationController
  
  def create
    @day = Day.find(params[:day_id])
    @day.warnings.create(warning_params)
    redirect_to :back
  end

  private

  def warning_params
    params.require(:warning).permit(:reason, :description, :created_at, :day_id_)
  end

end 
