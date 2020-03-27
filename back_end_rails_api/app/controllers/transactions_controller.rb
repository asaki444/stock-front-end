class TransactionsController < ApplicationController
    include CurrentUserConcern
    
    def create
        if @current_user 
            balance = @current_user.account_balance - params["transaction"]["purchase_amount"]
            if balance > 0  
               @current_user.update(account_balance: balance)
               symbol = params["transaction"]["stock_symbol"]
               found_stock = @current_user.stocks.find_by(stock_symbol: symbol)
               if found_stock
                new_amount = found_stock.amount_of_stock + params["transaction"]["amount_of_stock"]
                found_stock.update!(amount_of_stock: new_amount)
               else
               stock = Stock.create(amount_of_stock: params["transaction"]["amount_of_stock"], stock_symbol: symbol )
               end
               transaction = Transaction.create(user: @current_user, stock: stock, purchase_amount: params["transaction"]["purchase_amount"], amount_of_stock: params["transaction"]["amount_of_stock"])
               if transaction
                 render json: {
                   message: "purchase successful",
                   balance: @current_user.account_balance,
                   stock_symbol: @current_user.stocks.last.stock_symbol,
                   transaction: @current_user.transactions.last
               }
                else
                    render json: {
                        message: 'something went wrong'
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