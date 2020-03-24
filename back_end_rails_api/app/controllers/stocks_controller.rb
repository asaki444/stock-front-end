class StocksController < ApplicationController
    include CurrentUserConcern

    def index
        if @current_user
            stock = @current_user.stocks
            render json: => stocks
        else
            render json: => {
                status: 404
            }
        end
    end

    
end