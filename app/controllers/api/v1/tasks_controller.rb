class Api::V1::TasksController < ApplicationController
  before_action :user
  before_action :set_category, only: %i[ create ]
  before_action :set_task, only: %i[ show update destroy ]

  # GET /categories/:id/tasks
  def index
    if params[:category_id]
      category = Category.find(params[:category_id])
      @tasks = category.tasks
    elsif params[:date].present?
      date = Date.parse(params[:date])
      @tasks = Task.where(due_date: date)
    else
      @tasks = Task.all
    end
    render json: @tasks
  end

  # GET /categories/:id/tasks/1
  def show
    render json: @task
  end

  # POST /categories/:id/tasks
  def create
    @task = @category.tasks.build(task_params)
    @task.user_id = @user.id

    if @task.save
      render json: @task, status: :created, location: api_v1_tasks_url(@task)
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /categories/:id/tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /categories/:id/tasks/1
  def destroy
    @task.destroy!
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
    def set_task
      @task = @user.tasks.find(params[:id])
    end

    def set_category
      @category = @user.categories.find(params[:category_id])
    end
    
    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:description, :due_date, :completed, :category_id)
    end
end
