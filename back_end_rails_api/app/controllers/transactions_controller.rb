class TransactionsController < ApplicationController
    include CurrentUserConcern
    
    def create
        if @current_user 
            balance = @current_user.account_balance - params["transaction"]["purchase_amount"]
            if balance > 0 
               @current_user.update(account_balance: balance)
               symbol = params["transaction"]["stock_symbol"]
               found_stock = stock_exists = Stock.find(stock_symbol: symbol)
               if found_stock
                new_amount = found_stock.amount_of_stock + params["transaction"]["amount_of_stock"]
                found_stock.update(amount_of_stock: new_amount)
               else
               stock = Stock.create(amount_of_stock: params["transaction"]["amount_of_stock"], stock_symbol: symbol )
               Transaction.create(user: @current_user, stock: stock)
               render json: {
                   message: "purchase successful",
                   user: @current_user
               }
                 end
            else
                render json: {
                    status: 405,
                    message: "Cannot process request due to insufficient funds" 
                }
            end
        end
    end

    def index
        if @current_user
            transactions = @current_user.transactions
            render json: {
                transactions: transactions
            }
        else
            render json: {
                status: 403
            }
        end
    end


end