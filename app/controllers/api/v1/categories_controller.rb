class Api::V1::CategoriesController < ApplicationController
  before_action :user
  before_action :set_category, only: %i[show update destroy]

  # GET /categories
  def index
    @categories = @user.categories
    render json: @categories
  end

  # GET /categories/1
  def show
    render json: @category
  end

  # POST /categories
  def create
    @category = @user.categories.new(category_params)

    if @category.save
      render json: @category, status: :created, location: api_v1_categories_url(@category)
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/1
  def update
    if @category.update(category_params)
      render json: @category
    else
      render json: @category.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/1
  def destroy
    @category.destroy!
  end

  private
    def user
      token = current_devise_api_token
      user_id = token['resource_owner_id']
      @user = User.find_by(id: user_id)

      if @user.nil?
        render json: { error: 'Invalid token' }, status: :unprocessable_entity
      end
    end
    # Use callbacks to share common setup or constraints between actions.
    def set_category
      @category = @user.categories.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def category_params
      params.require(:category).permit(:name)
    end
end