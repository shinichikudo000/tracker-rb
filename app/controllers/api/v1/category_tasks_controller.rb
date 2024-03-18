class Api::V1::CategoryTasksController < ApplicationController
  before_action :current_user
  before_action :set_category, only: %i[ create ]
  before_action :set_task, only: %i[ show update destroy ]

  # GET /categories/:id/tasks
  def index
    if params[:date].present?
      date = Date.parse(params[:date])
      @tasks = Task.where(due_date: date)
    else 
      category = Category.find(params[:category_id])
      @tasks = category.tasks
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
    @task.user = current_user

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
    def set_task
      @task = current_user.tasks.find(params[:id])
    end

    def set_category
      @category = current_user.categories.find(params[:category_id])
    end
    
    def task_params
      params.require(:category_task).permit(:description, :due_date, :completed, :category_id)
    end
end
