class Stock < ApplicationRecord
    has_many :transactions  
    has_many :users, through: :transactions
    validates_presence_of :stock_symbol
    validates_uniqueness_of :stock_symbol
end
