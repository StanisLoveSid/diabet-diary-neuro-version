class ExercisesController < ApplicationController

  def create
    @day = Day.find(params[:day_id])
    @day.exercises.create(exercise_params)
    last_exercise = @day.exercises.last
    if last_exercise.status == 'end'
      previous_exercise = last_exercise.prev
      duration = TimeDifference.between(previous_exercise.created_at, last_exercise.created_at).in_hours
      last_exercise.update(duration: duration)
      previous_exercise.update(duration: duration)
    end
    redirect_to :back
  end

  private

  def exercise_params
    params.require(:exercise).permit(:status, :description, :created_at, :day_id_)
  end

end
