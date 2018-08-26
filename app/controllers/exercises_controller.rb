class ExercisesController < ApplicationController

  def create
    @day = Day.find(params[:day_id])
    @day.exercises.create(exercise_params)
    last_exercise = @day.exercises.last
    duration = TimeDifference.between(last_exercise.begining, last_exercise.ending).in_hours
    last_exercise.update(duration: duration, created_at: last_exercise.begining, updated_at: last_exercise.ending)
    redirect_to :back
  end

  private

  def exercise_params
    params.require(:exercise).permit(:status, :begining, :ending, :description, :created_at, :day_id_)
  end

end
