class CreateStocks < ActiveRecord::Migration[5.0]
  def change
    create_table :stocks do |t|
      t.integer :amount_of_stock
      t.string :stock_symbol

      t.timestamps
    end
  end
end
