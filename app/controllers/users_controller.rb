class UsersController < ApplicationController

  def index
    if current_user.role == "patient"
      doctor_users = User.where(role: "doctor").page params[:page]
      @users = doctor_users.where("full_name LIKE ?", "%#{params[:search]}%")
    else
      patient_users = User.where(role: "patient").page params[:page]
      @users = patient_users.where("full_name LIKE ?", "%#{params[:search]}%")
    end
  end

  def add_patient
    user = User.find(params[:id])
    user.friend_request current_user
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
