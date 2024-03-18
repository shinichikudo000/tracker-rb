class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  has_many :categories, dependent: :destroy
  has_many :tasks

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :api

  validates :email, presence: true, uniqueness: true
  validates :encrypted_password, presence: true
end
