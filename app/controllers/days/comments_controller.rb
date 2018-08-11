class Days::CommentsController < CommentsController
  before_action :set_commentable

  private

  def set_commentable
  	@commentable = Day.find(params[:day_id])
  end

end
