class Years::CommentsController < CommentsController
  before_action :set_commentable

  private

  def set_commentable
  	@commentable = Year.find(params[:year_id])
  end

end
