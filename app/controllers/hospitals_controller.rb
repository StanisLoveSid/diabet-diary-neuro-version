class HospitalsController < ApplicationController
  before_action :set_hospital, only: [:show, :edit, :update, :destroy]

  def index
    @hospitals = Hospital.all
  end

  def show
  end

  def new
    @hospital = Hospital.new
  end

  def edit
  end

  def create
    @hospital = current_user.hospitals.create(hospital_params)

    respond_to do |format|
        format.html { redirect_to @hospital, notice: 'Hospital was successfully created.' }
    end
  end

  def add_to_hospital
    @user = User.find(params[:id])
    @user.sent
    current_user.hospitals.last.users << @user
    @user.hospital_id = current_user.hospitals.last.id
    @user.save
    flash[:notice] = "Request has been sent"
    redirect_to :back
  end

  def deny_hospital
    @hospital = Hospital.find(params[:id])
    @hospital.users.delete_if{|user| user.id = params[:user_id].to_i}
    redirect_to :back
  end

  def accept_hospital
    @user = User.find(params[:id])
    @user.accept
    @user.save
    redirect_to :back
  end

  def update
    respond_to do |format|
      if @hospital.update(hospital_params)
        format.html { redirect_to @hospital, notice: 'Hospital was successfully updated.' }
        format.json { render :show, status: :ok, location: @hospital }
      else
        format.html { render :edit }
        format.json { render json: @hospital.errors, status: :unprocessable_entity }
      end
    end
  end

  def destroy
    @hospital.destroy
    respond_to do |format|
      format.html { redirect_to hospitals_url, notice: 'Hospital was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private

    def set_hospital
      @hospital = Hospital.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def hospital_params
      params.require(:hospital).permit(:name, :description, :user_id)
    end
end
