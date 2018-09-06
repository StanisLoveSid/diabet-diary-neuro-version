class WarningsController < ApplicationController

  def create
    @day = Day.find(params[:day_id])
    @day.warnings.create(warning_params)
    time_creation_begining = "#{@day.created_at.year}"+"-"+
    "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:warning][:begining]}"
    time_creation_ending = "#{@day.created_at.year}"+"-"+
    "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:warning][:ending]}"
    @day.warnings.last.update(begining: time_creation_begining, ending: time_creation_ending)
    redirect_to :back
  end

  private

  def warning_params
    params.require(:warning).permit(:reason, :description, :created_at, :day_id, :begining, :ending)
  end

end
