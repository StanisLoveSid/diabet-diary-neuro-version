class UsersController < ApplicationController

  def index
    @sugar_levels = SugarLevel.all
    @creation_time = @sugar_levels.select(:created_at).map(&:created_at).map(&:hour)
    @mmol_analysis = @sugar_levels.select(:mmol).map(&:mmol).map(&:to_f)
    @mmol_and_time = @creation_time.zip @mmol_analysis
    @s_l = SugarLevel.group_by_minute(:created_at).sum(:mmol)
    @result = @s_l.select{|k, v| v != 0}
  end

  def add_patient
    (User.find(params[:id])).friend_request current_user
    flash[:notice] = "Request has been sent"
    redirect_to :back
  end

  def accept_request
    (User.find(params[:user_id])).accept_request current_user
    flash[:notice] = "Request has been accepted"
    redirect_to :back
  end

  def personal_page
    @requested_hospitals = Hospital.all.select{|h| h.users.select{|user| user.id == current_user.id}}.map do |hospital|
      [hospital.name, hospital.id]
    end
  end

  def show
    @user = User.find(params[:id])
  end

end
