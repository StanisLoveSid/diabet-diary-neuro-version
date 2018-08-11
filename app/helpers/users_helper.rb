module UsersHelper
	
  def friendship(user, current_user)
    if !user.pending_friends.include?(current_user) && !user.friends.include?(current_user)
      link_to 'Send a friendship', {controller: 'users', action: 'add_patient', id: user.id }
    elsif user.friends.include? current_user
      "You are already friends"
    else
      "You have Send a request"
    end
  end

end
