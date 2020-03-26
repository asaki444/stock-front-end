class User < ApplicationRecord
    has_secure_password
    has_many :transactions
    has_many :stocks, through: :transactions
    validates_presence_of :email, :name, :password, on: :create
    validates_uniqueness_of :email
end
