class RegistrationsController < ApplicationController
    def create
         user = User.create(
         name: params['user']['name'],
         email: params['user']['email'],
         password: params['user']['password'],
         password_confirmation: params['user']['password_confirmation']
        )
        if user.id
            session[:user_id] = user.id
            render json: {
                status: :created,
                user: user
            }
        elsif user
           found_user = User.find_by(email: params['user']['email'])
           render json: {
               status: "duplicate record"
           }
        else
            render json: {
                status: 500
            }
        end
    end 

end