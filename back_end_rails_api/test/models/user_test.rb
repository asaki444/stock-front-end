require 'test_helper'

class UserTest < ActiveSupport::TestCase
  def setup 
    @user = User.create(email: "aditi@me.com", name: "aditi", password: "chocolate", password_confirmation: "chocolate")
  end

  test 'user is present' do
    assert @user.id, "returns id of user"
  end
  
  test 'user was not saved without all valid fields' do
     user = User.new(name: "charles", password: "test", password_confirmation: "test")
     assert !user.valid?
  end

  test 'user cannot create another account with the same email' do
    user = User.new(email: "aditi@me.com",name: "fake-aditi", password: "choco", password_confirmation: "choco")
    assert !user.valid?
  end
end
