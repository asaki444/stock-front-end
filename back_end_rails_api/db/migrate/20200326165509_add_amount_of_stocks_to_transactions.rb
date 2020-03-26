class AddAmountOfStocksToTransactions < ActiveRecord::Migration[5.0]
  def change
    add_column :transactions, :amount_of_stock, :integer
  end
end
