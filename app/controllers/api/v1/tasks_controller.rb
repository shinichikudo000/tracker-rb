class Api::V1::TasksController < ApplicationController
    before_action :current_user
    def index
        @tasks = current_user.tasks.all

        if params[:date]. present?
            date = Date.parse(params[:date])

            @tasks = @tasks.where(due_date: date)
        end
        
        render json: @tasks
    end
end