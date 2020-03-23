class StocksController < ApplicationController
    include CurrentUserConcern
    before_action :user_logged_in?

    def index
        
    end

    private
 
    def is_user_logged_in?
       return @current_user !== undefined
    end
end