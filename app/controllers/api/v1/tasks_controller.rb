class Api::V1::TasksController < ApplicationController
  before_action :user
  before_action :set_task, only: %i[ show update destroy ]

  # GET /tasks
  def tasks
    @tasks = Task.all

    render json: @tasks
  end

  # GET /categories/:id/tasks
  def index
    
  end

  # GET /tasks/1
  def show
    render json: @task
  end

  # POST /tasks
  def create
    @task = Task.new(task_params)

    if @task.save
      render json: @task, status: :created, location: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /tasks/1
  def update
    if @task.update(task_params)
      render json: @task
    else
      render json: @task.errors, status: :unprocessable_entity
    end
  end

  # DELETE /tasks/1
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
      @task = @user.task.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def task_params
      params.require(:task).permit(:description, :due_date, :completed)
    end
end
