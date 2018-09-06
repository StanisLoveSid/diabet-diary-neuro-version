class ExercisesController < ApplicationController

  def create
    @day = Day.find(params[:day_id])
    @day.exercises.create(exercise_params)
    last_exercise = @day.exercises.last
    duration = TimeDifference.between(last_exercise.begining, last_exercise.ending).in_hours
    time_creation_begining = "#{@day.created_at.year}"+"-"+
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:exercise][:begining]}"
    time_creation_ending = "#{@day.created_at.year}"+"-"+
      "#{@day.created_at.month}"+"-"+"#{@day.created_at.day} #{params[:exercise][:ending]}"
    last_exercise.update(duration: duration, begining: time_creation_begining, 
      ending: time_creation_ending, created_at: time_creation_begining, updated_at: time_creation_ending)
    redirect_to :back
  end

  private

  def exercise_params
    params.require(:exercise).permit(:status, :begining, :ending, :description, :created_at, :day_id_)
  end

end
