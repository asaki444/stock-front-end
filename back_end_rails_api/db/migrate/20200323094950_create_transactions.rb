class CreateTransactions < ActiveRecord::Migration[5.0]
  def change
    create_table :transactions do |t|
      t.references :user, foreign_key: true
      t.references :stock, foreign_key: true
      t.integer :purchase_amount

      t.timestamps
    end
  end
end
