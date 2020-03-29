class AddStockSymbolToTransactions < ActiveRecord::Migration[5.0]
  def change
    add_column :transactions, :stock_symbol, :string
  end
end
