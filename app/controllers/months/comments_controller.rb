class Months::CommentsController < CommentsController
  before_action :set_commentable

  private

  def set_commentable
  	@commentable = Month.find(params[:month_id])
  end

end