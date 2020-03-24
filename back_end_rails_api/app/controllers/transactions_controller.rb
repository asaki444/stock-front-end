class TransactionsController < ApplicationController
    include CurrentUserConcern
    
    def create
        if @current_user 
            balance = @current_user.account_balance - (params["transaction"]["purchase_amount"])
            if balance > 0 
               @current_user.update(account_balance: balance)
               stock = Stock.create(amount_of_stock: params["transaction"]["amount_of_stock"], stock_symbol: params["transaction"]["stock_symbol"])
               Transaction.create(user_id: @current_user.id, stock_id: stock.id, params["transaction"]["purchase_amount"])
            else
                render json:{
                    status: 405
                    message: "Cannot process request due to insufficient funds" 
                }
            end
        end
    end

    def index
        if @current_user
            transactions = @current_user.transactions
            render json: => transactions
        else
            render json: => {
                status: 403
            }
        end
    end


end