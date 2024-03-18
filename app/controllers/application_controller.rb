class ApplicationController < ActionController::API
    before_action :authenticate_devise_api_token!

    rescue_from ActiveRecord::RecordNotFound, with: :record_not_found

    private

    def record_not_found
        render json: { error: 'Record not found' }, status: :not_found
    end

    def current_user
        return @user if @user
        
        token = current_devise_api_token
        user_id = token['resource_owner_id']
        @user = User.find_by(id: user_id)
  
        if @user.nil?
          render json: { error: 'Invalid token' }, status: :unprocessable_entity && return
        end
    end

    def invalid_parameter
        render json: { errors: '' }, status: :unprocessable_entity
    end
end
