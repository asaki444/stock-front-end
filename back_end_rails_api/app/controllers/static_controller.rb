class StaticController < ApplicationController
     def index
        render json: {
            welcome: "welcome!"
        }
     end
end