class Stock < ApplicationRecord
    validates_presence_of :stock_symbol
    validates_uniqueness_of :stock_symbol
end
